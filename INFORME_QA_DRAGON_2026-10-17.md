# INFORME DE PRUEBAS REALES — LAS CASAS DEL REINO V1.4: EL CIELO PARTIDO

**Fecha:** 17 de octubre de 2026. **Entorno:** Google Chrome 155 (Linux, GitHub Actions), Playwright. `main` no modificado. Rama: `desarrollo-v1-4-dragon-epico`.

**Resultado:** 27 comprobaciones automáticas superadas; 0 fallos de ejecución del juego; 2 advertencias HTTP 404 de recurso no identificado en la consola (no impidieron las pruebas).

## Prueba jugable
- Una ruta completa desde nombre del Vigía hasta epílogo: **234 decisiones**, **195 antes** de la batalla nueva y **39 después**.
- **Cinco escenas** de la nueva batalla fueron jugadas en la ruta de victoria (de las 8 posibles).
- Victoria comprobada con final visual `NINGUNA CASA GOBIERNA SOLA`.
- Derrota alternativa comprobada con las decisiones de la ruta decreto → orden extrema → colapso → destrucción; pantalla `LAS CINCO CASAS FUERON CENIZA`.
- Recuperación desde Game Over: vuelve a `dr20_colapso`; la rectificación posterior conduce a `dr20_pulso`.
- Diarios y opciones de tres rutas visibles, apertura/cierre del panel correcto.
- Guardado local, nombre y escena tras recargar verificados.
- Sonido: en Chrome, al pulsar **Música ON** durante el Dragón, la promesa `HTMLMediaElement.play()` se resolvió correctamente y el botón reflejó ON. No equivale a inspección auditiva humana ni certifica todos los dispositivos.
- Móvil **emulado** 390×844: pantalla del Dragón y opciones accesibles, sin desbordamiento horizontal (390 px). **No** se ha probado Safari/iPhone físico.
- Las introducciones cinematográficas deben cerrarse antes de avanzar. La primera automatización no lo hizo y bloqueó la prueba, **no** la partida real; corregido en la prueba.

## Evidencias
- [Ejecución QA Chrome 155, 27/27](https://github.com/juanescribanoholos/las-casas-del-reino./actions/runs/39069132908)
- [Capturas + report.json (artifacto, retención 7 días)](https://github.com/juanescribanoholos/las-casas-del-reino./actions/runs/39069132908/artifacts/12114805653)
- Capturas: `victoria-desktop.png`, `dragon-movil.png`, `derrota-dragon.png`.
- Script repetible: `beta-v1-4/qa-chrome.cjs` y flujo `.github/workflows/qa-dragon-v14.yml`.

## Puntos a mejorar antes de publicar
1. **Ritmo y densidad:** 234 elecciones en el recorrido automático, texto y HUD extenso. Valorar puntos de descanso por crónica, resúmenes y modo de batalla centrado en la historia.
2. **Validación física:** Safari iPhone, Android de gama media, controles táctiles, orientación, audio y tiempos de carga en redes lentas.
3. **Ruido de consola:** investigar las dos respuestas 404; sin excepción JS ni rutas bloqueadas en los flujos examinados.
4. **Variedad de recorridos:** quedan alternativas que no han pasado por Chrome completo; fueron revisadas anteriormente en simulación de motor.
5. **Comercialización:** GitHub Pages público no restringe acceso ni acredita pago. No lanzar de pago hasta resolverlo por separado.

**Veredicto:** suficientemente estable como para continuar a testeo humano controlado de esta beta; no todavía certificada para un lanzamiento público/comercial. Mantener `main` intacto.
