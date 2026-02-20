# Ivan CV Site

Single-page professional CV website for **Ivan Lopez Marchante**, designed for GitHub Pages.

## Live URL (expected)

`https://ivanlpm.github.io/ivan-cv-site/`

## Tech

- HTML
- CSS
- Vanilla JavaScript

## Project structure

- `index.html`
- `styles/main.css`
- `scripts/main.js`
- `assets/cv/IVAN LOPEZ MARCHANTE CV-2.pdf`
- `.github/workflows/pages.yml`

## Local preview

From this folder:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## GitHub Pages deployment

This repo includes a workflow that deploys to GitHub Pages on pushes to `main`.

1. Create the repository `ivan-cv-site` under `ivanlpm`.
2. Push this project to `main`.
3. In GitHub repository settings, ensure Pages source is `GitHub Actions`.
4. Wait for the `Deploy static content to Pages` workflow to complete.

## Content updates

Main content is centralized in `scripts/main.js` inside the `cvData` object.
Update profile, experience, and contact info there.
