import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

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

const [slug, type = 'project'] = process.argv.slice(2);
const types = ['project', 'work', 'education', 'publication', 'conference', 'award', 'course', 'certification', 'volunteering', 'news'];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Usage: npm run new:item -- <kebab-case-slug> [type]');
if (!types.includes(type)) throw new Error(`Type must be one of: ${types.join(', ')}`);
const itemsDir = path.join(process.cwd(), 'src', 'content', 'items');
const existing = getMarkdownFiles(itemsDir).find((file) => path.basename(file, '.md') === slug);
if (existing) throw new Error(`Item slug ${slug} already exists at ${path.join(itemsDir, existing)}`);
const outputDir = path.join(itemsDir, type);
const output = path.join(outputDir, `${slug}.md`);
mkdirSync(outputDir, { recursive: true });

const title = slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
writeFileSync(output, `---
title: "${title}"
type: "${type}"
summary: "Replace with a concise summary."
dateStart: "${new Date().getFullYear()}"
dateEnd: "${new Date().getFullYear()}"
highlights: []
skills: []
tags: []
published: false
portfolio: true
timeline: false
# relevanceRank: 1
# links kind: site, repository, publication, credential, video, file, other
# link url accepts http(s) or /items/${slug}/...
# optional link icon: site, github, publication, credential, video, file, external, other
links: []
assets: []
# thumbnail:
#   path: "/items/${slug}/thumbnail.webp"
#   alt: "Describe the thumbnail image."
#   objectFit: "cover"
#   objectPosition: "50% 50%"
#   backgroundColor: "#ffffff"
#   aspectRatio: "16 / 10"
# media kind: image, youtube, video, pdf, file
media: []
collaborators: []
relations: []
cvReview: []
---

Replace with the complete item description.
`);
console.log(`Created ${path.relative(process.cwd(), output)}`);
