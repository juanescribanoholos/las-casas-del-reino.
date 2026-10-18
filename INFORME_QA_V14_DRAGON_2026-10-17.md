# LAS CASAS DEL REINO
## INFORME DE QA · MISIÓN DRAGÓN · V1.4
**Fecha:** 17/10/2026 · **Rama:** `desarrollo-v1-4-dragon-epico` · **Estado:** beta de desarrollo sin publicar

### 1. Alcance
Auditoría del motor **real** de decisiones y renderizado HTML usando el JavaScript reconstruido desde los 16 fragmentos guardados en GitHub. Se ejecutó en un entorno JavaScript con sustitutos de DOM y almacenamiento local. **No se utilizó un navegador gráfico real**, ni se verificó físicamente Android, iPhone o reproducción audible.

**Estructura:** 264 escenas (256 previas + 8 de batalla); 16 fragmentos; aproximadamente 7.295.719 caracteres de fuente ensamblada (sin medir los bytes de red comprimidos).

### 2. Resultado de partidas
| Ruta | Decisiones ejecutadas | Desenlace | Excepciones / bloqueos |
|---|---:|---|---|
| Vigía prudente | 234 | Final normal | 0 |
| Rescate civil | 234 | Final normal | 0 |
| Error y rectificación en la batalla | 235 | Final normal | 0 |
| Alerta extrema y destrucción | 199 | GAME OVER: Cinco Casas ceniza | 0 |
| Cierre absoluto | 64 | GAME OVER: Última puerta | 0 |
| Pacto y obediencia absoluta | 106 | GAME OVER: Siete losas | 0 |
| **Total** | **1.072** | **3 finales completos + 3 finales oscuros** | **0** |

- Se ejecutaron `choose()`, efectos de elecciones, las funciones de texto y el renderizado de pantallas mediante DOM simulado. La navegación progresó desde `p0` hasta `ending` o `gameover`.
- En la ruta de rectificación se alcanzó `dr20_colapso`, se corrigió la orden y se continuó hasta el epílogo.
- Los tres GAME OVER se desbloquearon por **decisiones acumuladas** y la última orden de destrucción, no por azar.
- En las rutas exitosas no se observó retroceso del progreso al cruzar la misión Dragón.

### 3. Guardado y recuperación
**Correcto dentro del simulador:**
- Guardado automático y recarga a mitad de partida tras 46 decisiones, conservando nombre, historial y escena.
- Exportación JSON tras 17 decisiones; formato, nombre de archivo y datos correctos.
- Importación del JSON a otra partida con recuperación íntegra de nombre, escena e historial.
- Rechazo de un archivo JSON de formato inválido sin sustituir el progreso actual.
- Botón de reintento desde GAME OVER: regreso a `dr20_colapso` sin la marca terminal.
- Protección de información de Casas aún no visitadas al aplicar la sustitución del Atlas como lo hace el cargador.

### 4. Hallazgo corregido
**INCIDENCIA MED-01 · Música incorrecta en la nueva batalla.**
Las escenas `dr20_*` seleccionaban por defecto la pista de la Cripta en lugar de `dragon`, y GAME OVER tampoco utilizaba la atmósfera adecuada. Corregido en `beta-v1-4/parts/015.txt`, commit `c9046113990f4ac9dc91bdc82f7ae6cd42d2cbc9`. La función `sound.mood()` devuelve ahora `dragon` para la batalla y la derrota del Dragón. La pista `dragon` existe; **no se ha podido comprobar su reproducción audible**.

### 5. Riesgos pendientes
1. **P1 — Pruebas reales de navegador y móvil.** No se han probado clicks reales, transiciones, scroll, overlays ni el rendimiento en Chrome Android y Safari iOS. Sin esto no se puede certificar una beta para público general.
2. **P1 — Peso de carga.** 16 fragmentos y ~7,30 millones de caracteres ensamblados; imágenes y música están embebidas. Optimizar payload, caché y tiempo de primera apertura, especialmente en conexiones móviles. La cifra es tamaño lógico de caracteres, **no medición de descarga/compresión**.
3. **P1 — Música audible.** Tras el arreglo, comprobar interacción del usuario, silenciado, cambios de ambiente, suspensión y reanudación, tanto Android como iPhone.
4. **P2 — Usabilidad/lectura.** Validar tamaño de botones, legibilidad, foco y opción de reducir animaciones en dispositivos y lectores reales.
5. **P2 — Más rutas combinatorias.** Se probaron seis partidas dirigidas; no se han recorrido exhaustivamente todas las combinaciones de las 264 escenas ni todas las misiones secundarias.

### 6. Dictamen
**Aprobada para seguir con pruebas beta técnicas, NO certificada todavía para publicar como versión final ni comercializar.** La lógica principal y los tres finales oscuros han resistido las pruebas ejecutadas. Las pruebas visuales, de audio real y rendimiento quedan abiertas.

**Protección:** No fusionar esta rama con `main` ni cambiar las versiones públicas V1.2/V1.3 antes de autorización. GitHub Pages público no constituye un mecanismo de venta privada.

### 7. Método y reproducibilidad
- Motor original obtenido directamente de `juanescribanoholos/las-casas-del-reino.`.
- Compilación del JS ensamblado, instanciación del juego en V8 con dobles de `document` y `localStorage`.
- Autoplay parametrizado de seis partidas con efectos y cambios de escena reales.
- Comprobaciones dirigidas de copia/restauración/Atlas/música y reintento tras derrota.
- Script adicional de revisión estática: `beta-v1-4/verificar-v14.mjs` (guardado; su ejecución local en Node sigue pendiente por no poder clonar el repositorio desde este entorno).
