// Testa las dos versiones alojadas en el mismo origen, con rutas diferentes.
// Se ejecuta con staging-pages/ checkout de la rama de publicación de Pages.
import assert from 'node:assert/strict';
import {chromium,webkit} from 'playwright';
const OLD='casas_reino_v02_vigia',BETA='casas_reino_v13_beta_github';
for(const [label,engine] of [['android-chromium',chromium],['iphone-webkit',webkit]]){
  const browser=await engine.launch({headless:true});
  const context=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const dismiss=async()=>{const b=page.locator('#cinema-dismiss');if(await b.count())await b.click()};
  try{
    const home='http://127.0.0.1:4174/';
    await page.goto(home,{waitUntil:'domcontentloaded',timeout:45000});
    await page.locator('.hero-home').waitFor({timeout:90000});
    await page.locator('[data-action="new"]').click();
    await page.locator('#vigia-name').fill('Vigía Versión Doce');
    await page.locator('#name-form button[type="submit"]').click();
    await page.locator('.narrative').waitFor();
    await dismiss();
    const old=await page.evaluate(k=>localStorage.getItem(k),OLD);
    assert.equal(JSON.parse(old).name,'Vigía Versión Doce');
    await page.goto(home+'beta-v1-3/',{waitUntil:'domcontentloaded',timeout:45000});
    await page.locator('.hero-home').waitFor({timeout:90000});
    assert.equal(await page.evaluate(k=>localStorage.getItem(k),BETA),null,'V1.3 leyó una partida previa de la V1.2');
    await page.locator('[data-action="new"]').click();
    await page.locator('#vigia-name').fill('Aína del Reino V13');
    await page.locator('#name-form button[type="submit"]').click();
    await page.locator('.narrative').waitFor();
    await dismiss();
    const beta=await page.evaluate(k=>localStorage.getItem(k),BETA);
    assert.equal(JSON.parse(beta).name,'Aína del Reino V13');
    assert.equal(await page.evaluate(k=>localStorage.getItem(k),OLD),old,'V1.3 alteró el progreso V1.2');
    await page.locator('[data-choice]:not([disabled])').first().click();
    await dismiss();
    const afterDecision=await page.evaluate(k=>localStorage.getItem(k),BETA);
    assert.ok(JSON.parse(afterDecision).history.length>=1,'La decisión beta no se guardó');
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('.hero-home').waitFor({timeout:90000});
    await page.locator('[data-action="continue"]').click();
    await page.locator('.narrative').waitFor();
    await dismiss();
    assert.equal(await page.evaluate(k=>localStorage.getItem(k),OLD),old,'El progreso V1.2 cambió al reabrir beta');
    await page.goto(home,{waitUntil:'domcontentloaded',timeout:45000});
    await page.locator('.hero-home').waitFor({timeout:90000});
    await page.locator('[data-action="continue"]').click();
    await page.locator('.narrative').waitFor();
    assert.equal(await page.evaluate(k=>localStorage.getItem(k),BETA),afterDecision,'V1.2 alteró el progreso beta');
    assert.equal(JSON.parse(await page.evaluate(k=>localStorage.getItem(k),OLD)).name,'Vigía Versión Doce');
    assert.deepEqual(errors,[],'Errores Javascript en ambas ediciones');
    console.log('PASS PAGES '+label+': ambas ediciones funcionan en un origen, guardados independientes, progreso y reanudación.');
  }catch(e){throw Error(label+': '+e.message+'; '+errors.join('|'))}
  finally{await browser.close()}
}
