import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [slug, type = 'project'] = process.argv.slice(2);
const types = ['project', 'work', 'education', 'publication', 'conference', 'award', 'course', 'certification', 'volunteering', 'news'];
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Usage: npm run new:item -- <kebab-case-slug> [type]');
if (!types.includes(type)) throw new Error(`Type must be one of: ${types.join(', ')}`);
const output = path.join(process.cwd(), 'src', 'content', 'items', `${slug}.md`);
if (existsSync(output)) throw new Error(`${output} already exists`);

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
links: []
assets: []
relations: []
cvReview: []
---

Replace with the complete item description.
`);
console.log(`Created ${path.relative(process.cwd(), output)}`);
