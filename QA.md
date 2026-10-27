# Verification record - five scenes, 1080p on every screen

Status: developer integration and QA complete; independent reviewer returned GO for the exact fingerprint below. The user authorized publication. Earlier responsive-source build fingerprints are superseded. This record describes the reviewed build; deployment verification is retained separately with the release evidence.

## Build and media identity

- Approved media commit: `1114db0d92a993fd3a8f5326d008831810037269`; tree `0d78016801bd57dab5dee606804064a8a2c81ead`.
- Nature's four media paths and manifest/provenance were downloaded through official GitHub API blob reads and .NET Base64 decoding at that exact ref. Git blob identities and sizes were checked, followed by all twenty manifest byte sizes and SHA256 hashes. All PASS. All other sixteen media files remain unchanged.
- Ten MP4 variants pass the independent Node atom parser: H.264, one video track, no audio, five seconds, 24 fps, declared dimensions and faststart. This is not an ffprobe claim.
- All five selected videos and posters are 1920x1080. The runtime always uses the unsuffixed `.mp4` and `.webp`; no viewport branch or mobile poster/preload is present. Older mobile-named files remain unused.
- Nature video SHA256: `bb00a6e417b9c76b1935fe21da79d8e894d7c5bba0ab52477366bf8078a869ce`; poster SHA256: `3664ea6f04c42bae8405ebeb59d8cacd7d6589b47961eb3f6d401351d77637fb`. Its mobile-named copies contain identical approved bytes.
- Nature is a Lanczos spatial upscale of the accepted 1280x720 loop. All 120 frames/timestamps and the existing overlap are retained. This is 1080p delivery, not native 1080p generation, AI enhancement or recovered detail. Provenance is preserved unchanged.
- Nine Node tests PASS, including a release assertion that every selected video/poster declares 1920x1080. Motion preference, visibility/error policy, subscription cleanup and complete media handoffs are also covered.
- TypeScript/Vite build PASS: `2026-10-27T20:25:03.391Z`.
- Final distribution fingerprint: `174d44bd797c01362247bc3a30f0a0fb7fcbf0f21a643643fb24014e84215a51`, 29 files. Reproduce with `node scripts/build-fingerprint.mjs`.
- JS: `index-DtwdCV75.js`, 368.54 kB / 116.99 kB gzip. CSS: `index-C0pLRWIB.css`, 22.87 kB / 5.85 kB gzip. Explicit GitHub Pages base `/elysia-experience/` and local fonts remain unchanged.

## Browser checks on the final production build

The browser directly identified `index-DtwdCV75.js`. At 320x568 and 390x844, all five actual selected video URLs lack the -mobile suffix. After metadata loading, every videoWidth/videoHeight and every poster naturalWidth/naturalHeight equals 1920x1080, including Nature. Hero preload also uses its 1080p poster without a breakpoint. At initial page load only Hero receives a video source; lower scenes attach near the viewport.

Nature's actual footage was inspected in its card at 390x844 and 1440x900. It plays at playbackRate 1. Offscreen Hero/Featured/Philosophy pause while the visible exploration cards play. Global Pause stops all five, survives anchor navigation and reload, and leaves every video source unattached on paused reload. Anchor focus resolves to the destination. The 320px Hero retains the visible swan and the CTA above its head. These sizes show matching document clientWidth/scrollWidth and no laid-out interactive target below 44x44 px. Normal production console warnings/errors were empty.

The preceding five-video integration additionally checked 360x800, 768x1024, 844x390, 1180x800 and 1920x1080, mobile menu/Escape, keyboard focus/Space, all new scenes and their retry/control placement. No CSS/layout changed since those captures; the final targeted retest covers the changed source selection and Nature output at 320, 390 and 1440. Those earlier checks are retained locally as historical evidence rather than claimed reruns of this final build.

A rapid reload/anchor sequence found an offscreen Hero playback issue during the five-scene integration. The fix remains in this final build: initial visibility waits for the observer, thresholds include 0 and 5%, and playback requires at least 5% intersection. The final offscreen observations passed. Adjacent visible scenes may play together; no hard two-decoder maximum is claimed.

## Controlled development fault cases

Query hooks are compiled out of production. These are application-level simulations, not native network interception or OS emulation.

- Reduced motion: all five sources stay empty, full-size posters remain visible and reveals are not stuck at opacity zero. Explicit opt-in was retested on the final Nature source and reached ready state at 1920x1080.
- Missing media: Nature retains its 1920x1080 poster, content and Retry motion control at 320px. Retry reattempts the deliberately unavailable endpoint and remains in a usable error state. Recovery after actually restoring a failed endpoint was not simulated. The three new sections' fallback surfaces passed the earlier integration checks.
- Autoplay rejection: Nature shows Play scene; the explicit action reaches ready/playing state with intrinsic 1920x1080. Featured/Philosophy/Temple passed the equivalent controlled recovery in the integration checks.
- Delayed load: the eight-second delay keeps Nature's full-size poster visible with no source attached. Its frame is 200.400px high and article 478.400px high before and after video readiness. This is a specific geometry check, not a complete field CLS measurement.

## Performance and visible loop limits

The five selected videos total **23,506,001 bytes** and their posters **2,584,460 bytes** (26,090,461 combined). Video bytes are 93.6% higher than the previous mobile collection's 12,142,293 bytes. Full repository media, including unused variants, totals 42,006,517 bytes. Lazy attachment, offscreen pause, persistent Pause and reduced-motion source opt-out remain active. No Lighthouse, CPU, battery, throughput or real-device frame-rate result is claimed.

Nature's final 1080p video completed repeated desktop loops at playbackRate 1 (eight desktop loops and ten mobile loops recorded in the development counter). Earlier page checks recorded repeated loops for Featured/Philosophy/Temple. Counters and static frames establish progression and rendering, not continuous subjective seam perception.

The approved handoff reports source/upscale anatomy and architecture review. Featured/Philosophy retain their brief circular-dissolve neck echo near 4.833-4.917 seconds; a Featured page screenshot captured that contour. Nature retains its previous short overlap and can briefly soften/double moving contours. No black fade or CSS movement substitute was introduced. No clip is described as perfectly seamless or ghost-free. The snapshot interface cannot establish whether the short echo is distracting in continuous normal-speed viewing; that remains an explicit review boundary.

## Evidence and independent gate

Current screenshots and machine-readable observations: `review/final-1080/`. Distribution hash list: `review/build-manifest.json` and its copy in that folder. Previous integration/preparation evidence remains in `review/five-scenes/` and `review/all-screens-1080/`. Review files are gitignored and contain product evidence only.

Independent review returned GO for fingerprint `174d44bd797c01362247bc3a30f0a0fb7fcbf0f21a643643fb24014e84215a51`. A nonblocking P3 finding remains: opening the page directly with `#featured` can initially show Hero; clicking the page's section links works. The reviewed runtime is unchanged for publication.

Native system reduced-motion, actual document hidden/visible transitions, continuous subjective seam perception, real touch hardware/safe areas, alternate browser engines and production network interception remain unverified. Visibility policy and subscription cleanup have unit coverage; the IAB previously continued reporting document.hidden=false when another tab opened. No blocked Git HTTPS/Python/Blender process, security settings, subscriptions or credentials were changed or bypassed.
