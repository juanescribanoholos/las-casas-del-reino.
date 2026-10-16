// Triple convivencia en un origen de GitHub Pages: V1.2, V1.3 y V1.4.
import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
const versions=[
 {name:'v12',url:'/',key:'casas_reino_v02_vigia',vigia:'Doce del Reino'},
 {name:'v13',url:'/beta-v1-3/',key:'casas_reino_v13_beta_github',vigia:'Trece del Reino'},
 {name:'v14',url:'/beta-v1-4/',key:'casas_reino_v14_beta_github',vigia:'Catorce del Reino'}
];
for(const [browserName,engine] of [['chrome-android',chromium],['webkit-iphone',webkit]]){
 const browser=await engine.launch({headless:true});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const home='http://127.0.0.1:4175';
 const cleanCinema=async()=>{const c=page.locator('#cinema-dismiss');if(await c.count())await c.click()};
 try{
  const saves=new Map();
  for(const v of versions){
   await page.goto(home+v.url,{waitUntil:'domcontentloaded',timeout:50000});
   await page.locator('.hero-home').waitFor({timeout:90000});
   await page.locator('[data-action="new"]').click();
   await page.locator('#vigia-name').fill(v.vigia);
   await page.locator('#name-form button[type="submit"]').click();
   await page.locator('.narrative').waitFor();
   await cleanCinema();
   await page.locator('[data-choice]:not([disabled])').first().click();
   await cleanCinema();
   const current=await page.evaluate(k=>localStorage.getItem(k),v.key);
   assert.equal(JSON.parse(current).name,v.vigia);
   saves.set(v.key,current);
   for(const past of versions.filter(x=>saves.has(x.key)&&x.key!==v.key)){
    assert.equal(await page.evaluate(k=>localStorage.getItem(k),past.key),saves.get(past.key),'La edición '+v.name+' modificó a '+past.name);
   }
  }
  // La nueva escena se visualiza y guarda en V1.4, sin interferir con el resto.
  await page.evaluate(key=>{
    const s=JSON.parse(localStorage.getItem(key));
    s.scene='v19_vigilia';s.finished=false;
    localStorage.setItem(key,JSON.stringify(s));
  },versions[2].key);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.hero-home').waitFor({timeout:90000});
  await page.locator('[data-action="continue"]').click();
  await page.locator('.narrative').waitFor();
  await cleanCinema();
  await page.locator('.vigilia-ribbon').waitFor();
  assert.equal(await page.locator('.vigilia-fire').count(),5);
  const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,window:innerWidth}));
  assert.ok(overflow.scroll<=overflow.window+12,'Desbordamiento horizontal en la Vigilia');
  await page.locator('[data-choice]:not([disabled])').first().click();
  await cleanCinema();
  assert.equal(JSON.parse(await page.evaluate(k=>localStorage.getItem(k),versions[2].key)).scene,'v19_muralla');
  await page.locator('[data-choice]:not([disabled])').first().click();
  await cleanCinema();
  assert.equal(JSON.parse(await page.evaluate(k=>localStorage.getItem(k),versions[2].key)).scene,'v19_alba');
  await page.locator('[data-choice]:not([disabled])').first().click();
  await cleanCinema();
  assert.equal(JSON.parse(await page.evaluate(k=>localStorage.getItem(k),versions[2].key)).scene,'y22');
  for(const past of versions.slice(0,2)){
   assert.equal(await page.evaluate(k=>localStorage.getItem(k),past.key),saves.get(past.key),'La Vigilia V1.4 modificó el guardado '+past.name);
  }
  assert.deepEqual(errors,[]);
  console.log('PASS GITHUB PAGES '+browserName+': 3 ediciones, 3 guardados independientes, 5 brasas y ruta V1.4 hasta y22.');
 }finally{await browser.close()}
}
