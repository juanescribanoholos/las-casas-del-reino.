# Las Casas del Reino · El juramento del Vigía
**Rama**: `desarrollo-v1-3-lanzamiento` · **16 de octubre de 2026** · **Estado**: implementado y probado en simulación de motor. No publicado.

## Nueva progresión narrativa
Tras la Reconquista, la escena `y26` conduce a tres escenas exclusivas, dependiendo de la elección de cierre anterior:

- **`y27a` · La página que ninguno quiso firmar**. Holos reconoce que sus informes son falibles. El Vigía decide si la posteridad debe conservar hechos, dudas y versiones contrapuestas o si debe convertir la explicación de la Hermandad en doctrina. Una opción de cierre daña la confianza con Holos.
- **`y27b` · Los nombres que no llegaron al salón**. MenosEsMas devuelve su atención a quienes carecen de estandarte. El Vigía decide si promover la participación de aldeas y familias, llevarlas al Consejo o anteponer condecoraciones a la ayuda. Ignorar a las familias afecta a la relación con MenosEsMas.
- **`y27c` · La corona que nadie pidió**. El Vigía se enfrenta a su propuesta de que la Hermandad gobierne. Holos y MenosEsMas rechazan nuevos tronos. Puede rectificar, pedir una mentoría sin mandato o insistir, perjudicando los dos vínculos.

Las tres rutas convergen en **`y28` · El juramento que termina contigo**. Hay cuatro juramentos, cada uno con su propia bandera de progreso y un texto de consecuencia en el epílogo: responsabilizarse del daño, enseñar sin dogmas, recordar las heridas o buscar gloria personal. El nombre del Vigía aparece en su juramento.

## Consecuencias persistentes
- El motor conserva todas las elecciones en `state.flags` con prefijo `v17`, por medio del guardado existente (versión 9). No se añadió un sistema de datos paralelo ni se invalidaron partidas V1.2.
- `v17LegacyMarkup` añade al epílogo literario una sección adaptada con ruta, juramento, estado de las heridas y relación con Holos/MenosEsMas. **No altera los doce resultados originales** de `epilogueResult()`.
- El Diario muestra también el compromiso y la exportación de texto incluye el juramento. El Códice incorpora `memoriaVigia` marcado expresamente como adaptación, no como canon de la novela.
- Las escenas pueden recordar daños persistentes y carencias de brigadas, sin prometer una reparación milagrosa.

## Auditoría
- **243 de 243 escenas** alcanzadas con simulación del motor; **250/250 recorridos completos** con **12/12 desenlaces originales** conservados.
- **Tres Game Over** con umbrales, guardado y reintento no modificados.
- Comprobación específica: entrada a las tres rutas, opciones positivas y negativas, guardado de banderas, acceso al juramento, persistencia de sus cuatro variantes y representación de cada legado.
- Generación de interfaz simulada de las **243 escenas** sin excepciones; comprobación particular de los capítulos `y27a`, `y27b`, `y27c`, `y28` y el texto del epílogo.
- Regresión ejecutable sin dependencias: `node tests/qa-regresion.mjs`.

**Limitaciones**: simulación lógica y HTML, no auditoría visual en Chrome/Android, Safari/iOS o navegadores integrados; no se ha completado la validación del sonido, persistencia real tras cerrar aplicaciones ni entrega segura del producto comercial. La beta de testers en `main` debe mantenerse intacta.
