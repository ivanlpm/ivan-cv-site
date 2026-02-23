# Copilot Instructions for `ivan-cv-site`

## Project Snapshot
- This is a **static single-page CV site** (no build step, no framework, no package manager).
- Runtime stack is plain `index.html` + `styles/main.css` + `scripts/main.js`.
- Main content source is the `cvData` object in `scripts/main.js`; UI sections are rendered from that data at runtime.

## Architecture and Data Flow
- `index.html` provides semantic section containers and stable IDs.
- `boot()` in `scripts/main.js` runs on `DOMContentLoaded` and orchestrates all rendering + behavior setup.
- Rendering is function-driven:
  - `renderProfessionalSummary()` → `#professional-summary-content`
  - `renderExperience(activeFilter)` → `#experience-list`
  - `renderSkillsByCategory()` → `#skills-grid`
  - `renderContactSection()` and `renderList(...)` fill contact/education/language/certification areas
- Experience spotlight flow:
  - URL hash is parsed by `getActiveSpotlight()` (`all`, `backend`, `ai-agents`, `leadership`)
  - `sortBySpotlight()` reorders entries (relevant first), then `renderExperience()` marks cards with `.relevant` or `.muted`
  - Buttons (`.spotlight-btn`) sync state via `aria-pressed` and update hash/history

## Critical Editing Rules in This Repo
- Keep **content changes** in `cvData` whenever possible; avoid hardcoding text in `index.html`.
- Keep IDs in `index.html` stable; many render helpers rely on exact IDs (`setText`, `setLink`, `clearNode`).
- When injecting HTML via template strings, preserve `escapeHtml(...)` use for dynamic values.
- If you add a new spotlight/filter:
  - update `SPOTLIGHTS`
  - ensure matching `data-filter` button in `index.html`
  - include the tag in relevant `experience[].tags`
- If you add a new skill category:
  - add category list under `cvData.skills`
  - add matching metadata in `SKILL_META` (title + icon)

## Styling and UI Conventions
- Design tokens are CSS custom properties in `:root` (`styles/main.css`). Prefer token reuse over new hardcoded colors.
- Theme variants are body classes: `theme-tech-blue`, `theme-warm-editorial`, `theme-geo-grid`.
- Card styling is shared across `.timeline-card`, `.skill-card`, and `.info-columns article`; keep visual parity when extending.
- Motion system:
  - reveal-on-scroll uses `.reveal` + `.show` with `IntersectionObserver`
  - respect reduced motion (`@media (prefers-reduced-motion: reduce)` already disables animations)

## Assets and Fallbacks
- Profile image path defaults to `assets/img/profile.jpg`; `<picture>` optionally uses `profile.webp` first.
- JS fallback on image load error swaps to `assets/img/profile-placeholder.svg` (`setupPhotoFallback()`).
- CV download button points to `assets/cv/IVAN LOPEZ MARCHANTE CV-2.pdf` (filename includes spaces).

## Developer Workflows
- Local preview (from repo root):
  - `python3 -m http.server 8080`
  - open `http://localhost:8080`
- Deployment:
  - GitHub Pages via `.github/workflows/pages.yml`
  - every push to `main` deploys repository root as static artifact
- There are currently no repo-defined test/lint/build commands.

## Integration Points and External Dependencies
- External dependencies are intentionally minimal:
  - Google Fonts loaded in `index.html`
  - external links to LinkedIn/GitHub profiles and mailto contacts
- Social/SEO metadata is in `index.html` (`og:*`, canonical, theme-color, favicon links).

## Safe Change Patterns for AI Agents
- Prefer small, targeted edits in one layer at a time (data, markup IDs, behavior, or styles).
- When adding new dynamic fields, follow existing helper usage (`setText`, `setLink`, `renderList`) before creating new patterns.
- Preserve accessibility attributes already in use (`aria-label`, `aria-pressed`, `role="list"`, skip link).
- Keep script loading as a plain bottom-of-body include (`<script src="scripts/main.js"></script>`); do not introduce bundlers unless explicitly requested.