# LAS CASAS DEL REINO — PUNTO DE CONTROL V1.4 · MISIÓN DRAGÓN

**Rama actual:** `desarrollo-v1-4-dragon-epico` (derivada de `desarrollo-v1-4-pulido-casas`). **NO publicar ni fusionar a main sin pruebas humanas y autorización.**

## Confirmado al 17-10-2026
- Juego cargado en 16 fragmentos, con contador de **264 escenas** (256 originales + 8 de la batalla).
- Misión **EL CIELO PARTIDO**, iniciada desde `v19_alba` y conectada con `y22` y, más tarde, `y25`.
- Tres rutas iniciales: cinco Casas, civiles sin estandarte o decreto ante el Rey/Consejero.
- Segundo rugido, riesgo acumulativo, oportunidad de rectificación, contención, victoria falsa y Game Over si se acumulan decisiones extremas.
- Final canónico protegido: Dragón vivo, Rey y Consejero en sus posiciones y Hermandad sin corona.
- Efectos regionales y barras de cinco emblemas con reducción de movimiento y sin recursos externos.
- Diario del Vigía, resumen de retorno de partida, compatibilidad con los guardados V1.4 anteriores y Atlas protegido frente a spoilers.
- Contador de escenas y barra de progreso ordenados para que las escenas del Dragón no parezcan posteriores al epílogo.
- Sintaxis de JS completo verificada antes del último ajuste de contador/objetivo; simulación de las ocho escenas bajo 3 perfiles: sin rutas bloqueadas ni errores de render, finales oscuros accesibles solo con requisitos.

## Control reproducible
- `beta-v1-4/verificar-v14.mjs` audita 16 fragmentos, 264 escenas y destinos de decisiones: `node beta-v1-4/verificar-v14.mjs`.
- El script está guardado, pero **todavía no se ha ejecutado en un entorno Node real desde el repositorio**. La simulación se realizó contra las escenas extraídas en la sesión.
- Falta QA en navegador, partida completa, sonido, guardado/recuperación y prueba en Android e iPhone.

## Próxima misión sugerida
**La prueba de fuego:** comprobar con navegador real las rutas de los cinco estandartes, civiles y decreto, las dos salidas del colapso, el Game Over, el diario de decisiones y la experiencia en móvil. Registrar cualquier bloqueo antes de lanzar la beta.

**Venta:** GitHub Pages público no es control de acceso. No comercializar esta rama tal cual.
