/** Explicit update step. Normal builds use the checked-in base bundle. */
import { readFile, writeFile, mkdir, mkdtemp, rename, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validateBundle } from './bundle-format.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const options = {};
for (let i = 0; i < args.length; i += 2) {
  if (!['--local', '--url', '--ref'].includes(args[i]) || !args[i + 1]) throw new Error('Usage: npm run content:update -- [--local /path/to/base-repo | --url https://…/bundle.json | --ref main]');
  options[args[i]] = args[i + 1];
}
if (options['--local'] && (options['--url'] || options['--ref']) || options['--url'] && options['--ref']) throw new Error('Choose one update source.');
let temp;
try {
  let bundle;
  if (options['--local']) {
    temp = await mkdtemp(path.join(tmpdir(), 'quadrath-bundle-'));
    const output = path.join(temp, 'base.json');
    execFileSync('python3', [path.resolve(options['--local'], 'scripts/bundle.py'), '--output', output], { stdio: 'inherit' });
    bundle = JSON.parse(await readFile(output, 'utf8'));
  } else {
    const url = options['--url'] || `https://raw.githubusercontent.com/Forsidia/quadrath-base-content/${encodeURIComponent(options['--ref'] || 'main')}/generated/quadrath-base.bundle.json`;
    if (!url.startsWith('https://')) throw new Error('Remote bundle URL must use HTTPS.');
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Bundle download failed: HTTP ${response.status}. Export and publish a base bundle first, or use --local.`);
    bundle = await response.json();
  }
  validateBundle(bundle);
  const dir = path.join(root, 'public/bundles');
  await mkdir(dir, { recursive: true });
  const staged = path.join(dir, '.quadrath-base.bundle.tmp');
  await writeFile(staged, JSON.stringify(bundle, null, 2) + '\n');
  await rename(staged, path.join(dir, 'quadrath-base.bundle.json'));
  console.log(`Updated base database: v${bundle.version}, ${bundle.documents.length} documents, SHA-256 ${bundle.content_sha256}`);
} finally {
  if (temp) await rm(temp, { recursive: true, force: true });
}
