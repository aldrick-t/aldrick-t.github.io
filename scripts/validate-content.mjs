import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const root = process.cwd();
const itemsDir = path.join(root, 'src', 'content', 'items');
const newsDir = path.join(itemsDir, 'news');
const itemTranslationsDir = path.join(root, 'src', 'content', 'item-translations');
const newsTranslationsDir = path.join(root, 'src', 'content', 'news-translations');
const errors = [];
const allowedTypes = new Set(['project', 'work', 'education', 'publication', 'conference', 'award', 'course', 'certification', 'volunteering']);
const allowedLanguages = new Set(['es', 'ja']);
const allowedImageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.webp']);
const allowedLinkKinds = new Set(['site', 'repository', 'publication', 'credential', 'video', 'file', 'other']);
const allowedLinkIcons = new Set(['site', 'github', 'publication', 'credential', 'video', 'file', 'external', 'other']);
const allowedVideoExtensions = new Set(['.mp4', '.webm']);
const datePattern = /^\d{4}(-\d{2})?$/;
const postedDatePattern = /^\d{4}-\d{2}$/;
const skillSource = readFileSync(path.join(root, 'src', 'data', 'skills.ts'), 'utf8');
const skillIds = new Set([...skillSource.matchAll(/id: '([^']+)'/g)].map((match) => match[1]));

function getMarkdownFiles(directory, prefix = '') {
  if (!existsSync(path.join(directory, prefix))) return [];
  return readdirSync(path.join(directory, prefix), { withFileTypes: true })
    .flatMap((entry) => {
      const relativePath = path.join(prefix, entry.name);
      if (entry.isDirectory()) return getMarkdownFiles(directory, relativePath);
      return entry.isFile() && entry.name.endsWith('.md') ? [relativePath] : [];
    })
    .sort();
}

function parseItem(file) {
  const source = readFileSync(path.join(itemsDir, file), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}: missing YAML frontmatter`);
    return null;
  }
  try {
    return { id: path.basename(file, '.md'), file, data: load(match[1]), body: match[2].trim() };
  } catch (error) {
    errors.push(`${file}: invalid YAML (${error.message})`);
    return null;
  }
}

const files = getMarkdownFiles(itemsDir).filter((file) => !file.startsWith(`news${path.sep}`));
const items = files.map(parseItem).filter(Boolean);
const ids = new Set();
const itemById = new Map();
for (const item of items) {
  if (ids.has(item.id)) {
    errors.push(`${item.file}: duplicate item slug ${item.id}; item filenames must be unique across src/content/items`);
    continue;
  }
  ids.add(item.id);
  itemById.set(item.id, item);
}
const featuredRanks = new Map();
const relevanceRanks = new Map();

function parseNews(file) {
  const source = readFileSync(path.join(newsDir, file), 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const displayFile = path.join('src', 'content', 'items', 'news', file);
  if (!match) {
    errors.push(`${displayFile}: missing YAML frontmatter`);
    return null;
  }
  try {
    return { id: path.basename(file, '.md'), file: displayFile, data: load(match[1]) ?? {}, body: match[2].trim() };
  } catch (error) {
    errors.push(`${displayFile}: invalid YAML (${error.message})`);
    return null;
  }
}

const newsItems = getMarkdownFiles(newsDir).map(parseNews).filter(Boolean);
const newsById = new Map();
for (const item of newsItems) {
  if (newsById.has(item.id)) {
    errors.push(`${item.file}: duplicate News slug ${item.id}`);
    continue;
  }
  newsById.set(item.id, item);
}

function resolvePublicItemAsset(item, assetPath, label) {
  if (!assetPath?.startsWith(`/items/${item.id}/`)) {
    errors.push(`${item.file}: ${label} must live under /items/${item.id}/`);
    return false;
  }
  const fullPath = path.join(root, 'public', assetPath);
  if (!existsSync(fullPath)) {
    errors.push(`${item.file}: missing ${label} ${assetPath}`);
    return false;
  }
  return true;
}

function getGeneratedPdfThumbnailPath(item, pdfPath) {
  const filename = pdfPath.split('/').pop() ?? '';
  const basename = filename.replace(/\.pdf$/i, '');
  return `/items/${item.id}/generated/${basename}-page-1.png`;
}

function isHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isLocalItemAssetPath(item, value) {
  return typeof value === 'string' && value.startsWith(`/items/${item.id}/`);
}

function validateItemMediaThumbnail(item, thumbnail, label) {
  if (!thumbnail || typeof thumbnail !== 'object') {
    errors.push(`${item.file}: ${label} thumbnail must be an object with path and alt`);
    return;
  }
  if (!thumbnail.alt?.trim()) errors.push(`${item.file}: ${label} thumbnail requires alt text`);
  resolvePublicItemAsset(item, thumbnail.path, `${label} thumbnail`);
  const extension = path.extname(thumbnail.path ?? '').toLowerCase();
  if (!allowedImageExtensions.has(extension)) {
    errors.push(`${item.file}: ${label} thumbnail must be an image file`);
  }
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
  if (data.relatedFallback !== undefined && data.relatedFallback !== 'skills') {
    errors.push(`${item.file}: relatedFallback must be skills when provided`);
  }
  const relationIds = new Set();
  for (const relation of data.relations ?? []) {
    if (relation.id === item.id) errors.push(`${item.file}: relation cannot point to itself`);
    if (relationIds.has(relation.id)) errors.push(`${item.file}: duplicate relation ${relation.id}`);
    relationIds.add(relation.id);
    if (!ids.has(relation.id)) errors.push(`${item.file}: broken relation ${relation.id}`);
  }
  for (const link of data.links ?? []) {
    if (!allowedLinkKinds.has(link.kind)) errors.push(`${item.file}: unsupported link kind ${link.kind}`);
    if (!link.label?.trim()) errors.push(`${item.file}: link requires label`);
    if (link.icon !== undefined && !allowedLinkIcons.has(link.icon)) {
      errors.push(`${item.file}: unsupported link icon ${link.icon}`);
    }
    if (isLocalItemAssetPath(item, link.url)) {
      resolvePublicItemAsset(item, link.url, 'link URL');
    } else if (!isHttpUrl(link.url)) {
      errors.push(`${item.file}: link URL must be http(s) or live under /items/${item.id}/`);
    }
  }
  for (const collaborator of data.collaborators ?? []) {
    if (!collaborator || typeof collaborator !== 'object') {
      errors.push(`${item.file}: collaborators must be objects with name and optional url`);
      continue;
    }
    if (typeof collaborator.name !== 'string' || !collaborator.name.trim()) errors.push(`${item.file}: collaborators require name`);
    if (collaborator.url !== undefined) {
      try { new URL(collaborator.url); } catch { errors.push(`${item.file}: invalid collaborator URL ${collaborator.url}`); }
    }
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
  const generatedPdfThumbnails = new Map();
  for (const media of data.media ?? []) {
    if (media.kind === 'image') {
      if (!media.alt?.trim()) errors.push(`${item.file}: image media requires alt text`);
      resolvePublicItemAsset(item, media.path, 'image media');
    } else if (media.kind === 'youtube') {
      if (!media.title?.trim()) errors.push(`${item.file}: YouTube media requires title`);
      if (!getYouTubeEmbedUrl(media.url ?? '')) errors.push(`${item.file}: unsupported YouTube URL ${media.url}`);
    } else if (media.kind === 'video') {
      if (!media.title?.trim()) errors.push(`${item.file}: video media requires title`);
      if (resolvePublicItemAsset(item, media.path, 'video media')) {
        const extension = path.extname(media.path).toLowerCase();
        if (!allowedVideoExtensions.has(extension)) {
          errors.push(`${item.file}: video media path must end in ${[...allowedVideoExtensions].join(' or ')}`);
        }
      }
      if (media.poster) validateItemMediaThumbnail(item, media.poster, 'video media poster');
    } else if (media.kind === 'pdf') {
      if (!media.title?.trim()) errors.push(`${item.file}: PDF media requires title`);
      const hasPath = typeof media.path === 'string' && media.path.length > 0;
      const hasUrl = typeof media.url === 'string' && media.url.length > 0;
      if (hasPath === hasUrl) {
        errors.push(`${item.file}: PDF media requires exactly one of path or url`);
      } else if (hasPath) {
        if (resolvePublicItemAsset(item, media.path, 'PDF media')) {
          const extension = path.extname(media.path).toLowerCase();
          if (extension !== '.pdf') errors.push(`${item.file}: PDF media path must end in .pdf`);
        }
        if (!media.thumbnail) {
          const generatedPath = getGeneratedPdfThumbnailPath(item, media.path);
          if (generatedPdfThumbnails.has(generatedPath)) {
            errors.push(`${item.file}: duplicate generated PDF thumbnail ${generatedPath} for ${media.path} and ${generatedPdfThumbnails.get(generatedPath)}`);
          }
          generatedPdfThumbnails.set(generatedPath, media.path);
        }
      } else if (!isHttpUrl(media.url)) {
        errors.push(`${item.file}: remote PDF media URL must use http or https`);
      }
      if (media.thumbnail) validateItemMediaThumbnail(item, media.thumbnail, 'PDF media');
    } else if (media.kind === 'file') {
      if (!media.title?.trim()) errors.push(`${item.file}: file media requires title`);
      resolvePublicItemAsset(item, media.path, 'file media');
      if (media.thumbnail) validateItemMediaThumbnail(item, media.thumbnail, 'file media');
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

for (const item of newsItems) {
  const data = item.data ?? {};
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) errors.push(`${item.file}: filename must be a lowercase kebab-case slug`);
  for (const field of ['title', 'summary', 'newsKind', 'datePosted']) if (!data[field]) errors.push(`${item.file}: missing ${field}`);
  if (!['post', 'entry'].includes(data.newsKind)) errors.push(`${item.file}: newsKind must be post or entry`);
  if (!postedDatePattern.test(String(data.datePosted ?? ''))) errors.push(`${item.file}: invalid datePosted; use YYYY-MM`);
  if (data.published !== false && data.newsKind === 'post' && !item.body) errors.push(`${item.file}: published News posts require body content`);
  if (data.newsKind === 'entry' && item.body) errors.push(`${item.file}: News entries must not contain body content`);

  const relationIds = new Set();
  for (const relation of data.relations ?? []) {
    if (!relation || typeof relation !== 'object' || !relation.id || !relation.label) {
      errors.push(`${item.file}: News relations require id and label`);
      continue;
    }
    if (relation.id === item.id) errors.push(`${item.file}: relation cannot point to itself`);
    if (relationIds.has(relation.id)) errors.push(`${item.file}: duplicate relation ${relation.id}`);
    relationIds.add(relation.id);
    const newsTarget = newsById.get(relation.id);
    const itemTarget = itemById.get(relation.id);
    if (!newsTarget && !itemTarget) errors.push(`${item.file}: broken News relation ${relation.id}`);
    if (newsTarget && newsTarget.data.newsKind !== 'post') errors.push(`${item.file}: News relation ${relation.id} must target a post`);
    if (itemTarget && itemTarget.data.published === false) errors.push(`${item.file}: News relation ${relation.id} must target a published item`);
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

if (existsSync(newsTranslationsDir)) {
  for (const language of readdirSync(newsTranslationsDir).sort()) {
    const languageDir = path.join(newsTranslationsDir, language);
    if (!allowedLanguages.has(language)) {
      errors.push(`src/content/news-translations/${language}: unsupported language directory`);
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
      const canonical = newsById.get(id);
      if (!canonical) errors.push(`${language}/${file}: translation does not match a canonical News item`);
      let data;
      try {
        data = load(match[1]) ?? {};
      } catch (error) {
        errors.push(`${language}/${file}: invalid YAML (${error.message})`);
        continue;
      }
      for (const field of ['title', 'summary']) if (!data[field]) errors.push(`${language}/${file}: missing ${field}`);
      if (canonical?.data?.published !== false && canonical?.data?.newsKind === 'post' && !match[2].trim()) {
        errors.push(`${language}/${file}: published News post translations require body content`);
      }
      if (canonical?.data?.newsKind === 'entry' && match[2].trim()) errors.push(`${language}/${file}: News entry translations must not contain body content`);
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

console.log(`Validated ${items.length} items, ${newsItems.length} News records, ${skillIds.size} skills, ${allowedLanguages.size} translation locales, and ${manifest.length} CV variants.`);
