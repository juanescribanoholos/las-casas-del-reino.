// Auditoría sin dependencias: node beta-v1-4/verificar-v14.mjs
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Script} from 'node:vm';
import assert from 'node:assert/strict';

const root=dirname(fileURLToPath(import.meta.url));
const loader=readFileSync(join(root,'index.html'),'utf8');
assert.match(loader,/total=16/,'El cargador debe tener 16 fragmentos');
assert.match(loader,/identidad-casas\.css/,'No se enlaza la capa visual');
assert.ok(existsSync(join(root,'identidad-casas.css')),'Falta la capa visual');
const chunks=Array.from({length:16},(_,i)=>{
 const filename=join(root,'parts',String(i).padStart(3,'0')+'.txt');
 assert.ok(existsSync(filename),'Falta fragmento '+i);
 return readFileSync(filename,'utf8');
});
const html=chunks.join('');
assert.match(html,/^<!doctype html>/i,'No empieza como documento HTML');
assert.match(html,/<\/html>\s*$/i,'Documento incompleto');
const start=html.indexOf('<script>'),end=html.lastIndexOf('</script>');
assert.ok(start>=0&&end>start,'Script incompleto');
const js=html.slice(start+8,end);
new Script(js,{filename:'las-casas-del-reino-v14.js'}); // Compila sin ejecutar.
const base=[...js.matchAll(/(?:^|\n)\s*([a-zA-Z][\w]*):\s*\{\s*phase\s*:/g)].map(m=>m[1]);
const extension=[...js.matchAll(/["'](dr20_[\w]+)["']\s*:\s*\{/g)].map(m=>m[1]);
const all=[...base,...extension];
const known=new Set(all);
const declared=Number(js.match(/const TOTAL_SCENES\s*=\s*(\d+)/)?.[1]);
assert.ok(declared>0,'Falta TOTAL_SCENES');
assert.equal(base.length,256,'Escenas originales cambiadas inesperadamente');
assert.equal(extension.length,8,'Falta alguna fase del Dragón');
assert.equal(all.length,declared,'El contador difiere del total real');
assert.equal(known.size,all.length,'Se han repetido identificadores de escena');
const destinations=[...js.matchAll(/(?:\bnext|["']next["'])\s*:\s*["']([^"']+)["']/g)].map(m=>m[1]);
const missing=[...new Set(destinations.filter(id=>!known.has(id)&&!['ending','gameover'].includes(id)))];
assert.deepEqual(missing,[],'Hay opciones con destinos desconocidos');
assert.match(js,/scenes\.v19_alba\.choices\.forEach/,'La batalla del Dragón no está enlazada');
assert.match(js,/function dragon20BossHud\(/,'Falta la interfaz del Dragón');
assert.match(js,/function dr20Critical\(/,'Falta el control de riesgo del final oscuro');
assert.match(js,/function v14ChronicleMarkup\(/,'Falta el Diario del Vigía');
assert.match(js,/v14ChronicleMarkup\(\)/,'El Diario está desconectado');
assert.match(loader,/atlasSpoiler/,'No se detecta la protección actual del Atlas');
assert.ok(html.includes('ATLAS[key].desc'),'Atlas y cargador no coinciden');
console.log('OK: '+chunks.length+' fragmentos, '+base.length+' escenas base + '+extension.length+' escenas del Dragón = '+all.length+' escenas.');
console.log('OK: '+destinations.length+' enlaces narrativos, sin destinos inexistentes; JavaScript sintácticamente válido.');
console.log('Pendiente: ejecutar las rutas en navegador y probar sonido/guardado en Android e iPhone.');
