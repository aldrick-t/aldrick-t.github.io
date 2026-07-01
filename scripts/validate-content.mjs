import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const root = process.cwd();
const itemsDir = path.join(root, 'src', 'content', 'items');
const itemTranslationsDir = path.join(root, 'src', 'content', 'item-translations');
const errors = [];
const allowedTypes = new Set(['project', 'work', 'education', 'publication', 'conference', 'award', 'course', 'certification', 'volunteering', 'news']);
const allowedLanguages = new Set(['es', 'ja']);
const datePattern = /^\d{4}(-\d{2})?$/;
const skillSource = readFileSync(path.join(root, 'src', 'data', 'skills.ts'), 'utf8');
const skillIds = new Set([...skillSource.matchAll(/id: '([^']+)'/g)].map((match) => match[1]));

function parseItem(file) {
  const source = readFileSync(path.join(itemsDir, file), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}: missing YAML frontmatter`);
    return null;
  }
  try {
    return { id: file.replace(/\.md$/, ''), file, data: load(match[1]), body: match[2].trim() };
  } catch (error) {
    errors.push(`${file}: invalid YAML (${error.message})`);
    return null;
  }
}

const files = readdirSync(itemsDir).filter((file) => file.endsWith('.md')).sort();
const items = files.map(parseItem).filter(Boolean);
const ids = new Set(items.map((item) => item.id));
const itemById = new Map(items.map((item) => [item.id, item]));
const featuredRanks = new Map();
const relevanceRanks = new Map();

function resolvePublicItemAsset(item, assetPath, label) {
  if (!assetPath?.startsWith(`/items/${item.id}/`)) {
    errors.push(`${item.file}: ${label} must live under /items/${item.id}/`);
    return;
  }
  const fullPath = path.join(root, 'public', assetPath);
  if (!existsSync(fullPath)) errors.push(`${item.file}: missing ${label} ${assetPath}`);
}

function getYouTubeEmbedUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }

  const hostname = parsed.hostname.replace(/^www\./, '');
  let videoId;
  if (hostname === 'youtu.be') {
    videoId = parsed.pathname.split('/').filter(Boolean)[0];
  } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
    const [, route, id] = parsed.pathname.split('/');
    if (parsed.pathname === '/watch') videoId = parsed.searchParams.get('v') ?? undefined;
    if (route === 'embed' || route === 'shorts') videoId = id;
  }

  if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return undefined;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

for (const item of items) {
  const data = item.data ?? {};
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) errors.push(`${item.file}: filename must be a lowercase kebab-case slug`);
  for (const field of ['title', 'type', 'summary', 'dateStart', 'dateEnd']) if (!data[field]) errors.push(`${item.file}: missing ${field}`);
  if (!allowedTypes.has(data.type)) errors.push(`${item.file}: unsupported type ${data.type}`);
  if (!datePattern.test(String(data.dateStart ?? ''))) errors.push(`${item.file}: invalid dateStart`);
  if (data.dateEnd !== 'Present' && !datePattern.test(String(data.dateEnd ?? ''))) errors.push(`${item.file}: invalid dateEnd`);
  const start = Number(String(data.dateStart).replace('-', '').padEnd(6, '0'));
  const end = data.dateEnd === 'Present' ? Infinity : Number(String(data.dateEnd).replace('-', '').padEnd(6, '0'));
  if (Number.isFinite(start) && start > end) errors.push(`${item.file}: dateEnd precedes dateStart`);
  if (data.published !== false && !item.body) errors.push(`${item.file}: published items require body content`);
  for (const skill of data.skills ?? []) if (!skillIds.has(skill)) errors.push(`${item.file}: unknown skill ${skill}`);
  for (const relation of data.relations ?? []) if (!ids.has(relation.id)) errors.push(`${item.file}: broken relation ${relation.id}`);
  for (const link of data.links ?? []) {
    try { new URL(link.url); } catch { errors.push(`${item.file}: invalid link URL ${link.url}`); }
  }
  for (const asset of data.assets ?? []) {
    if (!asset.alt?.trim()) errors.push(`${item.file}: assets require alt text`);
    const assetPath = asset.path?.startsWith('/') ? path.join(root, 'public', asset.path) : path.resolve(itemsDir, asset.path ?? '');
    if (!existsSync(assetPath)) errors.push(`${item.file}: missing asset ${asset.path}`);
  }
  if (data.thumbnail) {
    if (!data.thumbnail.alt?.trim()) errors.push(`${item.file}: thumbnail requires alt text`);
    resolvePublicItemAsset(item, data.thumbnail.path, 'thumbnail');
    if (data.thumbnail.objectFit && !['cover', 'contain', 'fill', 'scale-down'].includes(data.thumbnail.objectFit)) {
      errors.push(`${item.file}: thumbnail objectFit must be cover, contain, fill, or scale-down`);
    }
    if (data.thumbnail.backgroundColor && !/^#[0-9a-fA-F]{6}$/.test(data.thumbnail.backgroundColor)) {
      errors.push(`${item.file}: thumbnail backgroundColor must be a 6-digit hex color such as #ffffff`);
    }
    if (data.thumbnail.aspectRatio && !/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/.test(data.thumbnail.aspectRatio)) {
      errors.push(`${item.file}: thumbnail aspectRatio must be a numeric ratio such as 16 / 10`);
    }
  }
  for (const media of data.media ?? []) {
    if (media.kind === 'image') {
      if (!media.alt?.trim()) errors.push(`${item.file}: image media requires alt text`);
      resolvePublicItemAsset(item, media.path, 'image media');
    } else if (media.kind === 'youtube') {
      if (!media.title?.trim()) errors.push(`${item.file}: YouTube media requires title`);
      if (!getYouTubeEmbedUrl(media.url ?? '')) errors.push(`${item.file}: unsupported YouTube URL ${media.url}`);
    } else {
      errors.push(`${item.file}: unsupported media kind ${media.kind}`);
    }
  }
  if (data.published !== false && data.featuredRank !== undefined) {
    if (![1, 2, 3].includes(data.featuredRank)) errors.push(`${item.file}: featuredRank must be 1, 2, or 3`);
    if (featuredRanks.has(data.featuredRank)) errors.push(`${item.file}: featuredRank ${data.featuredRank} duplicates ${featuredRanks.get(data.featuredRank)}`);
    featuredRanks.set(data.featuredRank, item.file);
  }
  if (data.published !== false && data.portfolio !== false && data.relevanceRank !== undefined) {
    if (!Number.isInteger(data.relevanceRank) || data.relevanceRank < 1) errors.push(`${item.file}: relevanceRank must be a positive integer`);
    if (relevanceRanks.has(data.relevanceRank)) errors.push(`${item.file}: relevanceRank ${data.relevanceRank} duplicates ${relevanceRanks.get(data.relevanceRank)}`);
    relevanceRanks.set(data.relevanceRank, item.file);
  }
}

if (existsSync(itemTranslationsDir)) {
  for (const language of readdirSync(itemTranslationsDir).sort()) {
    const languageDir = path.join(itemTranslationsDir, language);
    if (!allowedLanguages.has(language)) {
      errors.push(`src/content/item-translations/${language}: unsupported language directory`);
      continue;
    }
    for (const file of readdirSync(languageDir).filter((entry) => entry.endsWith('.md')).sort()) {
      const source = readFileSync(path.join(languageDir, file), 'utf8');
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (!match) {
        errors.push(`${language}/${file}: missing YAML frontmatter`);
        continue;
      }
      const id = file.replace(/\.md$/, '');
      const canonical = itemById.get(id);
      if (!canonical) errors.push(`${language}/${file}: translation does not match a canonical item`);
      let data;
      try {
        data = load(match[1]) ?? {};
      } catch (error) {
        errors.push(`${language}/${file}: invalid YAML (${error.message})`);
        continue;
      }
      for (const field of ['title', 'summary']) if (!data[field]) errors.push(`${language}/${file}: missing ${field}`);
      if (canonical?.data?.published !== false && !match[2].trim()) errors.push(`${language}/${file}: published item translations require body content`);
      if (canonical && (data.links ?? []).length > (canonical.data.links ?? []).length) {
        errors.push(`${language}/${file}: translation defines more link labels than canonical links`);
      }
    }
  }
}

if (featuredRanks.size !== 3) errors.push(`Expected exactly three published featured items; found ${featuredRanks.size}`);

const manifest = JSON.parse(readFileSync(path.join(root, 'cv', 'manifest.json'), 'utf8'));
const cvIds = new Set();
const outputs = new Set();
for (const variant of manifest) {
  if (cvIds.has(variant.id)) errors.push(`cv/manifest.json: duplicate id ${variant.id}`);
  if (outputs.has(variant.outputPdf)) errors.push(`cv/manifest.json: duplicate output ${variant.outputPdf}`);
  cvIds.add(variant.id);
  outputs.add(variant.outputPdf);
  if (!existsSync(path.join(root, variant.entryTypst))) errors.push(`cv/manifest.json: missing entrypoint ${variant.entryTypst}`);
}
if (manifest.filter((variant) => variant.default && variant.published).length !== 1) errors.push('cv/manifest.json: exactly one published variant must be default');

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${items.length} items, ${skillIds.size} skills, ${allowedLanguages.size} translation locales, and ${manifest.length} CV variants.`);
