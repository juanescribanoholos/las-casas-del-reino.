# Las Casas del Reino — Beta V1.4: La Vigilia de los Cinco Fuegos

**Estado:** desarrollo de la misión **EL CIELO PARTIDO** en `desarrollo-v1-4-dragon-epico`. No fusionada ni publicada como edición aprobada. V1.2 y V1.3 permanecen intactas.

La beta conserva las **256 escenas originales** de la edición previa e integra **8 nuevas escenas del enfrentamiento final**, para un total de **264 escenas**.

## Misión Dragón: El cielo partido
- Comienza tras `v19_alba` (la Vigilia de los Cinco Fuegos) y desemboca en `y22` (Gran Alianza).
- Tres rutas de aproximación: cinco Casas, rescate de civiles o encuentro con el Consejero.
- Segunda oleada de amenaza con elecciones que afectan confianza, alarma, alianzas y heridas.
- Una crisis de último recurso: se puede **rectificar** incluso después de ordenar una ofensiva irresponsable.
- **Game Over** de Reino destruido solo con alarma elevada, varias decisiones extremas y una última orden explícita de destrucción.
- Tres posibilidades de huella: contención y relevo, vigilancia revisable, o una victoria falsa que reaparece en las escenas posteriores.
- Conserva el desenlace fundamental: **el Dragón sigue vivo**, el Rey y el Consejero recuperan su lugar y ninguna Casa gobierna sola.
- Efectos visuales CSS, símbolos de las Casas y respeto por `prefers-reduced-motion`. No se requieren servidores ni librerías externos.

## Compatibilidad
- Guardado independiente de esta beta: `casas_reino_v14_beta_github`.
- Se conservan las partidas existentes: quien ya pasó de `v19_alba` podrá continuar en su punto de guardado sin volver atrás.
- Cargador de **16 fragmentos**, más `identidad-casas.css`.
- Se puede exportar/importar progreso JSON en el menú de opciones.
- La rama **no se ha fusionado con `main`**.

## QA
- Comprobación de 16 fragmentos, 264 escenas y sintaxis completa realizada.
- Simulación de todas las decisiones de las ocho escenas para tres perfiles de partida; sin destinos inexistentes ni salidas bloqueadas.
- Herramienta reproducible: `node beta-v1-4/verificar-v14.mjs`.
- Pendiente: partida real de principio a fin, pruebas de interfaz y audio en Android e iPhone, revisión de rendimiento y aprobación de publicación.

GitHub Pages en un repositorio público **no es un mecanismo para restringir ventas o accesos**. Esta beta no está monetizada.
