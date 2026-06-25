import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const manifestPath = path.join(repoRoot, 'cv', 'manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

if (!Array.isArray(manifest) || manifest.length === 0) throw new Error('cv/manifest.json must contain at least one CV variant.');
const ids = new Set();
const outputs = new Set();
for (const variant of manifest) {
  if (ids.has(variant.id)) throw new Error(`Duplicate CV id: ${variant.id}`);
  if (outputs.has(variant.outputPdf)) throw new Error(`Duplicate CV output: ${variant.outputPdf}`);
  ids.add(variant.id);
  outputs.add(variant.outputPdf);
  if (!existsSync(path.join(repoRoot, variant.entryTypst))) throw new Error(`Missing Typst entrypoint: ${variant.entryTypst}`);
}
if (manifest.filter((variant) => variant.default && variant.published).length !== 1) throw new Error('Exactly one published CV must be the default.');

mkdirSync(path.join(repoRoot, 'public', 'cv'), { recursive: true });
for (const variant of manifest) {
  const entry = path.join(repoRoot, variant.entryTypst);
  const output = path.join(repoRoot, variant.outputPdf);
  rmSync(output, { force: true });
  console.log(`Compiling ${variant.id}: ${variant.entryTypst} -> ${variant.outputPdf}`);
  execFileSync('typst', ['compile', entry, output], { stdio: 'inherit' });
  if (!existsSync(output)) throw new Error(`Typst did not produce ${variant.outputPdf}`);
}
