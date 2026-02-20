# Iván CV Site

Single-page professional CV website for **Iván López Marchante**, designed for GitHub Pages.

## Live URL

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
- `assets/img/profile.jpg` (required portrait)
- `assets/img/profile.webp` (optional optimized portrait)
- `.github/workflows/pages.yml`

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## GitHub Pages deployment

This repo deploys to GitHub Pages via Actions on pushes to `main`.

## Content updates

Main content is centralized in `scripts/main.js` inside `cvData`.

## Portrait asset

For final production portrait rendering, place your photo at:

- `assets/img/profile.jpg`

Optional WebP version:

- `assets/img/profile.webp`
