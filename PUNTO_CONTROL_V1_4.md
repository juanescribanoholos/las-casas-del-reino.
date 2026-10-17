# LAS CASAS DEL REINO — PUNTO DE CONTROL V1.4
**Estado: desarrollo aislado; NO publicado ni fusionado.**
Repositorio: `juanescribanoholos/las-casas-del-reino.` (incluye punto final).
Rama de trabajo: `desarrollo-v1-4-pulido-casas`.
Base: `preparar-beta-v1-4-github-pages`. Mantener `main` y V1.3 sin cambios.

## Verificado en código
- Beta compuesta por **16 fragmentos**, todos presentes; HTML inicial y final completos.
- **256 escenas únicas**, declaradas en `TOTAL_SCENES`.
- **688 referencias literales de destino**, ninguna a escena inexistente.
- JavaScript ensamblado de la beta: **compilación sintáctica válida** (sin ejecución).
- Se incorporó `beta-v1-4/verificar-v14.mjs` para repetir estas comprobaciones con Node sin dependencias.

## Mejoras de esta misión
- `identidad-casas.css`: colores, acentos y fondos de las cinco Casas, transiciones y reducción de movimiento.
- Diario: cinco últimas decisiones, estado de alarma y confianza, heridas pendientes y estabilizadas.
- Regreso de partida: resumen contextual y acceso directo al Diario.
- Atlas: protección de escenas no descubiertas mediante sustitución compatible en el cargador.
- Guardados V1.4 en `casas_reino_v14_beta_github`; sin migración automática desde V1.3.

## Límites honestos
- No se ha ejecutado una partida completa en navegador.
- No se ha comprobado el audio ni la experiencia real en Android/iPhone.
- Las referencias estáticas válidas no garantizan que todas las decisiones condicionales sean alcanzables.
- El cargador sigue aplicando un parche textual de Atlas; **es compatible y verificado**, pero queda pendiente simplificarlo de forma segura.

## Próximo paso
1. QA navegable de rutas, derrotas, finales y restauración del guardado.
2. Validación responsive y sonido en dispositivos reales.
3. Preparar beta independiente para testeo autorizado; nunca fusionar a `main` sin aprobación.
