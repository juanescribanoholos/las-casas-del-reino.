# Las Casas del Reino · Implementación jugable V1.3 (16 de octubre de 2026)

**Estado:** cambios guardados exclusivamente en `desarrollo-v1-3-lanzamiento`; rama pública `main` no modificada ni fusionada. **NO es autorización de venta ni prueba visual final**.

## Cambios realizados tras la auditoría
### 1. Rutas que cambian el juego
- **14 nuevas escenas** narrativas, pasando de 216 a **230**. Branching funcional en puntos de decisión de Quinto Radio (q7), Hallux (h7), Diafragma (d7), Mandíbula (m7) y Hermandad (x6h, x6m, x7 y x13).
- El jugador no regresa de inmediato al texto compartido: las alternativas lo conducen a una escena propia con un nuevo dilema, flag y efecto en confianza/alarma; después pueden confluir de nuevo sin romper el canon.
- Las cuatro Casas recuerdan parte de sus consecuencias en q8, h8, d8 y m9; la Hermandad en x17 y y26 durante la Reconquista. Nuevas banderas conservadas bajo `state.flags` y compatibles con guardados V1.2.
- Holos puede descubrir el coste de investigar sin actuar y MenosEsMas, el de detener una respuesta sin evaluar el peligro. Los desacuerdos no son anecdóticos: el Vigía puede mediar y el resultado reaparece en la trama posterior.

### 2. Decisiones visibles
- El Diario destaca una selección de **huellas duraderas** cuando el jugador obtiene los flags correspondientes. El historial íntegro permanece disponible en un desplegable, para evitar paredes de texto.
- La pantalla principal ya mostraba el impacto inmediato; se conserva el detalle de cambios de relaciones, alarma y pistas, y ahora varias elecciones producen además una escena distinta.

### 3. Minijuego de investigación, no solo un cuestionario
- **Mesa de Testigos de Quinto Radio**: investigación opcional en dos fases. Primero elegir datos a contrastar; después cómo validarlos. Progreso intermedio en `exploreV12.quinto.triangulacion`, sin nueva clave de guardado ni borrado de partidas.
- Un protocolo bien contrastado desbloquea una respuesta específica ante el emisario en q8; una deducción sin prueba incrementa alarma pero NO bloquea la historia.
- Convive con `Las Dos Luces` de Diafragma y con los cinco enigmas explorables, aportando otra forma de jugar.

### 4. Ritmo y vuelta al juego
- Resumen contextual al usar **Continuar**, con dos escenas recientes y objetivo actual (solo interfaz; no reinicia nada).
- Objetivo visible durante la lectura en las crónicas principales.
- **Lectura enfocada** opcional: menos estadísticas y ruido secundario, texto más aireado; mantiene absolutamente todas las elecciones y sus consecuencias. Preferencia local independiente del guardado de historia (`casas_reino_lectura_v1`).
- Se eliminó del menú de inicio el acceso rápido de prueba a capítulos; no se eliminan las funciones de desarrollo necesarias para QA y regresión.

### 5. Códice y criterios educativos
- Nueva sección `Anatomía y metáfora`, con explicaciones breves de calcáneo, quinto metatarsiano, hallux, diafragma y mandíbula.
- Mantener explícita la distinción: los hechos anatómicos son generales, la relación entre Casas es **ficción** y no demuestra relaciones causales ni justifica diagnósticos.
- Se corrigen rótulos de desarrollo V1.3 y aviso de pie de página para no afirmar que la futura edición comercial será gratuita.

## Verificación realizada
- Reconstrucción en memoria y ejecución directa del motor original de los fragmentos `003` y `004`, sin cargar los recursos musicales.
- **1 partida guiada completada:** 212 escenas, cinco expediciones de tres estancias, cinco enigmas, diez diálogos opcionales y Mesa de Testigos con resultado contrastado; recuperación simulada de guardado a intervalos.
- **250/250 partidas aleatorias completadas**, **230/230 escenas alcanzadas**, **12/12 finales alcanzados**; cero errores detectados en la batería.
- Comprobación adicional de generación de interfaz simulada: 230 escenas y las seis regiones explorables sin excepciones; toggle de lectura enfocada comprobado sin DOM de navegador completo.
- Reconocimiento/migración de partidas v2-v8 y conservación del guardado vigente v9, incluidos progresos de exploración anteriores.
- Script permanente actualizado: `node tests/qa-regresion.mjs`. No requiere dependencias de terceros.

**No probado aquí:** interfaz real en Chrome/Safari, cargas de imágenes y sonido en móvil, interacción táctil, accesibilidad con lector de pantalla, tiempo de carga en red lenta, persistencia tras cerrar la aplicación, pago Stripe y distribución privada.

## Antes de publicar o vender
1. Probar Android Chrome + navegador WhatsApp e iPhone Safari, desde prólogo a final de Calcáneo; comprobar que se ven diálogos, Mesa de Testigos, Lectura enfocada y Diario.
2. Comprobar copia JSON desde V1.2 e importación a V1.3 en dominio comercial; el almacenamiento local de un dominio no migra automáticamente a otro.
3. Probar red lenta, audio activado por gesto del jugador, reabrir después de cerrar y restauración de partida.
4. **El repositorio es público**: la V1.3 NO debe venderse como contenido protegido desde GitHub Pages ni hacerse checkout LIVE sin verificar derechos de acceso y entrega privada.
5. Revisar términos fiscales de contenido digital, impuestos y precio final antes de publicar.

## Registro de commits
- `45fdd73`: 14 escenas nuevas y rutas de las cinco Casas/Hermandad.
- `0223a9f`: huellas duraderas, objetivos y Códice anatomía/metáfora, menú sin saltos de desarrollo.
- `b859b29`: minijuego de triangulación en dos fases.
- `efd4129`: ecos narrativos de las rutas y elección condicionada por la triangulación.
- `bdea29a`: regresión 230 escenas, 250 partidas, 12 finales.
- `ffa9051`: Lectura enfocada.
- `0648ed9`: identificación correcta del cargador de la rama de desarrollo.

**Próximo paso creativo:** profundizar en el capítulo del usuario y su becario dentro de la Hermandad, partiendo de las consecuencias anteriores, sin atribuir al canon hechos que solo pertenecen a la adaptación.
