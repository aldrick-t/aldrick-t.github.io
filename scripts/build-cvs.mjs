import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
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
  if (!['local', 'external'].includes(variant.source)) throw new Error(`CV ${variant.id} must declare source as local or external.`);
  if (variant.source === 'local' && !variant.entryTypst) throw new Error(`Local CV ${variant.id} must declare entryTypst.`);
  if (variant.source === 'external' && variant.entryTypst) throw new Error(`External CV ${variant.id} must not declare entryTypst.`);
  if (variant.source === 'local' && !existsSync(path.join(repoRoot, variant.entryTypst))) throw new Error(`Missing Typst entrypoint: ${variant.entryTypst}`);
  if (variant.source === 'external') {
    for (const field of ['checksumFile', 'provenanceFile']) {
      if (!variant[field]) throw new Error(`External CV ${variant.id} must declare ${field}.`);
      if (!existsSync(path.join(repoRoot, variant[field]))) throw new Error(`Missing external CV ${field}: ${variant[field]}`);
    }
  }
}
if (manifest.filter((variant) => variant.default && variant.published).length !== 1) throw new Error('Exactly one published CV must be the default.');

mkdirSync(path.join(repoRoot, 'public', 'cv'), { recursive: true });
for (const variant of manifest) {
  if (variant.source === 'external') {
    const output = path.join(repoRoot, variant.outputPdf);
    if (!existsSync(output)) throw new Error(`Missing external CV PDF: ${variant.outputPdf}`);
    const expectedHash = readFileSync(path.join(repoRoot, variant.checksumFile), 'utf8').trim().split(/\s+/)[0];
    const actualHash = createHash('sha256').update(readFileSync(output)).digest('hex');
    if (actualHash !== expectedHash) throw new Error(`Checksum mismatch for external CV ${variant.id}`);
    console.log(`Using externally published ${variant.id}: ${variant.outputPdf}`);
    continue;
  }
  const entry = path.join(repoRoot, variant.entryTypst);
  const output = path.join(repoRoot, variant.outputPdf);
  rmSync(output, { force: true });
  console.log(`Compiling ${variant.id}: ${variant.entryTypst} -> ${variant.outputPdf}`);
  execFileSync('typst', ['compile', entry, output], { stdio: 'inherit' });
  if (!existsSync(output)) throw new Error(`Typst did not produce ${variant.outputPdf}`);
}
