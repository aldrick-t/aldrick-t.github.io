import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [slug, newsKind = 'post'] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Usage: npm run new:news -- <kebab-case-slug> [post|entry]');
if (!['post', 'entry'].includes(newsKind)) throw new Error('News kind must be post or entry');

const output = path.join(process.cwd(), 'src', 'content', 'items', 'news', `${slug}.md`);
if (existsSync(output)) throw new Error(`News slug ${slug} already exists at ${output}`);
mkdirSync(path.dirname(output), { recursive: true });

const title = slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
const date = new Date().toISOString().slice(0, 7);
const body = newsKind === 'post' ? '\nReplace with the complete post.\n' : '\n';
writeFileSync(output, `---
title: "${title}"
summary: "Replace with a concise summary."
newsKind: "${newsKind}"
datePosted: "${date}"
published: false
relations: []
---${body}`);
console.log(`Created ${path.relative(process.cwd(), output)}`);
