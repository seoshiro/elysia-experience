import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(`${dir}/${e.name}`):[`${dir}/${e.name}`]);}
const assets=files('dist').sort().map(file=>({file:file.slice(5),bytes:statSync(file).size,sha256:createHash('sha256').update(readFileSync(file)).digest('hex')}));
const fingerprint=createHash('sha256').update(assets.map(a=>`${a.file}:${a.sha256}`).join('\n')).digest('hex');
const report={builtAt:statSync('dist/index.html').mtime.toISOString(),fingerprint,assets};mkdirSync('review',{recursive:true});writeFileSync('review/build-manifest.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({builtAt:report.builtAt,fingerprint,files:assets.length},null,2));
