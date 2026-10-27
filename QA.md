# Verification record

Status: the independent regression gate passed on 2026-10-27 at 14:24 UTC. All three reported defects were independently confirmed fixed in production. Publication uses the same interface with the explicit GitHub Pages base `/elysia-experience/`.

## Build and media

- TypeScript and Vite production build passed. The final identical rebuild was recorded on 2026-10-27 at 14:13:24 UTC.
- Five Node tests passed: reduced-motion default, explicit play, persistent pause policy, viewport/foreground/error policy, and visibility subscription cleanup.
- All eleven media byte sizes and SHA256 hashes match the approved manifest from media commit `e16d76a936ec500eaae61bf34b004c4832dd9d4d`.
- Independent MP4 atom inspection confirms all four video variants are H.264, silent, five seconds, 24 fps, with the expected dimensions and faststart ordering. This was a Node parser check, not an ffprobe run.
- Production JavaScript is 362.62 kB; CSS is 22.23 kB. Fonts are local; no Google Fonts runtime request is needed.
- Distribution fingerprint: `f6485d7273c2b9e3080fe86cce4b8831afa5a5c1844908370243730bd0ea02f0`. Reproduce with `node scripts/build-fingerprint.mjs`.
- Production preview opens successfully with no console warnings/errors. Hero plays; Nature starts without an attached source.

## Independent findings and fix verification

- Deployment-path rebuild: 2026-10-27 14:28:00 UTC, fingerprint `9b7d307e8a6b778773ac83492fead7bbb24b9c8af878fce6d3282c924b2efe6f`. Only the Vite base changed to `/elysia-experience/`; interface and media remained unchanged. Build, all five tests and all eleven media hashes passed again. The subpath preview loaded images, local typography and real Hero video; About and Explore anchors retained destination focus, and console warnings/errors were empty.

- Removed the body's 320px minimum width instead of hiding overflow. At viewport 320x568 and 320x740, document clientWidth and scrollWidth both equal 305px with the browser's 15px scrollbar.
- On narrow, short portrait screens, moved the Hero content upward and reduced its internal spacing. At 320x568 the Discover Elysia target spans y=331.75 to 383.75; the swan's head remains visible below it in both the paused poster and actual playing MP4 captures.
- Header and footer Explore links now have actual 44x44px targets. Every laid-out link and button inspected has both dimensions at least 44px.
- Production regression captures and DOM measurements passed at 320x568, 320x740, 360x800, 390x844, 844x390, and 1180x800. All six measurements compare scrollWidth to clientWidth. Console warnings/errors were empty. Evidence: `review/fix-responsive-checks.json` and `review/fix-*.jpg`.
- The earlier reviewer independently passed 768, 1440 and 1920px layouts, all page sections and the interaction scenarios in its report. Those wider layouts were not rerun after this CSS-only fix. The new rules affect the body's minimum and navigation target widths, with Hero spacing scoped below 360px width and 661px height.
- Initial checks against innerWidth missed the 320px scrollbar overflow. Initial interactive checks verified height only. The independent review exposed these defects; the corrected checks above verify clientWidth and both target dimensions.

## Browser scenarios checked

- Desktop Hero, About, Featured, Philosophy and Exploration; mobile Hero, About, Exploration and footer. Mobile Hero crop retains a whole swan and temple/lotus detail. Featured caption moves below the image on narrow screens.
- Main, section and footer anchors resolve to actual IDs. Mobile navigation focuses its first link, Escape closes it and returns focus, and anchor navigation focuses the destination section. Keyboard focus is visibly outlined.
- Hero pauses offscreen. Nature attaches its source near the viewport and plays when visible.
- Pause updates all motion controls, survives viewport re-entry and persists on reload without attaching video sources.
- Controlled development reduced-motion case: no video source attached and no reveal stuck at opacity zero.
- Controlled development media 404: poster, heading and navigation remain visible, with explicit retry. A loading-error/autoplay classification race was fixed and retested.
- Controlled development autoplay rejection: poster and Play scene action shown; explicit click resumes playback.
- Controlled eight-second source delay: poster remains visible; Hero and heading geometry match before and after playback.
- Hero and Nature ran at playbackRate=1 across repeated loops. Counters and static screenshots confirm playback and rendered imagery only; they do not establish perceptual review of continuous movement across seams. The encoded overlap may show a brief doubled contour. Its subjective distraction remains unverified, and the loops are not claimed to be perfectly seamless.

## Remaining boundaries

- The in-app browser continued reporting document.hidden=false when another automation tab opened. Native background/foreground transition remains unverified; policy and subscription behavior are tested independently.
- Reduced-motion, delayed load and autoplay/network failures were controlled application scenarios, not native operating-system media emulation or production network interception.
- Continuous normal-speed perceptual seam review is unavailable through this static screenshot interface. Touch hardware, actual mobile safe-area behavior and alternate browser engines were also unavailable.
- Initial concurrent viewport interference was resolved by separate review sessions. The reviewer confirmed tablet, wide and landscape layouts; the six fix captures were taken without concurrent viewport changes.
- Publication is based on the approved remote media tree, preserving all media blobs, with a guarded main update and no force.
- No Windows security settings or browser policy were changed or bypassed.

Product screenshots and machine-readable evidence are retained locally under `review/` (gitignored). No account screenshots or private transfer material are included.
