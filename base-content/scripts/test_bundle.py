import hashlib
import unittest
from bundle import build_bundle, canonical


class BundleTests(unittest.TestCase):
    def test_export_is_complete_deterministic_and_checksummed(self):
        first=build_bundle()
        second=build_bundle()
        self.assertEqual(first,second)
        self.assertEqual(len(first['documents']),len(first['manifest']['documents']))
        payload={key:first[key] for key in ('manifest','documents','resources')}
        self.assertEqual(first['content_sha256'],hashlib.sha256(canonical(payload).encode('utf-8')).hexdigest())
        self.assertIn('Player and DM Handbook',first['resources']['handbook'])


if __name__=='__main__':unittest.main()
