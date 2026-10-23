/** Explicit update step: export content/ to the served bundle. Normal builds use the checked-in bundle. */
import { readFile, writeFile, mkdir, mkdtemp, rename, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validateBundle } from './bundle-format.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const temp = await mkdtemp(path.join(tmpdir(), 'quadrath-bundle-'));
try {
  const output = path.join(temp, 'quadrath.json');
  execFileSync('python3', [path.join(root, 'scripts/bundle.py'), '--output', output], { stdio: 'inherit' });
  const bundle = JSON.parse(await readFile(output, 'utf8'));
  validateBundle(bundle);
  const dir = path.join(root, 'public/bundles');
  await mkdir(dir, { recursive: true });
  const staged = path.join(dir, '.quadrath.bundle.tmp');
  await writeFile(staged, JSON.stringify(bundle, null, 2) + '\n');
  await rename(staged, path.join(dir, 'quadrath.bundle.json'));
  console.log(`Updated content bundle: v${bundle.version}, ${bundle.documents.length} documents, SHA-256 ${bundle.content_sha256}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
