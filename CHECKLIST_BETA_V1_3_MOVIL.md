# Las Casas del Reino · Puerta de calidad V1.3 móvil

Fecha de preparación: 16/10/2026. **Solo rama de desarrollo**. No fusionar a `main`, no publicar checkout LIVE, no activar cobros en esta fase.

## Estado de partida verificado
- 243 escenas alcanzables sobre 243; 250 simulaciones completas sin errores del motor; 12 epílogos originales y 3 finales oscuros.
- Cinco heridas persistentes, asignación limitada de 3 brigadas más una cuarta condicional, Juramento del Vigía y decisiones que reaparecen en el Diario.
- Estas simulaciones NO sustituyen una prueba visual real de Android/iPhone, audio ni navegación táctil.

## Prueba funcional en dispositivos reales (no marcar aprobada sin comprobar)
| Caso | Android Chrome | iPhone Safari | WhatsApp/navegador interno |
|---|---|---|---|
| Carga inicial y portada legible en pantalla pequeña | Pendiente | Pendiente | Pendiente |
| Nuevo Vigía: nombre, acentos, guardar y continuar | Pendiente | Pendiente | Pendiente |
| Decisiones bloqueadas: texto de condición, sin pulsación accidental | Pendiente | Pendiente | Pendiente |
| Explorar Casa Calcáneo y volver a la historia | Pendiente | Pendiente | Pendiente |
| Diario de huellas, Códice y regreso al juego | Pendiente | Pendiente | Pendiente |
| Lectura enfocada, orientación y scroll largo | Pendiente | Pendiente | Pendiente |
| Música se activa solo después de tocar, OFF se silencia | Pendiente | Pendiente | Pendiente |
| Guardado después de cerrar pestaña / volver al día siguiente | Pendiente | Pendiente | Pendiente |
| Exportar e importar respaldo JSON desde opciones | Pendiente | Pendiente | Pendiente |
| Pantalla Game Over: nombre, mensaje, reintento en punto anterior | Pendiente | Pendiente | Pendiente |
| Reconquista: brigadas no se duplican al reanudar | Pendiente | Pendiente | Pendiente |
| Epílogo: muestra daños reparados, pendientes y juramento | Pendiente | Pendiente | Pendiente |

### Escenarios narrativos obligatorios
1. **Supervivencia con coste:** generar al menos dos heridas, gastar una brigada, dejar otra pendiente; verificar que el Diario y el epílogo muestran la diferencia.
2. **Escasez:** generar cinco heridas y gastar tres brigadas (o cuatro con alianza). El juego debe impedir gastar una brigada inexistente y nunca indicar que todas las heridas se han reparado si queda alguna.
3. **Mal final:** acumular decisiones peligrosas, comprobar advertencia y elegir explícitamente la catástrofe. Verificar pantalla, guardar y salir, continuar y volver a la decisión anterior.
4. **Camino prudente:** completar la historia sin Game Over, atravesar el Juramento del Vigía y comprobar que los 12 epílogos literarios siguen funcionando en el motor.
5. **Migración:** importar copia JSON desde la beta V1.2 a la V1.3 sin perder nombre, historia, pistas, descubrimientos o misiones secundarias.

## Rendimiento y lectura
Probar red lenta y pantalla estrecha. Detectar imágenes que no aparecen, saltos de scroll, botones cortados, exceso de texto, lentitud tras cada elección, cambios de orientación, audio silenciado/no solicitado y foco de modales. Revisar explícitamente contraste, tamaño de botones y advertencias de Game Over.

## Clasificación de incidencias
- **Bloqueante:** pérdida/corrupción de progreso, bucle sin salida, botón imposible de pulsar, Game Over no restaurable, recurso duplicable, vista negra, fallo al pagar o entrega no controlada.
- **Alta:** bloqueo visual importante, capítulos que cargan muy despacio, texto ilegible, audio no controlable, decisiones que no explican su condición.
- **Media/baja:** errata, animación, ajustes estéticos, mejora de ritmo o redacción sin impacto funcional.

## Puerta de salida
No ofrecer una edición de pago hasta que al menos Android Chrome e iPhone Safari superen el flujo esencial (nombre, guardado, decisiones, exploración, reintento, epílogo) y se resuelvan bloqueantes/altas. La **venta y la protección real del archivo** requieren una entrega privada verificable; esconder un enlace en la web no protege un juego cuyo código es público. Probar Stripe en modo test y el acceso posterior a la compra antes de mover nada a LIVE.

**Siguiente hito recomendado:** ejecutar esta matriz con la beta privada V1.3 en URL de pruebas separada de la V1.2 pública, reunir capturas y observaciones, corregir y repetir regresión. Solo después valorar la integración comercial.
