# LAS CASAS DEL REINO — PUNTO DE CONTROL V1.4 · CINE Y RITMO

**Rama actual:** `desarrollo-v1-4-cine-ritmo` (desde `desarrollo-v1-4-dragon-epico`). **No publicar ni fusionar con `main` sin la aprobación del usuario.**

## Estado verificado · 17 de octubre de 2026
- Juego completo dividido en 16 fragmentos, con **264 escenas** (256 precedentes + 8 escenas nuevas del Dragón).
- Batalla `EL CIELO PARTIDO` insertada entre `v19_alba` y `y22`, con cooperación de las cinco Casas, rescate de civiles, alternativa ante el Consejero, rectificación y Game Over irreversible tras decisiones extremas.
- Se conserva el canon: el Dragón sigue vivo, Rey y Consejero mantienen sus funciones, y la Hermandad no acepta una corona.
- Diario, Atlas protegido de spoilers, nombre del Vigía y progreso guardado bajo `casas_reino_v14_beta_github`.
- **Ritmo mejorado:** puntos de descanso entre crónicas con recuerdos y guardado seguro; resumen de regreso y consecuencias plegables.
- **Móvil cinematográfico:** herramientas/estadísticas en «mochila» plegable; batalla centrada en arte, texto y decisiones; la exploración no interrumpe la escena del Dragón.
- Favicon SVG propio y sin errores de consola registrados en la última ronda.

## QA comprobado en Chrome real
- Ejecución final: https://github.com/juanescribanoholos/las-casas-del-reino./actions/runs/39070705878
- **49/49 comprobaciones aprobadas**, sin errores de navegador.
- **234 decisiones** en una partida completa desde el prólogo hasta el epílogo.
- Se verificaron por separado la ruta de rescate, su consecuencia posterior, el Game Over y la contraorden tras el reintento.
- Audio original del Dragón `play()` confirmado en Chrome; no equivalente a escucha humana.
- Vista móvil **emulada** de 390 px: 2.519 px de altura en la escena del Dragón frente a 3.307 px antes (**23,8 % menos**), sin desplazamiento horizontal.
- Las pruebas de Chrome se ejecutan automáticamente por GitHub Actions al actualizar `beta-v1-4/**`.

## Documentación
- `INFORME_PULIDO_CINE_RITMO_V1_4.md` contiene detalle, limitaciones y enlaces a evidencias.
- `beta-v1-4/qa-chrome.cjs` y `.github/workflows/qa-dragon-v14.yml` contienen prueba reproducible.
- `beta-v1-4/verificar-v14.mjs` contiene validación estática de escenas y rutas.

## Próxima misión (no repetir auditorías generales)
**Prueba humana final y publicación controlada:** comprobar en Android y iPhone físicos, música, legibilidad, ritmo y tiempo de carga. Recabar feedback de tres jugadores sobre el Dragón y los descansos; corregir solo incidencias reales, verificar el commit final, y solicitar aprobación explícita antes de fusionar o publicar.

**Comercialización:** pendiente. GitHub Pages abierto no garantiza control de acceso de pago; el juego no debe ofrecerse de pago desde esta beta pública sin una solución separada.

**Nota:** no afirmar que ha sido probado en teléfonos físicos ni declarar terminado el lanzamiento. El núcleo completo y la batalla funcionan en Chrome real; la beta está lista para el último testeo humano.
