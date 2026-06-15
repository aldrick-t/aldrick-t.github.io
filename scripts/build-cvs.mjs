import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const manifestPath = path.join(repoRoot, 'cv', 'manifest.json');
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const availableVariants = manifest.filter((variant) => variant.available);

mkdirSync(path.join(repoRoot, 'public', 'cv'), { recursive: true });

for (const variant of availableVariants) {
  const entry = path.join(repoRoot, variant.entryTypst);
  const output = path.join(repoRoot, variant.outputPdf);
  console.log(`Compiling ${variant.id} CV -> ${variant.outputPdf}`);
  execFileSync('typst', ['compile', entry, output], { stdio: 'inherit' });
}
