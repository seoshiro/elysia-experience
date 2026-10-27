import test from 'node:test';
import assert from 'node:assert/strict';
import { motionAllowed, shouldPlay, observeDocumentVisibility } from '../src/media-policy.mjs';
test('reduced-motion opts out before a media source is attached',()=>{assert.equal(motionAllowed('auto',true),false);assert.equal(motionAllowed('auto',false),true);});
test('explicit pause survives viewport re-entry and visibility changes',()=>{const enabled=motionAllowed('pause',false);for(const visible of [false,true])for(const documentVisible of [false,true])assert.equal(shouldPlay({enabled,visible,documentVisible,failed:false}),false);});
test('only visible, healthy scenes in a foreground document play',()=>{const state={enabled:true,visible:true,documentVisible:true,failed:false};assert.equal(shouldPlay(state),true);for(const key of ['enabled','visible','documentVisible'])assert.equal(shouldPlay({...state,[key]:false}),false);assert.equal(shouldPlay({...state,failed:true}),false);});
test('a deliberate play choice can opt into motion',()=>{assert.equal(motionAllowed('play',true),true);});
test('visibility subscription reports background and foreground and cleans up',()=>{const doc=new EventTarget();doc.hidden=false;const states=[];const stop=observeDocumentVisibility(doc,v=>states.push(v));doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));stop();doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));assert.deepEqual(states,[true,false,true]);});
