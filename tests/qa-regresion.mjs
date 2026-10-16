// Sin dependencias: node tests/qa-regresion.mjs
// Motor narrativo, no prueba visual en móvil.
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const a=readFileSync(new URL('../parts/003.txt',import.meta.url),'utf8');
const b=readFileSync(new URL('../parts/004.txt',import.meta.url),'utf8');
assert.ok(a.includes('<script>')&&b.includes('const MUSICA_ORIGINAL'));
const code=(a.slice(a.indexOf('<script>')+8)+b.slice(0,b.indexOf('const MUSICA_ORIGINAL')))
.trimStart().replace("'use strict';","'use strict';const sound={enabled:false,tick:()=>{},change:()=>{},mood:()=>'',sync:()=>{}};");
const store=new Map();
const storage={getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v))};
const test=String.raw`
render=function(){};
const scenesList=Object.keys(scenes),missing=[];
for(const [id,scene] of Object.entries(scenes)){
 for(const choice of scene.choices)if(choice.next!=='ending'&&choice.next!=='gameover'&&!scenes[choice.next])missing.push(id+'>'+choice.next);
 scene.text(fresh('Prueba'));
}
const rng=v=>{let n=v>>>0;return ()=>((n=(n*1664525+1013904223)>>>0)/4294967296)};
const regions=['calcaneo','quinto','hallux','diafragma','mandibula'];
function run(n,guided){
 const rand=rng(1007+n*7919),visited=[],doneHouses=new Set(),errors=[];
 state=fresh('Vigía de Prueba');view='game';
 let steps=0;
 for(;steps<350&&state.scene!=='ending';steps++){
  const sc=scenes[state.scene];if(!sc){errors.push('Missing '+state.scene);break}
  visited.push(state.scene);
  try{sc.text(state)}catch(e){errors.push(String(e))}
  if(guided&&regions.includes(sc.art)&&v12Unlocked(sc.art)&&!doneHouses.has(sc.art)){
   const land=sc.art;doneHouses.add(land);
   try{
    V12_LANDS[land].rooms.forEach((x,i)=>v12Investigate(land,i,0));
    if(land==='calcaneo')v13SolveCalcaneo(1);
    if(land==='quinto'){v13QuintoSolve(1);v14Triangular(1);const half=v12Quest('quinto').triangulacion;if(half?.fuente!==1||half?.resultado)throw Error('Triangulación fase 1 fallida');v14Triangular(0);if(!v12Quest('quinto').triangulacion?.resultado)throw Error('Triangulación incompleta')}
    if(land==='hallux')v13HalluxSolve(1);
    if(land==='diafragma'){v13DiafragmaSolve(1);v13DosLuces(0);v13DosLuces(1)}
    if(land==='mandibula')v13MandibulaSolve(1);
    v12Finish(land,0);
   }catch(e){errors.push('Quest '+land+': '+String(e))}
  }
  if(guided)try{
    for(const [land,names,allowed,action] of [
      ['calcaneo',['ordan','garra'],v13CanTalkCalcaneo,v13CalcaneoTalk],
      ['quinto',['nyra','rusk'],v13QuintoTalkAllowed,v13QuintoTalk],
      ['hallux',['filo','senda'],v13HalluxTalkAllowed,v13HalluxTalk],
      ['diafragma',['maera','aliento'],v13DiafragmaTalkAllowed,v13DiafragmaTalk],
      ['mandibula',['lysa','kael'],v13MandibulaTalkAllowed,v13MandibulaTalk]
    ])if(doneHouses.has(land)){
      const q=v12Quest(land);for(const who of names)if(!q.dialogues?.[who]&&allowed(who,q))action(who,0);
    }
  }catch(e){errors.push('Talk '+state.scene+': '+String(e))}
  const choices=sc.choices.map((c,i)=>({c,i})).filter(x=>(!x.c.required||x.c.required(state))&&x.c.next!=='gameover');
  if(!choices.length){errors.push('No choice '+state.scene);break}
  let selected=choices[Math.floor(rand()*choices.length)].i;
  if(guided){
    const scored=choices.map(({c,i})=>{
      const clone=JSON.parse(JSON.stringify(state));if(c.effect)c.effect(clone);
      const bond=['quintoBond','halluxBond','alientoBond','kaelBond','holosBond','menosBond'].reduce((s,k)=>s+clone[k]-state[k],0);
      return {i,score:4*(clone.trust-state.trust)-4*(clone.alarm-state.alarm)+1.4*bond+1.7*(clone.clues.length-state.clues.length)+(/escuchar|observ|contrasta|comprobar|proteger|relevo|cooper|informe|registro|revisar|medid|salida/i.test(c.label)?0.8:0)};
    }).sort((x,y)=>y.score-x.score);
    selected=scored[0].i;
  }
  try{choose(selected)}catch(e){errors.push('Choice '+state.scene+': '+String(e));break}
  if(guided&&steps%17===0){
    const backup=saved();if(!backup||backup.name!==state.name||backup.scene!==state.scene)errors.push('Save mismatch');
    if(backup)state=backup;
  }
 }
 const quests={};if(guided)for(const land of regions){
  const q=v12Quest(land);quests[land]={rooms:Object.keys(q.rooms).length,enigma:!!q.enigma,dialogs:Object.keys(q.dialogues||{}).length,complete:!!q.complete,triangulation:land==='quinto'?q.triangulacion?.resultado:null};
 }
 return {finished:state.scene==='ending',code:state.scene==='ending'?epilogueResult().code:null,steps,visited,errors,quests};
}
state=fresh('Gate');state.scene='c9';state.visited=['p4'];const earlyHallux=v12Unlocked('hallux');
state.scene='d10';state.visited.push('bridge_d');const earlyMandibula=v12Unlocked('mandibula');
state.scene='bridge_m';const arrivedMandibula=v12Unlocked('mandibula');
state=fresh('Old');state.scene='c9';state.exploreV12.hallux={rooms:{plataforma:{option:0,reply:'ok'}}};const oldProgress=v12Unlocked('hallux');
const main=run(0,true),endings=new Set(),reached=new Set(main.visited);let complete=0;const failures=[];
for(let i=0;i<250;i++){
 const runResult=run(i,false);if(runResult.finished)complete++;if(runResult.code)endings.add(runResult.code);
 for(const id of runResult.visited)reached.add(id);
 if(runResult.errors.length)failures.push({i,errors:runResult.errors});
}
const doomRoutes={};
for(const [kind,scene] of [['red','v15_crisis_roja'],['pact','v15_crisis_pacto'],['dragon','v15_crisis_dragon']]){
 state=fresh('Vigía de Prueba');state.scene=scene;state.alarm=3;
 state.flags[V15_RISKS[kind][0]]=true;
 const guarded=!v15Critical(state,kind);
 const previous=state.scene,prevHist=state.history.length;
 choose(2);
 const singleSafe=state.scene===previous&&state.history.length===prevHist;
 state.flags[V15_RISKS[kind][1]]=true;
 const armed=v15Critical(state,kind);choose(2);
 const lost=state.scene==='gameover'&&state.finished===true&&view==='doom'&&state.doomKind===kind;
 const savedDoom=saved(),persisted=savedDoom?.scene==='gameover'&&savedDoom?.doomKind===kind;
 const cp=savedDoom?.doomCheckpoint?.scene;
 v15RegisterDoom(kind);
 v15DoomRetry();
 const retried=state.scene===scene&&!state.finished&&view==='game'&&!state.doomKind
  &&state.history.length===prevHist&&saved()?.scene===scene;
 doomRoutes[kind]={guarded,singleSafe,armed,lost,persisted,cp,retried};
}
const doomGalleryCount=Object.keys(v15DoomGallery()).filter(k=>V15_DOOM_OUTCOMES[k]).length;

const v16Checks={};
const v16SceneNames={ordan:'y5c',rusk:'y9c',taren:'y12c',maera:'y15c',lysa:'y18c'};
for(const [id,sc] of Object.entries(v16SceneNames)){
 state=fresh('Vigía de Prueba');state.scene=sc;
 const noWound=!v16HasScar(state,id)&&!scenes[sc].choices[0].required(state);
 // A negative earlier choice creates a present damage; repairing costs a brigade.
 state.flags[V16_SCARS[id].flags[0]]=true;
 const wound=v16ScarOpen(state,id)&&scenes[sc].choices[0].required(state);
 const before=v16Crews(state);
 const trust=state.trust;choose(0);
 const repaired=!v16ScarOpen(state,id),after=v16Crews(state),restored=saved();
 const durable=!!restored?.flags?.[V16_SCARS[id].repair]&&restored.scene===scenes[sc].choices[0].next;
 const endingVisible=v16EndingMarkup(state).includes(V16_SCARS[id].person);
 // A different decision must leave the wound pending.
 state=fresh('Vigía de Prueba');state.scene=sc;state.flags[V16_SCARS[id].flags[0]]=true;
 choose(1);const deferred=v16ScarOpen(state,id)&&v16Crews(state)===3;
 // Denial itself causes consequences, even when there was no previous scar.
 state=fresh('Vigía de Prueba');state.scene=sc;choose(2);
 const denied=v16HasScar(state,id)&&v16ScarOpen(state,id)&&state.alarm===1;
 v16Checks[id]={noWound,wound,repaired,cost:before-after,durable,endingVisible,deferred,denied,trustIncrease:trust<0||repaired};
}
state=fresh('Cinco heridas');
for(const id of Object.keys(V16_SCARS))state.flags[V16_SCARS[id].flags[0]]=true;
const firstTotal=v16Crews(state),assigned=[];
for(const id of Object.keys(V16_SCARS))if(v16Repair(state,id))assigned.push(id);
const finiteSupply={initial:firstTotal,used:assigned.length,remaining:v16Crews(state),unresolved:v16Pending(state).length};
state=fresh('Cuarta brigada');state.flags.v14HermandadPacto=true;
for(const id of Object.keys(V16_SCARS))state.flags[V16_SCARS[id].flags[0]]=true;
v16Reconcile(state);
const bonusSupply={total:v16CrewTotal(state),repaired:v16Status(state).restored.length,stillOpen:v16Pending(state).length};
const ledgerVisible=v16LedgerMarkup(state).includes('El precio de sobrevivir');
const migrations={};for(let v=2;v<=8;v++){
 const old=fresh('Legacy');old.version=v;old.scene='ending';localStorage.setItem(SAVE_KEY,JSON.stringify(old));
 const back=saved();migrations[v]=back?.version===9&&back.scene!=='ending';
}
globalThis.__qa={count:scenesList.length,missing,main,complete,endings:[...endings],reached:reached.size,failures,
 earlyHallux,earlyMandibula,arrivedMandibula,oldProgress,migrations,doomRoutes,doomGalleryCount,v16Checks,finiteSupply,bonusSupply,ledgerVisible};
`;
const context={localStorage:storage,window:{scrollTo:()=>{}},document:{},console};
runInNewContext(code+test+'\n})();',context,{timeout:45000});
const q=context.__qa;
assert.equal(q.count,239);
assert.equal(q.missing.length,0);
assert.equal(q.main.finished,true);
assert.equal(q.main.errors.length,0);
assert.equal(q.complete,250);
assert.equal(q.failures.length,0);
assert.equal(q.endings.length,12);
assert.equal(q.reached,239);
assert.equal(q.earlyHallux,false);
assert.equal(q.earlyMandibula,false);
assert.equal(q.arrivedMandibula,true);
assert.equal(q.oldProgress,true);
assert.ok(Object.values(q.migrations).every(Boolean));
for(const r of Object.values(q.main.quests)){
 assert.equal(r.rooms,3);assert.equal(r.enigma,true);assert.equal(r.dialogs,2);assert.equal(r.complete,true);
}
assert.equal(q.main.quests.quinto.triangulation,'contrastado');
assert.equal(q.doomGalleryCount,3);
for(const c of Object.values(q.v16Checks))assert.ok(c.noWound&&c.wound&&c.repaired&&c.cost===1&&c.durable&&c.endingVisible&&c.deferred&&c.denied);
assert.deepEqual(JSON.parse(JSON.stringify(q.finiteSupply)),{initial:3,used:3,remaining:0,unresolved:2});
assert.deepEqual(JSON.parse(JSON.stringify(q.bonusSupply)),{total:4,repaired:4,stillOpen:1});
assert.equal(q.ledgerVisible,true);
for(const result of Object.values(q.doomRoutes))assert.ok(result.guarded&&result.singleSafe&&result.armed&&result.lost&&result.persisted&&result.retried&&result.cp);
console.log('PASS: 239 escenas, 250 rutas completas, 12 finales originales, 3 gameovers y 5 heridas con reparación limitada.');
console.log('Partida guiada: '+q.main.steps+' escenas. Pendientes: UI, audio y pruebas reales Android/iOS.');
