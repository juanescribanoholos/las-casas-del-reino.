/* Playwright QA: navegador Chrome real, sin publicar ni tocar main.
   Ejecución: npm i --no-save playwright && node beta-v1-4/qa-chrome.cjs
   Requiere servidor en http://127.0.0.1:8765 */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const KEY = 'casas_reino_v14_beta_github';
const URL = 'http://127.0.0.1:8765/beta-v1-4/';
const SAVE_DIR = 'qa-artifacts';
fs.mkdirSync(SAVE_DIR, { recursive: true });
const results = [];
const errors = [];
function check(name,condition,details=''){
  results.push({name,pass:!!condition,details});
  if(!condition)throw new Error('FAIL '+name+': '+details);
}
async function boot(page){
  page.on('pageerror',e=>errors.push({type:'pageerror',message:String(e)}));
  page.on('console',m=>{if(m.type()==='error')errors.push({type:'console',message:m.text()})});
  await page.goto(URL,{waitUntil:'domcontentloaded',timeout:90000});
  await page.locator('.hero-home').waitFor({timeout:90000});
}
async function begin(page){
  await page.locator('.hero-home [data-action="new"]').first().click();
  await page.locator('#vigia-name').fill('Aldren QA');
  await page.locator('#name-form button[type="submit"]').click();
  await page.locator('.scene-title').waitFor();
}
async function snapshot(page){
 return page.evaluate((key)=>JSON.parse(localStorage.getItem(key)||'null'),KEY);
}
async function advance(page,max,stopAtDragon=false){
 let total=0,seen=[],stalled=null,overlays=0,dragons=0;
 while(total<max){
  const batch=await page.evaluate(({count,key,stop})=>{
    const seen=[],bad=[];
    for(let i=0;i<count;i++){
      const save=JSON.parse(localStorage.getItem(key)||'null');
      if(!save){bad.push('No save');break}
      if(save.scene==='ending'||save.scene==='gameover')break;
      if(stop&&save.scene==='dr20_umbral')break;
      const current=document.querySelector('.scene-title');
      if(!current){bad.push('No scene title in '+save.scene);break}
      const available=[...document.querySelectorAll('.choice')].filter(x=>!x.disabled);
      if(!available.length){bad.push('No choices in '+save.scene);break}
      seen.push(save.scene);
      available[0].click();
    }
    return {seen,bad,scene:JSON.parse(localStorage.getItem(key)||'null')?.scene,overlay:document.querySelector('.card-modal:not(.hidden)')?1:0};
  },{count:Math.min(15,max-total),key:KEY,stop:stopAtDragon});
  total+=batch.seen.length;
  seen.push(...batch.seen);
  if(batch.overlay)overlays++;
  if(batch.bad.length){stalled=batch.bad.join('; ');break}
  if(batch.seen.length===0)break;
 }
 dragons=seen.filter(x=>x.startsWith('dr20_')).length;
 return {total,seen,stalled,overlays,dragons,save:await snapshot(page)};
}
async function run(){
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:1365,height:850},reducedMotion:'reduce'});
  const page=await context.newPage();
  await boot(page);
  check('Inicio visible',await page.locator('.hero-home').isVisible());
  await begin(page);
  check('Nombre editable', (await snapshot(page)).name==='Aldren QA');
  const pre=await advance(page,320,true);
  check('Ruta completa hasta Dragón',pre.save?.scene==='dr20_umbral',JSON.stringify({n:pre.total,last:pre.save?.scene,error:pre.stalled}));
  check('Sin bloqueos previos',!pre.stalled,String(pre.stalled));
  const preChoices=pre.total;
  const dragonSave=JSON.stringify(pre.save);
  check('Dragon cargado en interfaz',await page.locator('.scene-title').innerText()==='CUANDO EL CIELO SE PARTIÓ');
  check('Panel cinematográfico visible',await page.locator('.dragon20-boss').isVisible());
  check('Tres rutas disponibles',await page.locator('.choice:not([disabled])').count()===3);
  await page.locator('[data-panel="journal"]').first().click();
  check('Diario muestra memoria',await page.locator('#modal').innerText().then(t=>t.includes('MEMORIA DEL CAMINO')));
  await page.locator('#modal .close').click();
  check('Diario se cierra',await page.locator('#modal').evaluate(el=>el.classList.contains('hidden')));

  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.hero-home').waitFor();
  await page.locator('[data-action="continue"]').first().click();
  check('Guardado al recargar', (await snapshot(page)).scene==='dr20_umbral' && (await snapshot(page)).name==='Aldren QA');

  const post=await advance(page,220,false);
  check('Final completo alcanzado',post.save?.scene==='ending',JSON.stringify({n:post.total,last:post.save?.scene,error:post.stalled}));
  check('Sin bloqueos posteriores',!post.stalled,String(post.stalled));
  check('Pantalla epílogo visible',await page.locator('.epilogue-outro').isVisible());
  check('Cronología del Dragón jugada',post.dragons>=5,String(post.dragons));
  await page.screenshot({path:SAVE_DIR+'/victoria-desktop.png',fullPage:true});
  results.push({name:'Recorrido real Chrome',pass:true,details:JSON.stringify({decisions:preChoices+post.total,pre:pre.total,post:post.total,dragon:post.dragons})});

  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  await mobile.addInitScript(({key,save})=>localStorage.setItem(key,save),{key:KEY,save:dragonSave});
  const phone=await mobile.newPage();
  await boot(phone);
  await phone.locator('[data-action="continue"]').first().click();
  check('Móvil: escena de Dragón visible',await phone.locator('.dragon20-boss').isVisible());
  const dimensions=await phone.evaluate(()=>({w:window.innerWidth,scrollW:document.documentElement.scrollWidth}));
  check('Móvil: sin desbordamiento horizontal',dimensions.scrollW<=dimensions.w+8,JSON.stringify(dimensions));
  check('Móvil: decisiones alcanzables',await phone.locator('.choice:not([disabled])').count()===3);
  await phone.screenshot({path:SAVE_DIR+'/dragon-movil.png',fullPage:true});

  const dark=await browser.newContext({viewport:{width:1365,height:850},reducedMotion:'reduce'});
  const seeded=JSON.parse(dragonSave);
  seeded.flags.reconDragonGuerra=true;seeded.flags.v19AlbaOrdenUnica=true;seeded.alarm=3;
  await dark.addInitScript(({key,save})=>localStorage.setItem(key,save),{key:KEY,save:JSON.stringify(seeded)});
  const bad=await dark.newPage();await boot(bad);
  await bad.locator('[data-action="continue"]').first().click();
  const choices=[2,1,1,1],names=[];
  for(const idx of choices){
    names.push((await snapshot(bad)).scene);
    const button=bad.locator('.choice[data-choice="'+idx+'"]');
    check('Decisión oscura disponible '+idx+' '+names.at(-1),await button.isEnabled());
    await button.click();
  }
  check('Game Over real activado',(await snapshot(bad)).scene==='gameover');
  check('Pantalla Reino destruido',await bad.locator('.doom-outro').isVisible());
  await bad.screenshot({path:SAVE_DIR+'/derrota-dragon.png',fullPage:true});
  await bad.locator('[data-action="doom-retry"]').click();
  check('Reintento vuelve al colapso',(await snapshot(bad)).scene==='dr20_colapso');
  const rect=bad.locator('.choice[data-choice="0"]');await rect.click();
  check('Rectificación evita Game Over',(await snapshot(bad)).scene==='dr20_pulso');
  const report={date:new Date().toISOString(),results,errors,paths:{victory:preChoices+post.total,dragon:post.dragons,nightmare:names},note:'Chrome real en GitHub Actions; viewport móvil emulado, NO Safari/iPhone real'};
  fs.writeFileSync(SAVE_DIR+'/report.json',JSON.stringify(report,null,2));
  console.log('DRAGON QA REPORT '+JSON.stringify(report));
  if(errors.length)console.warn('Browser errors '+JSON.stringify(errors.slice(0,12)));
  check('Sin excepciones no capturadas',errors.filter(e=>e.type==='pageerror').length===0,JSON.stringify(errors));
  await context.close();await mobile.close();await dark.close();
 } finally{await browser.close()}
}
run().catch(err=>{console.error('DRAGON QA FAILED:',err.stack||String(err));process.exitCode=1});
