// Loads every markdown file in /posts at build time.
// To add a post: drop a new file in /posts named YYYY-MM-short-name.md
// with the same frontmatter fields as the others.
import { marked } from 'marked';

const files = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

function parse(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = { tldr: [] };
  for (const line of match[1].split('\n')) {
    if (line.startsWith('- ')) meta.tldr.push(line.slice(2).trim());
    else {
      const i = line.indexOf(':');
      const key = line.slice(0, i).trim();
      if (i > 0 && key !== 'tldr') meta[key] = line.slice(i + 1).trim();
    }
  }
  return { meta, body: match[2] };
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const { meta, body } = parse(raw);
    const words = body.split(/\s+/).filter(Boolean).length;
    return {
      slug,
      month: slug.slice(0, 7),
      title: meta.title || slug,
      date: meta.date || slug.slice(0, 7),
      tag: meta.tag || 'misc',
      summary: meta.summary || '',
      source: meta.source || '',
      tldr: meta.tldr,
      minutes: Math.max(1, Math.round(words / 220)),
      html: marked.parse(body),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const tags = [...new Set(posts.map((p) => p.tag))].sort();
