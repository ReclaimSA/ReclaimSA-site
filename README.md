# ReclaimSA - PWA-ready static site

Files included:
- index.html  (main site - PWA-ready)
- manifest.json (PWA manifest)
- sw.js (service worker for offline caching)
- README.md (this file)

## Quick start (preview locally)
1. Extract the zip and open `index.html` in a browser to preview.
2. To test the PWA install flow, serve the folder via a simple local server (required for service worker):
   - Python 3: `python -m http.server 8000` then visit `http://localhost:8000/`
   - This allows the service worker to register. On Android/Chrome you can then "Add to Home screen".

## Deploy to GitHub Pages (recommended)
1. Create a new public repository on GitHub (e.g., `ReclaimSA-site`) and upload the files at the repository root.
2. In your repo settings -> Pages, set the branch to `main` (or the branch you use) and folder to `/ (root)`.
3. Wait a minute and visit `https://YOURUSERNAME.github.io/REPOSITORYNAME/`.

## Customize (important)
- Replace the petition link (in `index.html`) with your ActionNetwork/Change.org/Google Form petition URL.
- Replace the Formspree endpoint in the signup form `action="https://formspree.io/f/your-form-id"` with your Formspree URL OR use Netlify Forms (add `data-netlify="true"` attribute and remove action) OR embed a Google Form.
- Replace `press@reclaimsa.org` and `info@reclaimsa.org` with your real contact emails.
- Add icons named `icon-192.png` and `icon-512.png` to the folder if you want custom install icons (optional).

## Recommended next steps
- Set up a Mailchimp/Sendinblue account and embed the signup widget (or use Google Forms).
- Create your petition on ActionNetwork or Change.org and update the petition link.
- Create Google Sheets / Airtable for volunteer data and secure access.
- Publish a first "news" post and share widely.

## Notes on safety & legality
This site is intended to support lawful, peaceful civic action. Do not use it to coordinate unlawful activities, block essential services, or plan violence. Always publish the Code of Conduct and encourage non-violence.
