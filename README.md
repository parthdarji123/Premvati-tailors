<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0d340218-d3c3-4217-97d8-7b0ce36ac620

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Export / Deploy as a Website

Option A — Docker (recommended for static hosting):

Build the production bundle and image, then run:

```bash
npm run build
docker build -t premvati-site:latest .
docker run --rm -p 8080:80 premvati-site:latest
```

Open http://localhost:8080 to view the site.

Option B — Static files (manual):

After `npm run build`, the production-ready static files are in `dist/`. Upload the contents of `dist/` to any static hosting provider (Netlify, Vercel, S3 + CloudFront, GitHub Pages).

Option C — GitHub Pages (simple):

1. Commit the `dist/` contents to a branch (e.g., `gh-pages`) or use a deploy tool. GitHub can serve the `gh-pages` branch or the `dist/` folder via Actions.

If you want, I can add a `Dockerfile` (done), or set up a GitHub Actions workflow to automatically deploy when you push — tell me which provider you prefer and I'll scaffold it.
