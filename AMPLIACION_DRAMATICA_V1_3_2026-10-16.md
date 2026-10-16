# Las Casas del Reino — El precio del último rugido
**Fecha:** 16/10/2026 · **Solo en** `desarrollo-v1-3-lanzamiento` · **Nunca fusionado con `main`**.

## Objetivo creativo
Que la saga completa no sea únicamente una crónica que se pueda leer hasta el final: las decisiones del Vigía deben abrir escenas propias en cuatro momentos de presión, reaparecer después y poder llegar al epílogo sin sustituir el canon de la novela. El Dragón retrocede, no muere; la Hermandad no gobierna.

## Ocho escenas y cuatro bifurcaciones
1. **Caídas (f1):** `v18_f1_rescate` y `v18_f1_estandarte`. Rescatar también al resto de los aprendices o abandonarlos; reconocer públicamente los hechos u ocultar el fracaso. Eco diferido en f7 y y22.
2. **Traición (t4):** `v18_t4_archivo` y `v18_t4_llaves`. Copias verificables para las Casas o rumores; negarse a entregar el control del archivo o ceder todas las llaves al Consejero. Eco diferido en t7 y y22.
3. **Despertar del Dragón (w9):** `v18_w9_senales` y `v18_w9_familias`. Comunicar órdenes diferenciadas o movilizar indiscriminadamente; organizar evacuaciones o priorizar estandartes. Eco en w10 y y25.
4. **Batalla final (y25):** `v18_y25_turnos` y `v18_y25_proclama`. Relevar a los guardianes o perseguir una criatura que no puede ser destruida; rectificar públicamente una proclamación falsa u ocultar daños. Eco en y26.

## Persistencia y cierre
- Las opciones nuevas conservan sus consecuencias mediante flags `v18*` en el guardado existente (versión 9). No hay sistema paralelo de almacenamiento.
- El epílogo incorpora `v18EndingMarkup`: **Cuatro decisiones que cambiaron el Reino**, con hasta cuatro recuerdos de lo que efectivamente ocurrió en esa partida.
- Se mantienen las cinco heridas persistentes, las brigadas limitadas, las tres puertas de Game Over y los doce resultados originales.
- Se actualiza `TOTAL_SCENES` a 251 y se añade una comprobación dirigida de las ocho nuevas rutas a `tests/qa-regresion.mjs`.

## Verificaciones y límites
La comprobación está automatizada en el workflow `QA V1.3 (rama de desarrollo)`: regresión del motor (incluidas rutas nuevas), simulación de navegadores móviles en Chromium/WebKit y una partida de principio a epílogo con clics reales en Chromium emulado. La ejecución en GitHub debe revisarse tras los commits finales antes de declarar aprobada esta iteración.

No sustituye pruebas con dispositivos físicos, lectura narrativa humana de todas las variantes, música en Android/iOS o prueba del acceso privado y compra Stripe. No publicar ni cobrar hasta esas puertas de calidad.

## Próximo objetivo
La experiencia es funcional pero merece una prueba humana especial de los arcos VI–XII: comprobar emoción, anticipación de la traición, intensidad del Dragón, protagonismo de Holos/MenosEsMas y tensión real de la Reconquista, sin explicar demasiadas consecuencias antes de que ocurran.
