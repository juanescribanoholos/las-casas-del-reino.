# Finales oscuros y consecuencias terminales · Las Casas del Reino V1.3

**Implementado en la rama de desarrollo. No fusionar ni publicar en `main` sin autorización.**

## Principio de diseño
«Fallar es avanzar» sigue siendo cierto para errores normales. **Game Over** solo puede surgir si el jugador ha acumulado **al menos dos órdenes de riesgo específicas** en ese arco y tiene `alarm >= 2`; al llegar al punto crítico, escoge **de forma explícita** una última orden de destrucción. Cada crisis ofrece al menos dos vías de rescate; no se pierde por una sola decisión equivocada.

## Tres crisis y tres finales alternativos
1. Tras **m10**, escena `v15_crisis_roja`: último cierre de Casa Mandíbula. Si el Vigía impone cierre absoluto sin salidas ni relevos, pantalla **La última puerta se cerró** (`red`); los habitantes quedan aislados y las Casas se agotan detrás de sus propias murallas.
2. Tras **t10**, escena `v15_crisis_pacto`: siete losas. Si entrega todas las llaves al Consejero y silencia cualquier contradicción, pantalla **La corona de las siete losas** (`pact`); se despierta una fuerza sin que el Reino conserve control ni voces.
3. Tras **w12**, escena `v15_crisis_dragon`: último rugido del Dragón y llegada de la Hermandad. La orden de incendiar simultáneamente las cinco fortalezas provoca **Las cinco Casas fueron ceniza** (`dragon`).

Las tres derrotas se presentan como **futuros alternativos del juego** y no sustituyen el canon de la novela. Holos y MenosEsMas pueden llegar demasiado tarde en la tercera ruta.

## Guardado, colección y retorno
- `state.scene='gameover'`, `state.doomKind='red'|'pact'|'dragon'`, `state.finished=true`, `view='doom'`.
- Antes de ejecutar la elección terminal, `choose` guarda una copia independiente en `state.doomCheckpoint`, sin introducir referencias recursivas.
- «Volver a la última decisión» recupera ese estado, nombre, historia y pistas sin reiniciar toda la aventura; el protagonista puede elegir una salida menos destructiva.
- Guardar, salir, continuar e importar una partida terminada por derrota mantiene su estado. El mismo respaldo `.json` del juego incluye el checkpoint.
- Una galería separada en `casas_reino_derrotas_v1` registra hasta tres derrotas; el contador normal de 12 legados continúa igual, sin duplicaciones.

## Regresión del motor
- **233/233 escenas** referenciadas y alcanzables (tres nuevas respecto de la V1.3 anterior).
- **250/250 rutas completas** hacia los **12/12 legados originales** al evitar la elección autodestructiva explícita; una partida guiada completa sigue finalizando.
- Las tres derrotas: umbral cerrado con una sola señal de riesgo; desbloqueadas con señales acumuladas; Game Over, persistencia y retorno verificados para cada una.
- Prueba exploratoria aleatoria de 650 partidas con elecciones extremas habilitadas: **165 cierres**, **170 sometimientos al Consejero**, **87 incendios**, **228 epílogos normales**, **cero excepciones**. Esta distribución **no representa tasas de derrota humanas**, porque el simulador elige al azar incluso las opciones etiquetadas «⚠ FINAL OSCURO».
- Pantallas de derrota comprobadas mediante generación de HTML/controles con DOM simulado; **sin pruebas visuales reales en Chrome/Safari móvil**.

**Pruebas reutilizables:** `node tests/qa-regresion.mjs`.

## Verificaciones pendientes para la venta
Revisión con jugadores en Android Chrome e iOS Safari: advertencias legibles, botones táctiles, retry persistente tras cerrar pestaña, restauración JSON, tamaños de texto, rendimiento en red lenta y sonido; además del control de acceso comercial ya identificado en el plan V1.3.
