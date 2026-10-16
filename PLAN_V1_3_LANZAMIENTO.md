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

## Registro de avances del 15 de octubre de 2026

- Rama `desarrollo-v1-3-lanzamiento`, separada de `main` (beta pública V1.2). No fusionar hasta pruebas finales.
- Cargador más eficiente: 4 descargas simultáneas, caché revalidada. Commit `57bc53e`.
- Prólogo `p0` con contexto del Vigía y las Cinco Casas para partidas NUEVAS; partidas anteriores retoman su escena sin empezar de nuevo. Commits `d862d97`, `a924a3f`.
- Guía `❖ Cómo jugar` en menú, narración y exploración + consejos en p0/p2/p4/c7/c8 sobre pistas, confianza, alarma y libertad de explorar. Commit `1660867`.
- Enigma OPCIONAL de Calcáneo: investigar Cripta y Archivo para comparar señales, tomar una decisión y registrar la consecuencia (cambia confianza/alarma y puede descubrir `registros`). Commit `9189bea`.
- Pruebas de código: 30 recorridos tras añadir guía, todos finalizados; después del enigma, otros 20 recorridos, todos finalizados, 216 escenas sin destino roto; solución con pista y error con alarma simulados y persistidos correctamente. **No confundir con pruebas visuales en navegador móvil.**
- Página comercial `/las-casas-del-reino` creada en Lovable con CTA DESHABILITADO («Próximamente»), precio previsto 2 € y nombres canónicos de las Cinco Casas. Todavía sin activación de venta ni prueba de entrega.
- Pendiente: entrega privada del artefacto V1.3 (el GitHub fuente sigue siendo PÚBLICO), compra test realista + validación de sesión/comprador, reabrir el juego en móvil, migración exportar/importar beta -> web comercial, fiscalidad/condiciones de venta.
- Bloqueo temporal: workspace Lovable sin créditos para más ediciones. Stripe Holos comprobado en modo real, catálogo legible, sin producto `Las Casas del Reino` verificado. No habilitar pagos ni publicar hasta superar pruebas y validar operación.

## Ampliación de Calcáneo · 15 de octubre (tarde)

Se continúa **exclusivamente el desarrollo narrativo y jugable**. Web, Stripe y lanzamiento comercial quedan expresamente aplazados al fin de semana.

### Cambios incorporados
- `d785149`: Ordan recuerda cómo lo trataste en la entrada; Garra reacciona a las conclusiones del enigma; una investigación contrastada desbloquea la respuesta especial de Garra en c7 y deja ecos en Consejo, Ordan y camino a Quinto Radio.
- `c87406b`: conversaciones **opcionales y únicas** con Ordan (tras investigar una estancia) y Garra (tras resolver el enigma y alcanzar su llegada en la crónica). Persisten en `exploreV12.calcaneo.dialogues` y en el Diario; tienen consecuencias en pistas, confianza o alarma; no bloquean la historia.
- `e09a655`: el testimonio obtenido al conversar con Ordan abre una cuarta resolución posible ante el Consejo en c8. Garra y Ordan responden a estas conversaciones en c7/c8/c10. Mantener el canon y el hecho de que un testimonio no demuestra por sí solo una causa clínica.

### Comprobación controlada
- 48 de 48 rutas completas, 216 escenas registradas, sin destino inexistente ni errores de ejecución.
- Una ruta especial completada con dos conversaciones, dos pistas, enigma, opción única de Garra y respuesta especial de Ordan en el Consejo; guardado y recuperación correctos.
- Las 12 variantes de desenlace verificadas alcanzables en 98 simulaciones.
- Almacenamiento local antiguo recuperable; no cambia su clave.
- **Pendiente** prueba VISUAL en Android/iOS y navegador. No presentar las simulaciones como ensayo real de interfaz.
- La rama `main` sigue siendo la beta pública; no fusionar sin pruebas y autorización.

## Ampliación de Quinto Radio · 15 de octubre (noche)

Se mantiene el alcance exclusivamente jugable. No tocar web, Stripe ni publicaciones.

- `38a35e8`: llegada a Muralla Roja con reputación desde Calcáneo. Rusk y Nyra reconocen informe contrastado de Garra, participación de Ordan y modo de llegada. Se añaden opciones condicionadas en q1 (informe avalado), q7 (enigma de la Muralla) y q8 (alianza de relevo con Nyra), con consecuencias en q10 y transición hacia Casa Hallux.
- `114252d`: nuevo enigma OPCIONAL de Quinto Radio tras explorar Adarve y Junta ennegrecida. La respuesta contrastada ofrece una pista y opción especial en q7; las conclusiones precipitadas aumentan alarma sin impedir continuar.
- `114252d`: conversaciones opcionales con Nyra y Rusk, guardadas en `exploreV12.quinto.dialogues`. Escuchar a Nyra desbloquea negociación especial en q8. Rusk aporta testimonio o tensión según la elección. Cada conversación solo puede completarse una vez.
- QA del motor: 48 rutas completas sin bloqueos, 216 escenas existentes sin destinos inexistentes, recuperación de partidas anteriores y de los nuevos eventos. Una ruta de juego especial completa en Quinto con enigma, diálogos y pacto de Nyra. Los 12 desenlaces siguieron alcanzables en 212 simulaciones.
- Pruebas pendientes: ejecutar visualmente en Android, iOS y escritorio, con foco en distribución táctil de las nuevas tarjetas y guardado al cerrar el navegador. No equiparar pruebas del motor con navegador real.
- Arquitectura sin cambios: código solo en rama `desarrollo-v1-3-lanzamiento`; beta `main` intacta, sin despliegue público de V1.3.

## Ampliación de Hallux · 15 de octubre (noche)

Alcance de esta tanda: **solamente videojuego**, sin cambios de web ni Stripe.

- `cf48009` — Lady Filo y los guardias reconocen los informes y la alianza de Nyra. Opciones especiales en h1 (acuerdo de relevos), h7 (llegada de Taren comprobada) y h9 (dossier cooperativo con Filo, Nyra o Senda). La respuesta especial se conserva hasta Diafragma por medio de `bridge_d`.
- `4e07dc0` — Casa Hallux obtiene enigma opcional tras explorar **Plataforma estrecha** y **Línea de Senda**, sobre distinguir fuerza, preparación, dirección y seguridad de la llegada; acertar conserva pista `direccion` y estado `v13HalluxEnigmaOrientado`. Las interpretaciones prematuras tienen consecuencias sin provocar bloqueo.
- `4e07dc0` — Conversaciones opcionales con **Lady Filo** y **Maestro Senda**. Se conservan bajo `exploreV12.hallux.dialogues` y en el Diario. Escuchar a Filo desbloquea `v13FiloEscuchada`; investigar con Senda desbloquea `v13SendaEnsayo`. Solo puede tenerse una conversación resolutiva por personaje.
- Verificación: 48/48 rutas completas, 216 escenas sin destinos rotos; ruta de Hallux con enigma, ambas conversaciones, rescate de Taren, informe de cooperación y guardado/restauración completos; la opción equivocada no bloquea.
- Finales: 12/12 variantes alcanzables en 102 recorridos simulados.
- Se conserva la clave local de guardado de V1.2. La beta en `main` sigue intacta. No desplegar ni fusionar sin permiso explícito.
- **Pendiente**: verificar visualmente en navegador de móvil y escritorio, con especial atención a interfaz de conversaciones y a guardado/reapertura; comprobar efectos reales de sonido y rendimiento.

## Ampliación de Diafragma y Lord Aliento · 15 de octubre de 2026

Alcance: únicamente videojuego, rama `desarrollo-v1-3-lanzamiento`. Web, Stripe y ventas continúan pendientes del fin de semana.

- `bfea66f`: Maera y Lord Aliento reconocen cooperación con Filo y Nyra. Nuevas opciones condicionadas en d3 (legado entre Casas), d7 (informe de turnos de galería) y d9 (respuesta medida ante crisis), con repercusión en `bridge_m` hacia Mandíbula.
- `97ba82a`: enigma opcional Diafragma tras investigar el Farol Primero y la Galería de las costillas. Escoger comparación y alternativas con cautela aporta pista, confianza y decisión especial; precipitarse tiene consecuencia de alarma sin bloquear la historia. Conversaciones opcionales con Maera y Lord Aliento, salvadas en `exploreV12.diafragma.dialogues` y Diario.
- `cc86f3d`: minijuego táctico **Las Dos Luces**: dos decisiones distintas entre proteger evacuación, relevar la guardia o iluminar rutas secundarias. Las decisiones se conservan incluso a mitad del reto en `exploreV12.diafragma.luces`. Proteger salida y relevar provoca `v13FarolPlanEstable`; otros planes `v13FarolPlanCostoso`, sin bloquear la trama. No se trata de terapia respiratoria ni de una simulación clínica.
- `13f28d1`: un plan equilibrado de Las Dos Luces, unido al enigma, permite intervenir en la crisis del Farol Primero aunque no se completase la conversación opcional con Maera. Aliento recuerda una planificación costosa.
- QA: 50 recorridos del motor tras enigma y conversaciones, luego 48 tras Las Dos Luces, **todos hasta el final**, sin destinos inexistentes; recuperación de partida antigua y de progreso intermedio del minijuego, bloqueos correctos y consecuencias persistentes; 12/12 finales accesibles mediante 142 rutas simuladas.
- **Pendiente**: prueba visual y táctil en Android/iPhone/escritorio; probar sonido, carga, manejo de tarjetas y reapertura real del navegador. No fusionar a `main` ni publicar la V1.3 sin validación y permiso.

## Ampliación de Mandíbula y Kael · 16 de octubre de 2026

Alcance: exclusivamente jugabilidad de la rama `desarrollo-v1-3-lanzamiento`. No tocar `main`, web, Stripe ni ventas.

- `98c66d3` — Kael reacciona en m3 a un plan equilibrado o costoso de «Las Dos Luces». Si el Vigía completó el plan equilibrado, se ofrece una nueva respuesta condicional con pista `cierreSelectivo` y marca `v13KaelDosLuces`.
- La decisión reaparece en m8, durante la escena de la máscara hendida. El diálogo reconoce relevos y defensas medidos; las rutas alternativas permanecen disponibles.
- Verificación puntual: cambio de archivo y commit leídos de GitHub, diez escenas de Mandíbula siguen presentes y `main` conserva su commit anterior. **No se ha ejecutado una simulación integral ni una prueba visual de navegador de esta nueva tanda**.
- Pendiente: simulación de recorridos completos y de los 12 finales, verificación de partidas antiguas, prueba visual Android/iPhone/escritorio y guardado real al cerrar/reabrir navegador.
- `1115359` — enigma opcional de Mandíbula al contrastar Puerta Menor y Dormitorios de hierro: solución medida o decisiones extremas, pistas/alarma, Diario y guardado persistente.
- `4f8ef97` — diálogos opcionales únicos de Lysa y Kael, guardados en `exploreV12.mandibula.dialogues`; escuchar o presionar tiene efectos diferentes sobre vínculos y alarma.
- `f2e1071` — esas decisiones tienen eco en m7–m9, con una opción especial de verificación de la orden del Consejero si se resolvió el enigma y se escuchó a Lysa.
- QA estática del 16/10: sintaxis de la sección narrativa de Mandíbula, mecánicas y fragmento de interfaz comprobada, diez escenas conservadas, persistencia y enlazado de eventos presentes. **No equivale a una ejecución simulada integral ni prueba visual, móvil o de guardado real tras cerrar navegador**.


## Bloque de mejoras de jugabilidad completado · 16 de octubre

Referencia operativa: `IMPLEMENTACION_V1_3_2026-10-16.md`. Se añadieron 14 escenas (ahora **230**), rutas con consecuencias y diálogos más profundos de Holos/MenosEsMas, Mesa de Testigos en Quinto Radio, Diario de huellas (incluyendo errores), objetivos y resumen al reanudar, Lectura enfocada y Códice que diferencia anatomía/ficción. Accesos de prueba ocultos del menú y rótulos de rama actualizados.

**QA automatizada final:** partida guiada de 212 escenas hasta el epílogo, 250/250 rutas completas, 230/230 escenas visitadas, 12/12 finales alcanzables; minijuego de dos fases y compatibilidad con partidas anteriores verificados por simulación del motor. Pruebas de interfaz simulada completadas para 230 escenas y seis regiones; no constituyen pruebas visuales reales en móvil. Script: `tests/qa-regresion.mjs`.

**BLOQUEOS DE LANZAMIENTO:** falta prueba real táctil/audio/guardados en Android e iOS; migración JSON beta -> dominio comercial; entrega segura de la edición privada, verificación Stripe y aspectos fiscales. Mantener `main` pública V1.2 sin cambios ni fusión hasta autorización expresa. La siguiente expansión creativa de la Hermandad parte de estos cambios.

## Finales oscuros jugables · 16 de octubre de 2026

**Implementación completada en rama V1.3:** tres puertas de colapso narrativo (después de Mandíbula, Traición y Despertar del Dragón), acumulación de malas decisiones + alarma elevada, aviso de peligro y última opción explícita con desenlace `gameover`. Vías de rescate siempre disponibles. Tres epílogos alternativos de Reino destruido, separados de los 12 finales originales.

**Guardado seguro:** `doomCheckpoint` con estado anterior, retroceso desde pantalla de derrota, reanudación de partida perdida e importación/exportación JSON. Galería de derrotas separada. Pruebas automatizadas en `tests/qa-regresion.mjs`: 233 escenas, 250 rutas canónicas completas, 12 finales originales, 3 derrotas, umbrales, guardados y vuelta a la decisión. Más detalles y límites en `FINALES_OSCUROS_V1_3.md`.

**No publicado:** main conserva la beta de los testers; pruebas visuales reales y venta protegida siguen pendientes.

## El precio de sobrevivir · Secuelas de la Reconquista

Ver documentación: `RECONQUISTA_CONSECUENCIAS_V1_3.md`. **Implementado:** seis escenas de secuelas y reconstrucción (239 escenas totales), cinco heridas persistentes derivadas de malas decisiones, tres brigadas de ayuda y una brigada de bonificación por alianzas previas, decisiones con coste y vínculos deteriorados si se niega el daño. Holos y MenosEsMas discrepan sobre prioridades sin sustituir al Vigía. Diario, exportación y epílogo muestran daños pendientes y atendidos; Rey, Consejero, paladines y Hermandad responden durante la Reconquista. Opción adicional de enviar ayuda a las Casas heridas en `y22`.

**QA:** 250/250 rutas completas, 239/239 escenas alcanzadas, 12 finales originales y tres Game Overs intactos. Las cinco heridas, los cinco guardados de reparación, la brigada extra, la escasez (3/5 y 4/5) y los reintentos han pasado la batería. Prueba de generación simulada de interfaz sin excepciones; falta validación en móvil real.

**Publicación:** no desplegar ni fusionar `main` hasta validación visual, audio, guardado, distribución privada y cobro.
