// Comprobar enlaces externos desde un navegador real emulado, no solo con curl.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const base='juanescribanoholos/las-casas-del-reino.';
const urls=[
 ['jsdelivr','https://cdn.jsdelivr.net/gh/'+base+'@desarrollo-v1-3-lanzamiento/index.html'],
 ['githack','https://raw.githack.com/'+base+'/desarrollo-v1-3-lanzamiento/index.html']
];
const browser=await chromium.launch({headless:true});
for(const [name,url]of urls){
 const context=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true,ignoreHTTPSErrors:false});
 const page=await context.newPage();
 const errors=[],failedRequests=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('requestfailed',r=>failedRequests.push(r.url()+': '+r.failure()?.errorText));
 try{
  const r=await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  let pageTitle=await page.title();
  let snippet=(await page.locator('body').innerText()).slice(0,260);
  if(name==='githack'&&!(await page.locator('.hero-home').count())){
    for(const sel of ['a:has-text("Continue")','button:has-text("Continue")','a:has-text("Open")']){
      const btn=page.locator(sel).first();
      if(await btn.count()){await btn.click();break;}
    }
  }
  await page.locator('.hero-home').waitFor({timeout:40000});
  await page.locator('[data-action="new"]').click();
  await page.locator('#vigia-name').fill('Beta V13');
  await page.locator('#name-form button[type="submit"]').click();
  await page.locator('.narrative').waitFor({timeout:20000});
  const save=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
  assert.equal(save?.name,'Beta V13');
  const evidence={name,pass:true,http:r?.status(),title:pageTitle,navigation:page.url(),save:save.scene,errors,failedRequests:failedRequests.slice(0,3)};
  console.log('RESULT BETA '+JSON.stringify(evidence));
 }catch(e){
  console.log('RESULT BETA '+JSON.stringify({name,pass:false,url:page.url(),status:(await page.locator('body').innerText().catch(()=>'' )).slice(0,280),error:e.message.slice(0,450),errors,failedRequests:failedRequests.slice(0,5)}));
 }finally{await context.close();}
}
await browser.close();
