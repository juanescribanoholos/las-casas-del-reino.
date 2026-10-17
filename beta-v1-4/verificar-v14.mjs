// Comprobación local y sin dependencias: node beta-v1-4/verificar-v14.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const folder=dirname(fileURLToPath(import.meta.url));
const loader=readFileSync(join(folder,'index.html'),'utf8');
assert.match(loader,/total=16/,'El cargador debe conservar sus 16 fragmentos');
assert.match(loader,/identidad-casas\.css/,'Falta la hoja visual');
assert.ok(existsSync(join(folder,'identidad-casas.css')),'Falta identidad-casas.css');
const parts=Array.from({length:16},(_,i)=>{
  const path=join(folder,'parts',String(i).padStart(3,'0')+'.txt');
  assert.ok(existsSync(path),'Falta el fragmento '+i);
  return readFileSync(path,'utf8');
});
const html=parts.join('');
assert.match(html,/^<!doctype html>/i,'El documento no empieza con HTML');
assert.match(html,/<\/html>\s*$/i,'El HTML está incompleto');
const first=html.indexOf('<script>'),last=html.lastIndexOf('</script>');
assert.ok(first>=0&&last>first,'Falta el script principal');
const js=html.slice(first+8,last);
new Script(js,{filename:'las-casas-del-reino-v14.js'}); // Compila, no ejecuta.
const scenes=[...js.matchAll(/(?:^|\n)\s*([a-zA-Z][\w]*):\s*\{\s*phase\s*:/g)].map(m=>m[1]);
const unique=new Set(scenes);
const declared=Number(js.match(/const TOTAL_SCENES\s*=\s*(\d+)/)?.[1]);
assert.ok(declared>0,'No se localizó TOTAL_SCENES');
assert.equal(scenes.length,declared,'El total de escenas no coincide');
assert.equal(unique.size,scenes.length,'Hay escenas duplicadas');
const next=[...js.matchAll(/\bnext:\s*['"]([^'"]+)['"]/g)].map(m=>m[1]);
const unknown=[...new Set(next.filter(k=>!unique.has(k)&&!['ending','gameover'].includes(k)))];
assert.deepEqual(unknown,[],'Existen decisiones con destino inexistente');
assert.match(js,/function v14ChronicleMarkup\(/,'Falta la memoria del Vigía');
assert.match(js,/\$\{v14ChronicleMarkup\(\)\}/,'El Diario no muestra la memoria');
assert.match(loader,/atlasSpoiler/,'Comprobar el parche compatible del Atlas');
assert.ok(html.includes('<p>${esc(ATLAS[key].desc)}</p>'),'El Atlas no coincide con el cargador');
console.log('V1.4 OK:',parts.length,'fragmentos;',scenes.length,'escenas;',next.length,'enlaces; sintaxis válida.');
console.log('Aviso: esta prueba NO equivale a validar partidas o dispositivos reales.');
