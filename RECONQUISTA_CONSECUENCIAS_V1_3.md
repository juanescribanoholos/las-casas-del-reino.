# Las Casas del Reino · El precio de sobrevivir
**Implementación en rama `desarrollo-v1-3-lanzamiento` · 16 de octubre de 2026**

## Filosofía narrativa
Superar un Game Over no elimina las heridas de decisiones anteriores. Los daños se deben a banderas verificables del historial (no se inventan lesiones en partidas en que se evitó el peligro). Una decisión prudente puede prevenir una herida; una decisión negligente durante la Reconquista puede crearla. La estabilización no equivale a una curación instantánea.

## Seis escenas nuevas de Reconquista
1. `y5c` — Ordan, `La grieta que no cura una victoria`: las tareas peligrosas de Calcáneo y la seguridad de la cripta.
2. `y9c` — Rusk, `El centinela que se durmió de pie`: la fatiga, la vigilancia y el coste de no relevar.
3. `y12c` — Taren, `La lanza que pesa demasiado`: riesgo asumido, confianza y reapertura de la plataforma.
4. `y15c` — Maera, `El corredor que quedó sin luz`: recursos de faroles y rutas temporales.
5. `y18c` — Lysa, `La guardia que no confía en descansar`: miedo a solicitar relevo y pérdida de confianza.
6. `y19c` — Holos y MenosEsMas, `Lo que cuesta seguir vivos`: discusión explícita sobre el coste de la reconstrucción, prioridades y el deber de reconocer públicamente lo que falta.

**Total escenas: 239** (anteriormente 233). Insertadas en el Acto XII sin borrar ninguna escena del canon adaptado.

## Sistema de brigadas y secuelas
- `V16_SCARS` rastrea cinco daños: `ordan`, `rusk`, `taren`, `maera`, `lysa`. Su presencia se calcula a partir de decisiones negativas ya registradas, incluidas elecciones negligentes de las escenas nuevas.
- `v16CrewTotal`: tres brigadas iniciales, ampliables a **cuatro** cuando antes se consiguió `hermandadIntegracion` o `v14HermandadPacto`.
- `v16Repair`: consume una brigada y estabiliza una herida; ajusta confianza y un vínculo relevante, y deja bandera persistente. El texto recuerda que los daños no se borran de la historia.
- Las alternativas permiten protección gradual sin brigada o negar el coste. Negarlo perjudica el vínculo con el personaje y crea una secuela futura, incluso si inicialmente no había herida grave.
- `v16Reconcile`: en el Consejo puede destinar las brigadas libres a necesidades pendientes, con prioridad anunciada al jugador: salidas y relevos, luego otros lugares.
- No se impide avanzar por falta de brigadas. La escasez produce costes abiertos, no un bloqueo arbitrario.

## Consecuencias diferidas y visibles
- Las decisiones y heridas se reflejan en diálogos de las escenas `y20` (el Rey y el Consejero), `y22` (la Gran Alianza), `y25` (retirada del Dragón) y `y26` (Holos y MenosEsMas).
- En `y22`, si quedan heridas abiertas, se desbloquea **una opción específica de enviar mensajeros a las Casas que aún necesitan ayuda**, con bandera registrada en el epílogo.
- El Diario muestra un registro de daños **pendientes** y **estabilizados**, el número de brigadas libres y cualquier plan público/negación de las secuelas.
- El epílogo incorpora la sección **EL PRECIO DE SEGUIR EN PIE**, con nombres concretos, tareas pendientes, ayuda recibida y cómo responden Holos y MenosEsMas.
- La exportación del Diario incluye daños pendientes y estabilizados; el guardado local y los JSON conservan el progreso sin cambiar el formato del guardado (versión 9).

## Verificaciones ejecutadas
- Lógica original reconstruida y ejecutada de `parts/003.txt` y `parts/004.txt` sin multimedia.
- **239 de 239 escenas** alcanzadas, **250/250 recorridos normales** hasta el epílogo, **12/12 finales literarios** alcanzables, **3/3 Game Overs** con guardado y reintento. El recorrido guiado pasó por las cinco expediciones y el minijuego de triangulación.
- Comprobaciones explícitas para las cinco heridas: no aparece herida grave cuando no hay antecedente; una mala decisión activa la deuda; destinar una brigada la estabiliza; el guardado la conserva; posponer conserva la deuda; negar la realidad añade deuda; el epílogo la narra.
- Prueba de escasez: **5 heridas y 3 brigadas → 3 estabilizadas y 2 pendientes**. Con la alianza adicional, **4 estabilizadas y 1 pendiente**.
- Generación de UI simulada para las 239 escenas, cinco secuelas activas, tres pantallas de Game Over y epílogos con/sin heridas: sin excepciones detectadas.

**Limitaciones:** estas son simulaciones del motor y de la generación de HTML; no sustituyen comprobaciones visuales/táctiles reales en iOS/Android ni validación de accesos y pagos. Mantener `main` intacta hasta decisión expresa de publicación.

**Script permanente:** `tests/qa-regresion.mjs`.
