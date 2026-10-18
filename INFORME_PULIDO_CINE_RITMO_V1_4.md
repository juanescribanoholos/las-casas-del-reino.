# LAS CASAS DEL REINO — INFORME DE PULIDO V1.4 · CINE Y RITMO
**Fecha:** 17 de octubre de 2026. **Rama:** `desarrollo-v1-4-cine-ritmo`. **Producción:** `main` intacta; nada publicado ni fusionado.

## Resultado de calidad
**49/49 comprobaciones automáticas superadas en Chrome 155**, sin excepciones JavaScript ni errores de consola en la última ejecución.

- Juego completo: **234 decisiones** en una ruta desde el prólogo hasta el epílogo, con **195 antes** del clímax y **39 después**.
- Batalla del Dragón: rutas de cooperación, rescate y derrota oscura comprobadas en navegador. La ruta de rescate alcanza `y22` conservando la consecuencia narrativa `dr20FamiliasSalvas`.
- Game Over activado, pantalla de destrucción y botón de rectificación operativos.
- Audio: al pulsar «Música ON» en Chrome, la reproducción de la pista original devolvió el estado `playing`. No constituye una escucha humana ni prueba en otros sistemas.
- Reanudación: nombre, escena, progreso y guardado recuperados tras recargar.
- Descansos: interludios muestran tres decisiones recientes; guardar y descansar regresa al menú y mantiene la escena.
- Móvil simulado a **390 × 844**: tres decisiones accesibles, Diario desplegable, paneles secundarios inicialmente plegados, ninguna barra horizontal.

### Mejora medible de densidad móvil
| Indicador | Antes | Después |
|---|---:|---:|
| Altura total de la misma escena del Dragón | 3.307 px | **2.519 px** |
| Reducción de altura | — | **788 px (23,8 %)** |
| Anchura del documento | 390 px | **390 px** |

La cifra compara las capturas de Chrome móvil simulado. No es una medición universal para todos los teléfonos.

## Qué se ha cambiado
1. **Puntos de descanso narrativos:** campamentos discretos entre crónicas, resumen opcional de decisiones recientes, memoria de heridas pendientes y botón para guardar y volver al menú.
2. **Información secundaria plegable:** mensaje de regreso y efectos de la decisión anterior consultables, sin preceder obligatoriamente el texto de la escena.
3. **Mochila de herramientas móvil:** estadísticas, mapa, Códice, Diario, personajes, exploración y guardado permanecen disponibles dentro de un desplegable que no invade la lectura.
4. **Dirección cinematográfica del Dragón:** estado general reducido en pantalla pequeña, título más protagonista, arte y batalla antes que indicadores, sin botón de exploración superpuesto a la ilustración; música original operativa.
5. **Identidad técnica:** favicon original del Reino. Última ejecución sin errores de consola.
6. **Contador técnico discreto:** se conserva la progresión pero se oculta el «escena N/264» en el móvil para reducir presión de lectura.

## Evidencias
- [Ejecución de 49 pruebas en Chrome](https://github.com/juanescribanoholos/las-casas-del-reino./actions/runs/39070705878)
- [Capturas y report.json del navegador, almacenados 7 días](https://github.com/juanescribanoholos/las-casas-del-reino./actions/runs/39070705878/artifacts/12115311405)
- Capturas: `dragon-movil.png`, `descanso-movil.png`, `victoria-desktop.png` y `derrota-dragon.png`.
- Guion reproducible: `beta-v1-4/qa-chrome.cjs`. Flujo en `.github/workflows/qa-dragon-v14.yml`.

## Límites pendientes
- Chrome es real, pero la vista de 390 px **es móvil emulado**: no certifica dispositivos Android ni Safari/iPhone físicos.
- No se han probado todas las elecciones posibles de las 264 escenas en navegador. La ejecución completa utilizó una ruta favorable; rutas Dragon de rescate y derrota fueron probadas por separado.
- No se han valorado con jugadores humanos el ritmo, la emoción, la comprensión ni la dificultad real.
- No hay pasarela de acceso/pago protegida. **No vender desde GitHub Pages público sin revisar control de acceso.**
- No dar por cerrada la versión hasta testeo humano final, validación física de audio/táctil y revisión de tiempos de carga en redes lentas.

**Veredicto:** beta funcional y notablemente más inmersiva; apta para una ronda de validación humana controlada. No afirmar una puntuación absoluta de 10/10 sin las últimas pruebas.
