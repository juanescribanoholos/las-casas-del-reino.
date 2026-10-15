# Las Casas del Reino · V1.3, edición de lanzamiento

Estado: DESARROLLO PROTEGIDO. Esta rama no es la beta pública. Fecha de inicio: 2026-10-15.

## Objetivo
Convertir la aventura narrativa en un RPG narrativo realmente explorable sin reescribir ni destruir la V1.2. Lanzamiento comercial previsto en web Método HOLOS con pago único propuesto de **2,00 €**, sujeto a comprobaciones de precio final, impuestos y entrega.

## Feedback y problemas a corregir
- Al empezar cuesta entender quién habla, qué pretende y por qué el Vigía llega a Casa Calcáneo.
- Falta una breve introducción cinematográfica que explique el Reino, las Cinco Casas y el papel del Vigía, sin spoilers.
- Las estadísticas de confianza, alarma, relaciones y pistas necesitan un tutorial contextual y consecuencias evidentes; no se «canjean» como monedas.
- La experiencia se siente demasiado lineal («guía interactiva») aunque existan rutas y finales alternativos. Necesitamos exploración, conversaciones opcionales y resultados visibles de las decisiones.
- Errores también deben producir caminos interesantes: «fallar también es avanzar».
- Algunos jugadores perdían o no encontraban el progreso al cerrar navegador. V1.2 ya incorpora guardar, continuar y exportar/importar JSON: NO REGRESAR A UNA VERSIÓN SIN ESAS FUNCIONES.
- Atención a iPhone, navegadores in-app, audio móvil y rendimiento de recursos.

## Canon y criterios
- Conservar nombre de Vigía elegido y guardado (clave actual `casas_reino_v02_vigia`), todos los capítulos, personajes y 12 finales.
- Canon con ruta principal fiel + ramificaciones y finales alternativos diferenciados.
- Mantener el tratamiento especial de Holos y MenosEsMas.
- Cuidar biomecánica/metáforas: recurso educativo, no atribuir causalidad clínica inventada.
- La beta pública en `main` continúa disponible para los probadores y sus partidas; no publicar cambios de esta rama sin autorización.

## Entrega V1.3 por hitos
1. **Rendimiento**: cargador concurrente (4 peticiones máximas) y caché revalidada, misma secuencia y contenido.
2. **Inicio**: escena introductoria breve y saltable + objetivo del Vigía antes de Calcáneo.
3. **Tutorial**: explicar progresivamente mapa, pistas, confianza, decisiones y copia del progreso.
4. **Calcáneo**: estancias y diálogos realmente opcionales + pistas, un enigma original y consecuencias visibles.
5. **Regresiones**: 215 escenas (recalcular si cambia), 12 finales, carga/guardado, móvil, accesibilidad.
6. **Comercio**: ficha premium en web HOLOS, Stripe Checkout pago único, verificación servidor y entrega de una **versión protegida** independiente del enlace público de GitHub Pages.
7. **Validación**: pruebas Stripe test, compra->acceso->continuación->reapertura, estado postpago e importación desde V1.2.

## Integración web
- Web Lovable HOLOS ya implementa compra/verificación de Checkout Sessions e infraestructura Supabase privada. Aprovechar y extender de forma segura, nunca conceder acceso al juego por comprar otro producto.
- Para acceso real, el artefacto V1.3 no puede servirse desde el repositorio público. Priorizar almacenamiento privado + ruta con verificación server-side del derecho de acceso, sin secretos en el navegador.
- Una compra por `session_id` no equivale a una identidad segura y puede compartirse; valorar recuperación por correo/cuenta o enlace verificado.
- Los datos localStorage no viajan entre origen de beta GitHub y dominio HOLOS; la migración requiere exportar JSON en la beta e importarlo en la edición adquirida.
- No vender ni enlazar públicamente hasta probar acceso, pago, devolución, privacidad y facturación. No crear Stripe LIVE checkout a ciegas.
- Evitar cuotas y servicios adicionales de pago. El usuario cambia el principio inicial de «juego gratuito» hacia edición comercial opcional de 2 €, manteniendo infra sin cuota fija.

## Definición de «listo para lanzar»
- Demostración funcional móvil desde inicio a fin de Calcáneo; partidas antiguas recuperables; ningún error HTML/variables visibles.
- Acceso solo a compras verificadas para la edición protegida, sin enlace de bypass.
- Pruebas reales en navegadores; revisar rendimiento con 4 conexiones concurrentes en redes lentas.
- Los 12 finales conservados y auditados con rutas simuladas.
- Confirmados términos de venta y tratamiento fiscal para un producto digital en España, precio final mostrado antes de pago.
- Mantener ruta pública actual sin cambio hasta lanzamiento expresamente aprobado.
