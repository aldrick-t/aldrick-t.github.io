import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const root = process.cwd();
const itemsDir = path.join(root, 'src', 'content', 'items');
const publicDir = path.join(root, 'public');
const thumbnailSuffix = '-page-1.png';

function parseItem(file) {
  const source = readFileSync(path.join(itemsDir, file), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`${file}: missing YAML frontmatter`);
  return { id: file.replace(/\.md$/, ''), file, data: load(match[1]) ?? {} };
}

function commandExists(command) {
  return spawnSync('sh', ['-c', 'command -v "$1"', 'sh', command], { stdio: 'ignore' }).status === 0;
}

function generatedThumbnailPath(itemId, pdfPath) {
  const filename = pdfPath.split('/').pop() ?? '';
  const basename = filename.replace(/\.pdf$/i, '');
  return `/items/${itemId}/generated/${basename}${thumbnailSuffix}`;
}

function cleanGeneratedDirectory(itemId, expectedPaths) {
  const generatedDir = path.join(publicDir, 'items', itemId, 'generated');
  if (!existsSync(generatedDir)) return;

  for (const filename of readdirSync(generatedDir)) {
    if (!filename.endsWith(thumbnailSuffix)) continue;
    const publicPath = `/items/${itemId}/generated/${filename}`;
    if (!expectedPaths.has(publicPath)) rmSync(path.join(generatedDir, filename), { force: true });
  }
}

const items = readdirSync(itemsDir)
  .filter((file) => file.endsWith('.md'))
  .sort()
  .map(parseItem);

const tasks = [];
const expectedByItem = new Map();

for (const item of items) {
  const mediaEntries = Array.isArray(item.data.media) ? item.data.media : [];
  const generatedPaths = new Map();
  const expectedPaths = new Set();

  for (const media of mediaEntries) {
    if (media?.kind !== 'pdf' || media.thumbnail || !media.path) continue;

    const outputPublicPath = generatedThumbnailPath(item.id, media.path);
    if (generatedPaths.has(outputPublicPath)) {
      throw new Error(`${item.file}: duplicate generated PDF thumbnail ${outputPublicPath} for ${media.path} and ${generatedPaths.get(outputPublicPath)}`);
    }
    generatedPaths.set(outputPublicPath, media.path);
    expectedPaths.add(outputPublicPath);

    const pdfPath = path.join(publicDir, media.path);
    if (!media.path.startsWith(`/items/${item.id}/`)) {
      throw new Error(`${item.file}: PDF media must live under /items/${item.id}/`);
    }
    if (path.extname(media.path).toLowerCase() !== '.pdf') {
      throw new Error(`${item.file}: PDF media path must end in .pdf`);
    }
    if (!existsSync(pdfPath)) throw new Error(`${item.file}: missing PDF media ${media.path}`);

    tasks.push({
      input: pdfPath,
      outputPrefix: path.join(publicDir, outputPublicPath.replace(/\.png$/, '')),
      outputPublicPath
    });
  }

  expectedByItem.set(item.id, expectedPaths);
}

for (const [itemId, expectedPaths] of expectedByItem) cleanGeneratedDirectory(itemId, expectedPaths);

if (!tasks.length) {
  console.log('No local PDF thumbnails to generate.');
  process.exit(0);
}

if (!commandExists('pdftocairo')) {
  throw new Error('pdftocairo is required to generate local PDF thumbnails. Install Poppler with `brew install poppler` locally or `sudo apt-get install -y poppler-utils` in CI.');
}

for (const task of tasks) {
  mkdirSync(path.dirname(task.outputPrefix), { recursive: true });
  execFileSync('pdftocairo', ['-png', '-singlefile', '-f', '1', '-l', '1', '-scale-to', '1200', task.input, task.outputPrefix], { stdio: 'inherit' });
  if (!existsSync(path.join(publicDir, task.outputPublicPath))) {
    throw new Error(`pdftocairo did not produce ${task.outputPublicPath}`);
  }
}

console.log(`Generated ${tasks.length} local PDF thumbnail${tasks.length === 1 ? '' : 's'}.`);
