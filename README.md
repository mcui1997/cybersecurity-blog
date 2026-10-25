# patch notes

A monthly cybersecurity blog: one security story a month, explained by an engineer.

Live at **https://mcui1997.github.io/cybersecurity-blog/**. It's styled to match [my portfolio](https://mcui1997.github.io/portfolio/).

## Adding a post

1. Add a file to `posts/` named `YYYY-MM-short-name.md`. The file name becomes the URL.
2. Copy the frontmatter from an existing post: `title`, `date`, `tag`, `summary`, `source`, and the `tldr` bullets.
3. Push to `main`. GitHub Actions builds and deploys the site.

Posts that aren't ready yet go in `drafts/`, which the site doesn't load.

## Running it locally

```
npm install
npm run dev
```

Built with React and Vite. Markdown is rendered with `marked`.
