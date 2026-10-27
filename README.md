# Elysia — A World Beyond Time

A cinematic, responsive single-page experience of water, stone, and light. Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide. Instrument Serif is self-hosted under its included SIL Open Font License.

## Run locally

Requires Node.js 22.12+ or 24+.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run verify:media
npm run build
npm run preview
```

Production output is `dist/`. Vite uses the explicit `/elysia-experience/` base for GitHub Pages and local previews. The official `@rollup/wasm-node` npm override avoids a native Rollup dependency; no security-policy changes are required.

## Media

The agreed composition contains **two real Gemini image-to-video scenes** (Hero and The Living Waters) and **three static WebP scenes** (Featured, Philosophy, and The Forgotten Sanctuary). Static scenes do not simulate video with CSS movement.

Both clips use silent H.264, 24 fps, five-second loops, and faststart. Hero uses the supplied 1080p upscale: desktop 1920×1080 and mobile 1280×720. The Living Waters remains 1280×720 on desktop and 960×540 on mobile. A short encoded overlap softens the boundary. A brief doubled contour may remain around a moving swan during that overlap; these are not described as perfectly seamless loops.

`public/media/manifest.json` records eleven media files, byte sizes, dimensions, and SHA256 hashes. `provenance.json` records generation and processing without private account URLs or credentials. `npm run verify:media` checks every hash and independently parses MP4 structure for dimensions, duration, frame rate, codec, audio absence, and faststart ordering.

## Behavior and accessibility

- All navigation and editorial calls to action lead to real sections.
- Keyboard focus, an accessible mobile menu, skip link, and 44 px interaction targets.
- Stable posters underneath video; content and navigation remain available while media loads or fails.
- Nature loads near the viewport. Invisible scenes and scenes in a hidden document pause.
- User motion preference persists locally after scrolling away, returning, and reloading.
- Reduced-motion defaults to posters without video requests; visitors may deliberately opt in.
- No accounts, forms, backend, tracking scripts, or third-party font requests.

## Verification

See `QA.md` for the verification record and explicitly unverified cases. The independent layout regression gate passed. Development-only controlled fault cases are available at `?qa=reduced`, `?qa=media-error`, `?qa=autoplay`, and `?qa=slow`. These conditions are compiled out of production builds.

The GitHub Actions workflow tests the project, validates media hashes, builds, and deploys to GitHub Pages on pushes to main. Site: https://seoshiro.github.io/elysia-experience/

## Asset credits

Scene artwork was supplied for this project; two scenes were animated with Gemini and all website outputs were approved for publication. Instrument Serif: Rodrigo Fuenzalida / Instrument, Google Fonts distribution; license in `public/fonts/OFL.txt`. Icons: Lucide (ISC). Structural inspiration: the Asme liquid glass experience, with Elysia's own content and media.

