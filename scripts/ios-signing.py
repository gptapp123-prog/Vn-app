"""Prepare private signing files and verify exported IPA; never print credentials."""
import base64
import datetime as dt
import hashlib
import json
import os
from pathlib import Path
import plistlib
import re
import subprocess
import sys
import tempfile

BUNDLE = "vn.vnapp.citizen"
REQUIRED = ("VN_APP_APPLE_TEAM_ID", "VN_APP_CERTIFICATE_BASE64",
            "VN_APP_P12_PASSWORD", "VN_APP_PROFILE_BASE64",
            "VN_APP_EXPORT_OPTIONS_BASE64")

def validate(profile, options, team):
    if not re.fullmatch(r"[A-Z0-9]{10}", team):
        raise ValueError("Apple Team ID không hợp lệ.")
    if team not in profile.get("TeamIdentifier", []):
        raise ValueError("Profile thuộc Apple Team khác.")
    prefix = profile.get("ApplicationIdentifierPrefix", [])
    app_id = profile.get("Entitlements", {}).get("application-identifier", "")
    if not any(app_id == p + "." + BUNDLE for p in prefix):
        raise ValueError("Profile phải dành riêng cho vn.vnapp.citizen.")
    expiry = profile.get("ExpirationDate")
    if not isinstance(expiry, dt.datetime) or expiry.replace(tzinfo=dt.timezone.utc) <= dt.datetime.now(dt.timezone.utc):
        raise ValueError("Profile hết hạn hoặc thiếu ngày hết hạn.")
    uuid = profile.get("UUID", "")
    if not re.fullmatch(r"[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}", uuid):
        raise ValueError("UUID profile không hợp lệ.")
    if options.get("teamID") != team or options.get("signingStyle") != "manual":
        raise ValueError("ExportOptions phải dùng đúng Team ID và signingStyle manual.")
    if options.get("destination", "export") != "export":
        raise ValueError("Quy trình này chỉ xuất IPA; cần destination export.")
    if options.get("method") not in ("app-store-connect", "release-testing", "debugging", "app-store", "ad-hoc", "development"):
        raise ValueError("Phương thức xuất IPA chưa được hỗ trợ.")
    selected = options.get("provisioningProfiles", {}).get(BUNDLE)
    if selected not in (uuid, profile.get("Name")):
        raise ValueError("ExportOptions chưa chọn đúng provisioning profile.")
    return uuid

def run(args, capture=False):
    return subprocess.run(args, check=True, stdout=subprocess.PIPE if capture else subprocess.DEVNULL,
                          stderr=subprocess.PIPE).stdout

def prepare():
    missing = [key for key in REQUIRED if not os.environ.get(key)]
    if missing:
        raise ValueError("Thiếu GitHub Secrets: " + ", ".join(missing))
    temp = Path(os.environ["RUNNER_TEMP"]) / "vn-app-signing"
    temp.mkdir(mode=0o700, exist_ok=True)
    os.chmod(temp, 0o700)
    for key, name in (("VN_APP_CERTIFICATE_BASE64", "certificate.p12"),
                      ("VN_APP_PROFILE_BASE64", "profile.mobileprovision"),
                      ("VN_APP_EXPORT_OPTIONS_BASE64", "ExportOptions.plist")):
        data = base64.b64decode("".join(os.environ[key].split()), validate=True)
        target = temp / name
        target.write_bytes(data)
        os.chmod(target, 0o600)
    profile = plistlib.loads(run(["security", "cms", "-D", "-i", str(temp / "profile.mobileprovision")], True))
    options = plistlib.loads((temp / "ExportOptions.plist").read_bytes())
    team = os.environ["VN_APP_APPLE_TEAM_ID"]
    uuid = validate(profile, options, team)
    keychain = temp / "signing.keychain-db"
    password = os.urandom(32).hex()
    run(["security", "create-keychain", "-p", password, str(keychain)])
    run(["security", "set-keychain-settings", "-lut", "21600", str(keychain)])
    run(["security", "unlock-keychain", "-p", password, str(keychain)])
    run(["security", "import", str(temp / "certificate.p12"), "-P",
         os.environ["VN_APP_P12_PASSWORD"], "-k", str(keychain), "-t", "cert",
         "-f", "pkcs12", "-T", "/usr/bin/codesign", "-T", "/usr/bin/security"])
    run(["security", "set-key-partition-list", "-S", "apple-tool:,apple:",
         "-k", password, str(keychain)])
    run(["security", "list-keychains", "-d", "user", "-s", str(keychain)])
    identities = run(["security", "find-identity", "-v", "-p", "codesigning", str(keychain)], True).decode()
    allowed = {hashlib.sha1(cert).hexdigest().upper() for cert in profile.get("DeveloperCertificates", [])}
    matches = [sha for sha in re.findall(r'\b[0-9A-F]{40}\b', identities) if sha in allowed]
    if len(matches) != 1:
        raise ValueError("Cần đúng một chứng thư hợp lệ có khóa riêng khớp profile.")
    target = Path.home() / "Library/MobileDevice/Provisioning Profiles" / (uuid + ".mobileprovision")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes((temp / "profile.mobileprovision").read_bytes())
    os.chmod(target, 0o600)
    (temp / "installed-profile-path").write_text(str(target))
    with open(os.environ["GITHUB_ENV"], "a") as env:
        env.write("VN_APP_PROFILE_UUID=" + uuid + "\n")
        env.write("VN_APP_SIGNING_IDENTITY=" + matches[0] + "\n")
        env.write("VN_APP_EXPORT_OPTIONS=" + str(temp / "ExportOptions.plist") + "\n")
    print("Đã kiểm tra và cấu hình ký Apple.")

def verify():
    files = list(Path("ios-build/export").glob("*.ipa"))
    if len(files) != 1:
        raise ValueError("Cần đúng một IPA sau xuất.")
    with tempfile.TemporaryDirectory() as dest:
        run(["ditto", "-x", "-k", str(files[0]), dest])
        apps = list((Path(dest) / "Payload").glob("*.app"))
        if len(apps) != 1:
            raise ValueError("IPA thiếu ứng dụng hợp lệ.")
        app = apps[0]
        run(["codesign", "--verify", "--deep", "--strict", str(app)])
        info = plistlib.loads((app / "Info.plist").read_bytes())
        if info.get("CFBundleIdentifier") != BUNDLE:
            raise ValueError("IPA có bundle ID sai.")
        embedded = plistlib.loads(run(["security", "cms", "-D", "-i", str(app / "embedded.mobileprovision")], True))
        options = plistlib.loads(Path(os.environ["VN_APP_EXPORT_OPTIONS"]).read_bytes())
        validate(embedded, options, os.environ["VN_APP_APPLE_TEAM_ID"])
    report = {"ipa": files[0].name, "sha256": hashlib.sha256(files[0].read_bytes()).hexdigest(),
              "signatureVerified": True, "bundleId": BUNDLE, "realDeviceTested": False,
              "method": options["method"]}
    Path("ios-build/export/verification.json").write_text(json.dumps(report, indent=2))
    print("Đã xuất và kiểm chữ ký IPA; chưa kiểm thử iPhone thật.")

def cleanup():
    import shutil
    temp = Path(os.environ["RUNNER_TEMP"]) / "vn-app-signing"
    marker = temp / "installed-profile-path"
    if marker.exists():
        Path(marker.read_text()).unlink(missing_ok=True)
    if (temp / "signing.keychain-db").exists():
        subprocess.run(["security", "delete-keychain", str(temp / "signing.keychain-db")],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    shutil.rmtree(temp, ignore_errors=True)

if __name__ == "__main__":
    try:
        {"prepare": prepare, "verify": verify, "cleanup": cleanup}[sys.argv[1]]()
    except (ValueError, KeyError, OSError, subprocess.CalledProcessError, plistlib.InvalidFileException):
        # System commands may include passwords in their args: never echo the exception.
        if sys.argv[1] == "prepare":
            missing = [key for key in REQUIRED if not os.environ.get(key)]
            if missing:
                print("Thiếu GitHub Secrets: " + ", ".join(missing), file=sys.stderr)
            else:
                print("Cấu hình ký không hợp lệ: kiểm tra Team ID, profile, hạn dùng, chứng thư có khóa riêng và ExportOptions.", file=sys.stderr)
        else:
            print("Không hoàn thành kiểm tra IPA hoặc dọn cấu hình ký.", file=sys.stderr)
        sys.exit(1)

