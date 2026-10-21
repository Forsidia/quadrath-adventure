import { createHash } from 'node:crypto';

export function canonical(value) {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  if (value && typeof value === 'object') return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}';
  return JSON.stringify(value);
}
export function digest(payload) { return createHash('sha256').update(canonical(payload)).digest('hex'); }
export function validateBundle(bundle) {
  if (bundle?.format !== 'quadrath-content-bundle' || bundle.format_version !== 1) throw new Error('Unsupported content bundle format.');
  if (bundle.id !== 'quadrath-base' || bundle.license !== 'CC-BY-4.0' || !bundle.attribution) throw new Error('Invalid base pack identity or license.');
  if (!Array.isArray(bundle.manifest?.documents) || !Array.isArray(bundle.documents)) throw new Error('Missing document index.');
  const paths = new Set(), ids = new Set();
  bundle.documents.forEach((entry, index) => {
    if (typeof entry.path !== 'string' || entry.path.includes('..') || entry.path.startsWith('/') || !entry.path.endsWith('.json')) throw new Error('Invalid document path.');
    if (paths.has(entry.path) || !entry.data?.id || ids.has(entry.data.id)) throw new Error('Duplicate or missing document identity.');
    const expected = bundle.manifest.documents[index];
    if (expected?.path !== entry.path || expected?.type !== entry.data.type) throw new Error('Bundle does not match manifest.');
    paths.add(entry.path); ids.add(entry.data.id);
  });
  if (bundle.documents.length !== bundle.manifest.documents.length) throw new Error('Incomplete bundle.');
  if (typeof bundle.resources?.handbook !== 'string' || typeof bundle.resources?.content_license !== 'string') throw new Error('Missing handbook or license.');
  if (bundle.manifest.id !== bundle.id || bundle.manifest.version !== bundle.version || bundle.manifest.license !== bundle.license) throw new Error('Bundle metadata mismatch.');
  const { manifest, documents, resources } = bundle;
  if (digest({ manifest, documents, resources }) !== bundle.content_sha256) throw new Error('Bundle checksum mismatch.');
  return bundle;
}
