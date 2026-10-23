import { readFile } from 'node:fs/promises';
import { validateBundle } from './bundle-format.mjs';
const bundle = validateBundle(JSON.parse(await readFile(new URL('../public/bundles/quadrath.bundle.json', import.meta.url), 'utf8')));
console.log(`Valid content bundle: ${bundle.documents.length} documents; SHA-256 verified.`);
