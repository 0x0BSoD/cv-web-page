# Aleksandr Simonov — CV website

Buildless English/Russian website, hosted at https://away.carapulko.xyz/.

## Edit and preview

Public files are in `dist/`. Edit the English content in `dist/index.html`, Russian translations in `dist/app.js`, and layout in `dist/styles.css`. No dependencies or build step are required. The English version is usable without JavaScript. The print button opens the browser print dialog with a dedicated print stylesheet.

The resume is served at `/resume.pdf`, linked from the introduction and contact section. To update it, copy `../cv-as-latex/output/pdf/resume-rezume.pdf` to `dist/resume.pdf` before deploying.

For local preview, run `python3 -m http.server 8000 --directory dist`.

## Content sources

- LinkedIn: https://www.linkedin.com/in/asimonov0x7c5 (public profile, accessed 2026-10-15).
- GitHub identity and company: https://api.github.com/users/0x0BSoD.
- Project descriptions: public READMEs and repository metadata at https://github.com/0x0BSoD.
- Kubernetes project: https://github.com/0x0BSoD/mcp-k8s.
- Nix packaging: https://github.com/0x0BSoD/codex-flake.
- Automation: https://github.com/0x0BSoD/torrBotGo.
- Personal configuration: https://github.com/0x0BSoD/nix.

The public LinkedIn view hides detailed roles and employment dates. The website links to the complete career profile rather than inventing a timeline, achievements, metrics, or contact details. Certificates show the published validity dates. The expired Terraform Associate certificate was intentionally omitted. Recheck certificate validity when updating content. The profile does not claim availability for hiring.

## Hosting

Run `python3 scripts/deploy.py` to publish using the configured SSH key and passwordless sudo. The script verifies the uploaded archive checksum and prints the previous release and a rollback command.

Nginx serves `/var/www/away.carapulko.xyz`. Release directories live in `/var/www/cv-releases`; the document root is a symlink to the current release. Deploy only `dist/`, never this source folder. Switching the symlink is atomic and requires no service restart. Previous releases are retained for rollback.

The website shares public TCP 443 with Xray using Nginx stream SNI routing. Website deployment must not change `/etc/nginx/streams-enabled/443.conf` or the Xray configuration. HTTP port 80 serves the separate ACME webroot `/var/www/letsencrypt` and redirects other requests to HTTPS. Certificate renewal uses `certbot.timer` and its Nginx reload hook.

The site uses no analytics, cookies, or backend. The optional language preference uses browser local storage. Google Fonts is used for typography with system font fallbacks; if self-hosting the fonts later, preserve their licenses.
