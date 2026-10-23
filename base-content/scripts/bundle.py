#!/usr/bin/env python3
"""Export a validated, deterministic Quadrath content database."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import quadrath
from handbook import build_handbook


def canonical(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(',', ':'))


def build_bundle():
    quadrath.validate(None)
    manifest = quadrath.read_json(quadrath.MANIFEST_PATH)
    documents = [{'path': entry['path'], 'data': data} for entry, _, data in quadrath.documents()]
    payload = {
        'manifest': manifest,
        'documents': documents,
        'resources': {
            'handbook': build_handbook([entry['data'] for entry in documents]),
            'content_license': (quadrath.ROOT / 'CONTENT_LICENSE.md').read_text(encoding='utf-8'),
        },
    }
    return {
        'format': 'quadrath-content-bundle',
        'format_version': 1,
        'id': manifest['id'],
        'version': manifest['version'],
        'license': manifest['license'],
        'attribution': 'Quadrath base content by Forsidia, licensed under CC BY 4.0.',
        'content_sha256': hashlib.sha256(canonical(payload).encode('utf-8')).hexdigest(),
        **payload,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=quadrath.ROOT / 'generated/quadrath-base.bundle.json')
    args = parser.parse_args()
    bundle = build_bundle()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f"Bundled {len(bundle['documents'])} documents → {args.output}")


if __name__ == '__main__':
    main()
