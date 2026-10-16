// Pruebas de navegador emulado; NO sustituyen Android/iOS reales.
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium, webkit} from 'playwright';

await mkdir('test-results',{recursive:true});
const cases=[
  {name:'android-chromium',engine:chromium,opts:{viewport:{width:393,height:852},isMobile:true,hasTouch:true,deviceScaleFactor:2}},
  {name:'iphone-webkit-linux',engine:webkit,opts:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}}
];
const base='http://127.0.0.1:4173/';
for (const config of cases){
  const browser=await config.engine.launch({headless:true});
  const context=await browser.newContext({...config.opts,acceptDownloads:true});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('dialog',d=>d.accept());
  async function cinema(){
    const dismiss=page.locator('#cinema-dismiss');
    if(await dismiss.count())await dismiss.click();
  }
  async function widthOK(stage){
    const {scroll,view}=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,view:innerWidth}));
    assert.ok(scroll<=view+12,config.name+' desbordamiento '+stage+': '+scroll+' / '+view);
  }
  try{
    await page.goto(base,{waitUntil:'domcontentloaded',timeout:60000});
    await page.locator('.hero-home').waitFor({timeout:90000});
    assert.match(await page.title(),/Las Casas del Reino/i);
    await widthOK('portada');
    await page.locator('[data-action="new"]').click();
    await page.locator('#vigia-name').fill('Aína del Reino');
    await page.locator('#name-form button[type="submit"]').click();
    await page.locator('.narrative').waitFor();
    await cinema();
    let sv=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
    assert.equal(sv.name,'Aína del Reino');
    assert.equal(sv.scene,'p0');
    await widthOK('inicio de aventura');
    await page.locator('[data-choice]:not([disabled])').first().click();
    await cinema();
    sv=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
    assert.ok(sv.history.length>=1,'La elección no quedó guardada');

    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('.hero-home').waitFor({timeout:90000});
    await page.locator('[data-action="continue"]').click();
    await page.locator('.narrative').waitFor();
    await cinema();
    assert.ok((await page.locator('.narrative').innerText()).length>40);
    await page.locator('[data-action="settings"]').first().click();
    await page.locator('#backup-action').waitFor();
    const downloadPromise=page.waitForEvent('download');
    await page.locator('#backup-action').click();
    const backup=await downloadPromise;
    assert.match(backup.suggestedFilename(),/Aína_del_Reino|A_na_del_Reino|Las_Casas_del_Reino_Guardado/);
    const backupPath=await backup.path();
    await page.locator('#import-action').click();
    await page.locator('#backup-import').setInputFiles(backupPath);
    await page.locator('.narrative').waitFor();
    await cinema();
    sv=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
    assert.equal(sv.name,'Aína del Reino');

    // Llegar por decisiones humanas a la primera expedición desbloqueada.
    let canExplore=false;
    for(let i=0;i<22;i++){
      await cinema();
      const explore=page.locator('[data-v12-explore="calcaneo"]');
      if(await explore.count()){canExplore=true;break}
      const choice=page.locator('[data-choice]:not([disabled])').first();
      if(!(await choice.count()))break;
      await choice.click();
    }
    assert.ok(canExplore,'Calcáneo no llega a desbloquearse');
    await page.locator('[data-v12-explore="calcaneo"]').click();
    await page.locator('.rooms-grid').waitFor();
    assert.equal(await page.locator('[data-v12-room]').count(),3);
    await widthOK('exploración');
    await page.locator('[data-v12-room="0"]').click();
    await page.locator('[data-v12-action="0"]').click();
    await page.locator('[data-v12-return]').click();
    await page.locator('.narrative').waitFor();

    // Comprobar la pantalla de derrota en un guardado válido de prueba.
    await page.evaluate(()=>{
      const key='casas_reino_v02_vigia',s=JSON.parse(localStorage.getItem(key));
      const cp=JSON.parse(JSON.stringify(s));
      cp.scene='m10';cp.finished=false;
      delete cp.doomKind;delete cp.doomCheckpoint;
      s.scene='gameover';s.finished=true;s.doomKind='red';s.doomCheckpoint=cp;
      localStorage.setItem(key,JSON.stringify(s));
    });
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('.hero-home').waitFor({timeout:90000});
    await page.locator('[data-action="continue"]').click();
    await page.locator('.doom-outro').waitFor();
    await widthOK('Game Over');
    assert.match(await page.locator('.doom-title').innerText(),/ÚLTIMA PUERTA/);
    await page.locator('[data-action="doom-retry"]').click();
    await page.locator('.narrative').waitFor();
    await cinema();
    sv=await page.evaluate(()=>JSON.parse(localStorage.getItem('casas_reino_v02_vigia')));
    assert.equal(sv.scene,'m10','Reintento no restaura la última decisión');
    assert.equal(sv.finished,false);
    assert.ok(!sv.doomKind);

    // V1.4: prueba visual y funcional del capítulo de La Vigilia.
    await page.evaluate(()=>{
      const key='casas_reino_v02_vigia',s=JSON.parse(localStorage.getItem(key));
      s.scene='v19_vigilia';s.finished=false;
      localStorage.setItem(key,JSON.stringify(s));
    });
    await page.reload({waitUntil:'domcontentloaded'});
    await page.locator('.hero-home').waitFor({timeout:90000});
    await page.locator('[data-action="continue"]').click();
    await page.locator('.narrative').waitFor();
    await cinema();
    await page.locator('.vigilia-ribbon').waitFor();
    assert.equal(await page.locator('.vigilia-fire').count(),5,'Faltan los cinco fuegos');
    assert.equal(await page.locator('body').getAttribute('data-vigilia'),'true');
    await widthOK('vigilia');
    await page.screenshot({path:'test-results/'+config.name+'-vigilia.png',fullPage:true,animations:'disabled'});
    await page.locator('[data-choice]:not([disabled])').first().click();
    await cinema();
    assert.equal(JSON.parse(await page.evaluate(()=>localStorage.getItem('casas_reino_v02_vigia'))).scene,'v19_muralla');
    await page.locator('[data-choice]:not([disabled])').first().click();
    await cinema();
    assert.equal(JSON.parse(await page.evaluate(()=>localStorage.getItem('casas_reino_v02_vigia'))).scene,'v19_alba');
    assert.match(await page.locator('.story').innerText(),/Rusk/);
    await widthOK('alba de la Vigilia');
    await page.locator('[data-choice]:not([disabled])').first().click();
    await cinema();
    assert.equal(JSON.parse(await page.evaluate(()=>localStorage.getItem('casas_reino_v02_vigia'))).scene,'y22');
    assert.match(await page.locator('.story').innerText(),/Rusk/);

    await page.screenshot({path:'test-results/'+config.name+'.png',fullPage:true,animations:'disabled'});
    assert.deepEqual(errors,[],'Errores JS no capturados: '+errors.join('; '));
    console.log('PASS NAVEGADOR '+config.name+': portada, nombre UTF-8, progreso, cierre/reapertura, JSON, Calcáneo, Game Over, cinco fuegos, Vigilia y reintento. (Emulado)');
  }catch(err){
    await page.screenshot({path:'test-results/'+config.name+'-FALLO.png',fullPage:true}).catch(()=>{});
    throw new Error(config.name+': '+err.stack+'; JS errors='+errors.join('|'));
  }finally{
    await browser.close();
  }
}
