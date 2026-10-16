# Las Casas del Reino — La Vigilia de los Cinco Fuegos
**Edición de desarrollo V1.4 (propuesta) · 16 de octubre de 2026**

## Qué hemos añadido
Cinco escenas nuevas en la Crónica XII justo después de `y21`, cuando el Dragón vuelve a cubrir los cinco estandartes, y antes de `y22` (la Gran Alianza).

### Nuevas escenas jugables
- **`v19_vigilia` — Antes de que caiga el cielo:** Holos y MenosEsMas plantean tres prioridades incompatibles. El Vigía debe escoger adónde ir.
- **`v19_muralla` — Dos golpes bajo el estandarte:** Nyra y Garra deben defender la muralla sin cortar el paso de Rusk. Dos decisiones con consecuencias distintas.
- **`v19_refugio` — La cuerda de Taren:** Taren, Lysa y MenosEsMas se enfrentan al coste de evacuar sin relevos.
- **`v19_trono` — Una orden que el Rey no firma:** decidir si una alarma puede gobernar para siempre. Holos presencia la escena, sin usurpar la palabra del Rey.
- **`v19_alba` — Cinco brasas frente a una sombra:** muestra el resultado concreto de la ruta elegida y conduce a la Gran Alianza.

El canon no cambia: el Dragón **no es destruido**, la Hermandad **no toma la corona**, y las cinco Casas mantienen funciones diferentes. Las elecciones añaden ecos y consecuencias para el epílogo, pero no reemplazan los doce desenlaces originales ni los tres Game Over.

## Dirección visual y experiencia
- Cinco llamas HTML/CSS nuevas, sin imágenes ni servicios externos; una pulsación distinta en cada fuego.
- Noche de los cinco estandartes: panel de vigilia, gradientes de ceniza/brasa, luz y contorno más contrastados y resaltado de decisiones.
- La iluminación se adapta a la alarma del reino. Movimiento reducido automáticamente cuando el dispositivo lo solicite.
- Interludio cinematográfico al acceder a la Vigilia con el sistema ya existente de transiciones.
- Recuerdo de las decisiones de la noche en la Reconquista y el epílogo.
- Composición adaptable a móvil sin columnas ni desplazamiento lateral.

## Validación automatizada
- `TOTAL_SCENES=256`.
- Simulación de **750 rutas completas**, comprobación de doce finales y tres Game Over.
- Test dirigido de las **6 variantes** (tres destinos × decisión favorable/adversa), persistencia del guardado y recuerdo en epílogo.
- Pruebas de UI con Chromium y WebKit móviles emulados: cinco brasas visibles, escena ramificada, amanecer y consecuencias; partida completa en Chromium.
- Comprobación de coexistencia con V1.2 en la propuesta separada de GitHub Pages.

## Publicación, privacidad y límites
Los cambios están **solo en `desarrollo-v1-3-lanzamiento`**. La versión pública en `main/beta-v1-3/` no se modifica. Estas ediciones del repositorio son públicas; GitHub Pages no es un paywall. Faltan pruebas humanas y de música en dispositivos físicos antes de etiquetar esta ampliación como una edición final.

## Próximas mejoras potenciales
Revisar tensión narrativa y ritmo de las decisiones en el Dragón con feedback humano. Después: atlas visual de las cinco Casas con estados, banda sonora contextual y mejoras de descubrimiento de secretos sin spoilear finales.
