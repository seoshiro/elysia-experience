import manifest from '../public/media/manifest.json';
import { SceneVideo } from './Motion';
import { hasSceneMotion } from './scene-assets.mjs';

type Props = {
  name: string;
  alt: string;
};

// Until the verified handoff is complete, retain the existing, honestly static scene.
export function SceneMedia({ name, alt }: Props) {
  if (hasSceneMotion(manifest.assets, name)) {
    return <SceneVideo name={name} alt={alt} controls />;
  }
  return <img src={`${import.meta.env.BASE_URL}media/${name}.webp`} alt={alt}
    width="1672" height="941" loading="lazy" decoding="async" />;
}
