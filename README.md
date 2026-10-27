# Elysia - A World Beyond Time

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

The composition contains **five real image-to-video scenes**: Hero and The Living Waters were generated using Gemini; Featured, Philosophy, and The Forgotten Sanctuary were generated using Google Flow. Every screen now uses the same full-size video and WebP poster. The older mobile variants remain in the repository but are not selected by the interface or preload. No CSS movement substitutes for footage.

All selected clips and posters are **1920x1080 on every screen**, with silent H.264 video, 24 fps, five-second loops, and faststart. Hero uses the supplied 1080p upscale; the three Flow scenes use its 1080p upscale downloads. Nature is a Lanczos spatial upscale of its accepted 1280x720 loop, preserving all 120 frames and timing. It is a 1080p delivery file, not native 1080p generation, AI enhancement or recovered detail. Public provenance records these distinctions.

Using the full-size sources increases mobile data and decoding cost. Selected videos total 23.51 MB versus 12.14 MB for the former mobile selection (about 94% more); the five selected posters add 2.58 MB. Only Hero starts immediately; lower scenes remain lazy, and Pause/reduced-motion still avoid unnecessary playback. These are file-size budgets, not measured bandwidth, battery or device-performance results.

A short encoded overlap softens each loop boundary. Featured and Philosophy can briefly show doubled swan-neck contours near 4.833-4.917 seconds; moving petals and reflections can soften during the overlap. Hero and Nature retain their previously approved overlap. No black fade is added. These loops are not described as perfectly seamless, and continuous subjective seam perception remains unverified through the screenshot-based QA interface.

`public/media/manifest.json` records twenty media files, byte sizes, dimensions, and SHA256 hashes. `provenance.json` records generation and processing without private account URLs or credentials. `npm run verify:media` checks every hash and independently parses MP4 structure for dimensions, duration, frame rate, codec, audio absence, and faststart ordering.

## Behavior and accessibility

- All navigation and editorial calls to action lead to real sections.
- Keyboard focus, an accessible mobile menu, skip link, and 44 px interaction targets.
- Stable posters underneath video; content and navigation remain available while media loads or fails.
- Hero loads first; the four lower videos load near the viewport. Invisible scenes and scenes in a hidden document pause.
- Every scene has access to the shared motion preference; the three new scenes have a local control over their image.
- User motion preference persists locally after scrolling away, returning, and reloading.
- Reduced-motion defaults to posters without video requests; visitors may deliberately opt in.
- No accounts, forms, backend, tracking scripts, or third-party font requests.

## Verification

See `QA.md` for the current verification record and explicitly unverified cases. The all-screen 1080p build passed its independent review gate. Development-only controlled fault cases are available at `?qa=reduced`, `?qa=media-error`, `?qa=autoplay`, and `?qa=slow`. These conditions are compiled out of production builds.

The GitHub Actions workflow tests the project, validates media hashes, builds, and deploys to GitHub Pages on pushes to main. Site: https://seoshiro.github.io/elysia-experience/

## Asset credits

Scene artwork was supplied for this project; two scenes were animated with Gemini and three with Google Flow. Website media outputs were approved for publication. Observed provider UI labels are recorded in provenance, without asserting an independently verified backend model version. Instrument Serif: Rodrigo Fuenzalida / Instrument, Google Fonts distribution; license in `public/fonts/OFL.txt`. Icons: Lucide (ISC). Structural inspiration: the Asme liquid glass experience, with Elysia's own content and media.
