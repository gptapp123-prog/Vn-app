"""Sign an Android release with a persistent private key supplied by CI Secrets.
No generated fallback key: unconfigured builds stay explicitly unsigned.
"""
import base64
import os
from pathlib import Path
import subprocess
import tempfile

encoded = os.environ.get('VN_APP_ANDROID_KEYSTORE_BASE64', '')
if not encoded:
    print('Android release chưa ký; cần khóa phát hành cố định trước khi cài.')
    raise SystemExit(0)
for name in ('VN_APP_ANDROID_KEYSTORE_PASSWORD', 'VN_APP_ANDROID_KEY_ALIAS', 'VN_APP_ANDROID_KEY_PASSWORD'):
    if not os.environ.get(name):
        raise SystemExit('Thiếu cấu hình ký Android: ' + name)
sdk = Path(os.environ.get('ANDROID_HOME') or os.environ['ANDROID_SDK_ROOT'])
signer = sdk / 'build-tools/36.0.0/apksigner'
folder = Path('android/app/build/outputs/apk/release')
source = folder / 'app-release-unsigned.apk'
target = folder / 'VN-App-Android-release.apk'
with tempfile.TemporaryDirectory(prefix='vn-app-sign-') as temporary:
    key = Path(temporary) / 'release.p12'
    key.write_bytes(base64.b64decode(encoded, validate=True))
    key.chmod(0o600)
    subprocess.run([str(signer), 'sign', '--ks', str(key), '--ks-key-alias', os.environ['VN_APP_ANDROID_KEY_ALIAS'], '--ks-pass', 'env:VN_APP_ANDROID_KEYSTORE_PASSWORD', '--key-pass', 'env:VN_APP_ANDROID_KEY_PASSWORD', '--out', str(target), str(source)], check=True)
    subprocess.run([str(signer), 'verify', '--verbose', '--print-certs', str(target)], check=True)
    source.unlink()
