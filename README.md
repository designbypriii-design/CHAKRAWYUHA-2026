# CHAKRAWYUHA 2026 — Editable Website

## Quick setup
1. Open `config.js` in VS Code.
2. Paste your registration link into `registrationUrl`.
3. Put your brochure PDF at `assets/brochure.pdf` (or use a public PDF URL in `brochureUrl`).
4. Put your teaser MP4 at `assets/teaser.mp4` and set `videoUrl: "assets/teaser.mp4"`, OR paste a YouTube URL.
5. Run the site using VS Code Live Server or `python -m http.server 8000` from this folder. Open http://localhost:8000.

## Customize
- `index.html` — headings, sections, event text, dates and footer.
- `styles.css` — layout, animation, colors, mobile styles.
- `script.js` — interactions, menu, video modal, scroll effects.
- `config.js` — links and media file paths.
- `assets/theme-poster.png` — original uploaded design, used as background/art.

## Publish
Upload the contents of this folder to GitHub Pages, Netlify, or another static host. All files use relative paths.

## Important
The poster image includes baked-in text and logos. It is used only as artwork behind independently editable website text. For a cleaner cinematic hero, replace `assets/theme-poster.png` with a text-free background image of the same filename.

No registration, brochure, or video URL was provided, so these are intentionally placeholders rather than invented links.

NEW: The Trials of Olympus is a playable 3-level mythology quiz. Edit questions and answers in quest.js. Player progress is saved in the browser using localStorage. No backend or prizes are involved.

## V3 — Interactive sound & narration
The Trials of Olympus now include synthesized danger sounds for wrong answers, victory fanfares for correct answers, a final celebration, and English voice narration including “Welcome to Chakrawyuha. The world of myths.” Sounds use the Web Audio API and the browser's built-in speech synthesis, so no audio files or paid services are required. A SOUND ON/OFF control saves the visitor's preference. Audio starts after a visitor interacts with the game, as browsers block automatic sound. Speech voices vary by device/browser; Chrome or Edge recommended. Edit messages in `quest.js` to customize dialogue.

## V4 Visual Effects
Each correct answer triggers lightning, screen shake and a golden portal. Completing all three trials triggers a longer grand portal and WELCOME TO CHAKRAWYUHA title. Effects use CSS and JavaScript; no extra downloads needed. For sound, click SOUND ON in the game.

V5: floating mythological relics, multi-tonal backgrounds, 3D hover cards, ornate Olympus arena and animated answer states.


V6 ADVENTURE: `adventure.js` adds a playable canvas labyrinth with a moving warrior, three collectible keys per level, roaming enemies, lives, portals, three themed stages, sound and speech, and mobile controls. Open `index.html` to play.
