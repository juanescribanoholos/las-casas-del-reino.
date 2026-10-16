// Una partida real de principio a fin con clics de Chromium móvil emulado.
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

await mkdir('test-results',{recursive:true});
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:393,height:852},isMobile:true,hasTouch:true,deviceScaleFactor:2});
const page=await context.newPage();
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'domcontentloaded',timeout:60000});
  await page.locator('.hero-home').waitFor({timeout:90000});
  await page.locator('[data-action="new"]').click();
  await page.locator('#vigia-name').fill('Vigía del Norte');
  await page.locator('#name-form button[type="submit"]').click();
  await page.locator('.narrative').waitFor();
  const ids=new Set(), checkpoints=['c1','q1','h1','d1','m1','x1','y1'];
  let steps=0, last=null;
  while(steps<330){
    const s=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
    assert.ok(s,'No hay partida en localStorage');
    assert.equal(s.name,'Vigía del Norte','Se ha perdido el nombre');
    if(s.scene==='ending')break;
    assert.notEqual(s.scene,'gameover','Final oscuro inesperado en ruta prudente');
    assert.notEqual(s.scene,last,'Se repitió la escena '+s.scene);
    last=s.scene;
    ids.add(s.scene);
    if(checkpoints.includes(s.scene)){
      await page.screenshot({path:'test-results/full-'+s.scene+'.png',fullPage:true,animations:'disabled'});
    }
    const curtain=page.locator('#cinema-dismiss');
    if(await curtain.count())await curtain.click();
    const narrative=page.locator('.narrative');
    assert.ok(await narrative.count(),'No hay texto visible en '+s.scene);
    const headline=await page.locator('.scene-title').textContent();
    assert.ok(headline.trim().length>2,'Título vacío en '+s.scene);
    const enabled=page.locator('[data-choice]:not([disabled])');
    assert.ok(await enabled.count(),'Ninguna decisión disponible en '+s.scene);
    if(steps%20===0){
      const width=await page.evaluate(()=>({a:document.documentElement.scrollWidth,b:innerWidth}));
      assert.ok(width.a<=width.b+12,'Desbordamiento en '+s.scene+': '+width.a+'/'+width.b);
    }
    await enabled.first().click();
    const next=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
    assert.equal(next.history.length,steps+1,'Historial inconsistente en '+s.scene);
    steps++;
  }
  const finalSave=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
  assert.equal(finalSave.scene,'ending','No se alcanzó el epílogo tras '+steps+' decisiones: '+finalSave.scene);
  assert.equal(finalSave.finished,true);
  await page.locator('[data-action="replay"]').waitFor({timeout:10000});
  await page.screenshot({path:'test-results/full-epilogo.png',fullPage:true,animations:'disabled'});
  assert.deepEqual(errors,[],'Errores JS: '+errors.join(' | '));
  console.log('PASS PARTIDA COMPLETA navegador Chrome móvil emulado: '+steps+' decisiones, '+ids.size+' escenas únicas, de prólogo a epílogo, sin bloqueo ni pérdida de nombre/guardado.');
}catch(err){
  await page.screenshot({path:'test-results/full-error.png',fullPage:true}).catch(()=>{});
  throw new Error('Partida completa fallida: '+err.stack+'; errores JS='+errors.join('|'));
}finally{
  await browser.close();
}
