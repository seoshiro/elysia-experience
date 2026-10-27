export const sceneNames = ['01-hero', '02-featured', '03-philosophy', '04-nature', '05-temple'];

// A scene becomes motion-capable only after its complete published asset set arrives.
export function sceneMotionFiles(name) {
  return [
    { file: `${name}.mp4`, kind: 'video' },
    { file: `${name}-mobile.mp4`, kind: 'video' },
    { file: `${name}.webp`, kind: 'poster' },
    { file: `${name}-mobile.webp`, kind: 'poster' },
  ];
}

export function hasSceneMotion(assets, name) {
  return sceneMotionFiles(name).every(required => assets.some(asset =>
    asset.file === required.file && asset.kind === required.kind));
}
