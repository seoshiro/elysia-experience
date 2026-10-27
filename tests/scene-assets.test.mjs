import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { hasSceneMotion, sceneMotionFiles, sceneNames } from '../src/scene-assets.mjs';

test('a partial handoff never enables requests for unavailable scene media', () => {
  const complete=sceneMotionFiles('02-featured');
  assert.equal(hasSceneMotion([{file:'02-featured.webp',kind:'still'}], '02-featured'), false);
  for (let missing=0; missing<complete.length; missing++) {
    assert.equal(hasSceneMotion(complete.filter((_,i)=>i!==missing),'02-featured'),false);
  }
  assert.equal(hasSceneMotion(complete,'02-featured'),true);
  assert.equal(hasSceneMotion(complete,'03-philosophy'),false);
});

test('a static image cannot be silently relabeled as an approved video poster', () => {
  const assets=sceneMotionFiles('05-temple').map(a => a.file==='05-temple.webp' ? {...a,kind:'still'} : a);
  assert.equal(hasSceneMotion(assets,'05-temple'),false);
});

test('the approved manifest supplies complete motion assets for all five scenes', () => {
  const manifest=JSON.parse(readFileSync(new URL('../public/media/manifest.json',import.meta.url)));
  for (const name of sceneNames) assert.equal(hasSceneMotion(manifest.assets,name),true,name);
});

test('the full-size video and poster selected on every screen are 1920x1080', () => {
  const {assets}=JSON.parse(readFileSync(new URL('../public/media/manifest.json',import.meta.url)));
  for (const name of sceneNames) {
    for (const ext of ['mp4','webp']) {
      const file=`${name}.${ext}`;
      const asset=assets.find(a=>a.file===file);
      assert.ok(asset, file);
      assert.deepEqual([asset.width,asset.height],[1920,1080],file);
    }
  }
});
