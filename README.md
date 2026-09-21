# AI / Data Science Portfolio

Static Astro portfolio for projects and writing. Hosted on GitHub Pages. No paid services required.

## Local development

```bash
npm install
npm run dev
```

## Production test

```bash
npm run build
```

## Add a project

Ask the implementation agent:

```text
Add this project: <URL>
```

## Add writing

Ask the implementation agent:

```text
Publish this: <content>
```

## Configure your identity

Edit `src/site.config.ts`:

- `name`, `headline`, `description`, `tagline`
- `url` (production origin, e.g. `https://yourusername.github.io`)
- `base` (`""` for a user site, or `"/repo-name"` for a project site)
- `github`, `linkedin`, `email` (leave empty to hide)

## Deploy

Ask the implementation agent to commit and push. The agent prepares the build and
git steps, then waits for your explicit approval before committing or pushing.

One-time GitHub setting (if needed):

1. Prefer repo `yourusername/yourusername.github.io` for a root site.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.

If the repo is not `username.github.io`, set `site.base` to `"/your-repo-name"` and `site.url` to `https://username.github.io` before deploying.
