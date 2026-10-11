import copy
import datetime as dt
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("signing", Path(__file__).parents[1] / "scripts/ios-signing.py")
signing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(signing)

class SigningValidation(unittest.TestCase):
    def setUp(self):
        self.team = "ABCDE12345"
        self.uuid = "12345678-1234-1234-1234-123456789ABC"
        self.profile = {"UUID": self.uuid, "Name": "VN App", "TeamIdentifier": [self.team],
                        "ApplicationIdentifierPrefix": [self.team],
                        "ExpirationDate": dt.datetime.now(dt.timezone.utc) + dt.timedelta(days=1),
                        "Entitlements": {"application-identifier": self.team + "." + signing.BUNDLE}}
        self.options = {"teamID": self.team, "signingStyle": "manual", "method": "release-testing",
                        "destination": "export", "provisioningProfiles": {signing.BUNDLE: self.uuid}}
    def test_valid(self):
        self.assertEqual(signing.validate(self.profile, self.options, self.team), self.uuid)
    def test_wrong_team(self):
        with self.assertRaises(ValueError):
            signing.validate(self.profile, self.options, "ZZZZZ99999")
    def test_expired(self):
        self.profile["ExpirationDate"] = dt.datetime(2020, 1, 1)
        with self.assertRaises(ValueError):
            signing.validate(self.profile, self.options, self.team)
    def test_wrong_app(self):
        self.profile["Entitlements"]["application-identifier"] = self.team + ".other.app"
        with self.assertRaises(ValueError):
            signing.validate(self.profile, self.options, self.team)
    def test_wrong_export(self):
        for key, value in (("destination", "upload"), ("signingStyle", "automatic"), ("method", "invented"), ("teamID", "other")):
            with self.subTest(key=key):
                options = copy.deepcopy(self.options)
                options[key] = value
                with self.assertRaises(ValueError):
                    signing.validate(self.profile, options, self.team)
    def test_wrong_profile(self):
        self.options["provisioningProfiles"][signing.BUNDLE] = "other"
        with self.assertRaises(ValueError):
            signing.validate(self.profile, self.options, self.team)
    def test_unsafe_uuid(self):
        self.profile["UUID"] = "../../bad"
        with self.assertRaises(ValueError):
            signing.validate(self.profile, self.options, self.team)
    def test_legacy_prefix(self):
        self.profile["ApplicationIdentifierPrefix"] = ["OLDPREFIX1"]
        self.profile["Entitlements"]["application-identifier"] = "OLDPREFIX1." + signing.BUNDLE
        self.assertEqual(signing.validate(self.profile, self.options, self.team), self.uuid)

if __name__ == "__main__":
    unittest.main()

