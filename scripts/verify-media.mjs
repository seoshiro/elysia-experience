import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
import { hasSceneMotion, sceneMotionFiles, sceneNames } from '../src/scene-assets.mjs';
const root = path.resolve('public/media');
const manifest = JSON.parse(readFileSync(path.join(root, 'manifest.json')));
const expectedFiles = new Set();
assert.equal(new Set(manifest.assets.map(asset => asset.file)).size, manifest.assets.length, 'unique manifest files');
for (const name of sceneNames) {
  const hasVideo = manifest.assets.some(asset => asset.file === `${name}.mp4` || asset.file === `${name}-mobile.mp4`);
  if (hasVideo) {
    assert(hasSceneMotion(manifest.assets, name), `${name}: complete desktop/mobile video and poster handoff`);
    sceneMotionFiles(name).forEach(asset => expectedFiles.add(asset.file));
  } else {
    assert(manifest.assets.some(asset => asset.file === `${name}.webp` && asset.kind === 'still'), `${name}: existing static fallback`);
    expectedFiles.add(`${name}.webp`);
  }
}
for (const name of ['01-hero', '04-nature']) assert(hasSceneMotion(manifest.assets, name), `${name}: preserve approved motion`);
assert.deepEqual(new Set(manifest.assets.map(asset => asset.file)), expectedFiles, 'only complete scene asset sets');
function atoms(b, start = 0, end = b.length) { const list = []; for (let p = start; p + 8 <= end;) { const n = b.readUInt32BE(p), type = b.toString('ascii',p+4,p+8); if (n < 8 || p+n > end) break; list.push({ type, start:p+8, end:p+n }); p+=n; } return list; }
function child(b,a,type){return atoms(b,a.start,a.end).find(x=>x.type===type)}
for (const asset of manifest.assets) {
  const b = readFileSync(path.join(root,asset.file));
  assert.equal(b.length,asset.bytes, `${asset.file}: size`);
  assert.equal(createHash('sha256').update(b).digest('hex'),asset.sha256,`${asset.file}: SHA256`);
  if(asset.kind==='video') {
    const top=atoms(b),moov=top.find(a=>a.type==='moov'),mdat=top.find(a=>a.type==='mdat');
    assert(moov&&mdat&&moov.start<mdat.start,'faststart');
    const tracks=atoms(b,moov.start,moov.end).filter(x=>x.type==='trak'); let videos=0;
    for(const track of tracks){const mdia=child(b,track,'mdia'),hdlr=child(b,mdia,'hdlr'),handler=b.toString('ascii',hdlr.start+8,hdlr.start+12);assert.notEqual(handler,'soun','silent');if(handler!=='vide')continue;videos++;
      const tkhd=child(b,track,'tkhd');assert.equal(b.readUInt32BE(tkhd.end-8)/65536,asset.width);assert.equal(b.readUInt32BE(tkhd.end-4)/65536,asset.height);
      const mdhd=child(b,mdia,'mdhd');assert.equal(b[mdhd.start],0,'supported media header');const scale=b.readUInt32BE(mdhd.start+12),duration=b.readUInt32BE(mdhd.start+16)/scale;assert.equal(duration,asset.duration_seconds);
      const stbl=child(b,child(b,mdia,'minf'),'stbl'),stsd=child(b,stbl,'stsd'),stts=child(b,stbl,'stts');assert.equal(b.toString('ascii',stsd.start+12,stsd.start+16),'avc1');let samples=0;for(let i=0;i<b.readUInt32BE(stts.start+4);i++)samples+=b.readUInt32BE(stts.start+8+i*8);const [numerator,denominator=1]=String(asset.fps).split('/').map(Number);const fps=numerator/denominator;assert(Number.isFinite(fps)&&fps>0,`${asset.file}: valid manifest fps`);assert(Math.abs(samples/duration-fps)<0.001,`${asset.file}: frame rate`);
    }assert.equal(videos,1);
  }
  console.log(`PASS ${asset.file}: bytes, SHA256${asset.kind==='video'?`, H.264, dimensions, ${asset.duration_seconds}s/${asset.fps}fps, silent, faststart`:''}`);
}
console.log(`PASS ${manifest.assets.length} declared assets; no incomplete moving scenes`);
