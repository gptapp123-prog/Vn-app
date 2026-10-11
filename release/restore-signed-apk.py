"""Restore the already verified public APK signature; no private key is included."""
import base64, hashlib, json
from pathlib import Path
config = json.loads(Path('release/v3.15-signature.json').read_text())
files = list(Path('release-input').rglob('*.apk'))
assert len(files) == 1, 'Expected one build APK'
source = files[0].read_bytes()
assert hashlib.sha256(source).hexdigest() == config['source_sha256'], 'Wrong source build'
suffix = source[-config['suffix']:] if config['suffix'] else b''
target = source[:config['prefix']] + base64.b64decode(config['replacement_base64'], validate=True) + suffix
assert hashlib.sha256(target).hexdigest() == config['target_sha256'], 'Signed APK hash mismatch'
Path('VN_App_V3_15_Android_Release.apk').write_bytes(target)
Path('SHA256SUMS.txt').write_text(config['target_sha256'] + '  VN_App_V3_15_Android_Release.apk\n')
