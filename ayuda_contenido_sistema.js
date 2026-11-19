// Preguntas y respuestas del chat de ayuda para los usuarios del sistema de bodega (asobodex2.html).
// Una lista por perfil; a todos se les agregan solas al final unas preguntas comunes (clave, salir...).
// Para cambiar o agregar una pregunta:  p = la pregunta que se ve,  k = palabras clave con las que el usuario
// podría buscarla,  r = la respuesta (puede llevar <b>, <ol>, <ul>).
window.AYUDA_CONTENIDO = window.AYUDA_CONTENIDO || {};
(function () {
  var CONTACTO = { email: 'mensajeria@asonoreste.org', asunto: 'Ayuda con AsoBodex', whatsapp: '' };   // whatsapp: número del administrador (ej. 573001234567)

  var comunes = [
    { p: '¿Cómo cambio mi clave?',
      k: 'clave contrasena password cambiar cambio olvide seguridad',
      r: 'Toca el botón <b>🔑</b> que está arriba a la derecha, junto a "Salir", escribe tu clave nueva y guarda. Te recomiendo cambiarla la primera vez que entres.' },
    { p: '¿Cómo cierro sesión?',
      k: 'salir cerrar sesion logout desconectar',
      r: 'Toca <b>Salir</b>, arriba a la derecha. Hazlo siempre que uses un computador o celular que no sea tuyo.' },
    { p: 'No veo una pestaña que otros sí ven',
      k: 'pestana pestanas menu falta no veo no aparece permiso permisos otro usuario',
      r: 'Cada usuario ve <b>solo las pantallas de su perfil</b>, para que sea más fácil y seguro. Si necesitas algo que no ves, pídeselo al administrador.' }
  ];
  var dashboard = { p: '¿Qué muestra el Dashboard?',
    k: 'dashboard resumen inicio stock bajo viejo solicitudes articulos grafica movimientos',
    r: 'Arriba tienes 4 tarjetas: <b>Total de artículos</b>, <b>Stock bajo</b> (materiales por debajo del mínimo), <b>Material viejo</b> (más de 4 meses en bodega) y <b>Solicitudes pendientes</b>. Al tocar una tarjeta, el panel de abajo cambia para mostrar el detalle. A la derecha ves los últimos movimientos.' };
  var inventario = { p: '¿Cómo busco un material en el Inventario?',
    k: 'inventario buscar material stock cantidad departamento existencias hay',
    r: 'Entra a <b>Inventario</b> y escribe el nombre en <b>🔍 Buscar material</b>, o filtra por <b>departamento</b>. Ahí ves la cantidad, el mínimo, la fecha de ingreso, cuánto tiempo lleva en bodega y su estado.' };
  var solicitudInterna = { p: '¿Cómo pido material para mi departamento?',
    k: 'solicitud interna solicitar pedir material departamento carrito campana evento administrador',
    r: 'Entra a <b>Solicitud Interna</b>:<ol><li>Escribe tu nombre y el <b>motivo</b> (campaña, evento, reunión…).</li>' +
       '<li>Busca el material, pon la cantidad y toca <b>＋ Agregar</b>. Puedes agregar varios.</li>' +
       '<li>Toca <b>📤 Enviar solicitud al administrador</b>.</li></ol>' +
       'En <b>Mis solicitudes recientes</b> ves cómo van.' };

  // El mapa del Dashboard lo ven todos los perfiles menos el auditor (que tiene el suyo, de libros, en su Panel).
  var mapaDash = { p: '¿Qué muestra el mapa del Dashboard?',
    k: 'mapa dashboard envios movimiento distritos material enviado buses zona periodo colores puntos mas',
    r: 'Muestra <b>a qué distritos se ha enviado más material</b>, saliendo de la Bodega en Cúcuta. Cuenta las unidades de pedidos entregados, distribuciones, despachos y envíos ocasionales.' +
       '<ul><li>Los destinos con <b>más material</b> se ven <b>más grandes</b> y con más buses.</li>' +
       '<li><b>Colores:</b> 🟢 recibió hace menos de 6 meses · 🟠 entre 6 y 12 · 🔴 más de un año · ⚪ sin envíos.</li>' +
       '<li>Toca un destino para ver cuánto se envió, cuándo fue el último envío y <b>qué materiales fueron los más enviados</b>.</li>' +
       '<li>Arriba cambias el <b>Período</b> (30 días, 90 días, 12 meses o Todo) y la <b>Zona</b> (Todo, N. Santander, Arauca, Vichada).</li></ul>' };

  function perfil(titulo, saludo, preguntas, conContacto) {
    var lista = preguntas.slice();
    if (titulo.indexOf('Auditor') === -1) lista.push(mapaDash);
    return { titulo: titulo, saludo: saludo, contacto: conContacto === false ? null : CONTACTO, preguntas: lista.concat(comunes) };
  }

  // ── Auditor ──────────────────────────────────────────────────────────────────────────────
  window.AYUDA_CONTENIDO.auditor = perfil('Ayuda · Auditor',
    '¡La paz, {nombre}! 👋 Soy el asistente de ayuda de tu usuario de auditoría. Elige una pregunta o escríbeme tu duda.',
    [
      { p: '¿Para qué es mi usuario?', k: 'usuario auditor para que sirve funcion',
        r: 'Es para la <b>auditoría de los talonarios (libros) de diáconos</b>: revisar que cada libro sea el que le corresponde a su iglesia y cuánto tiempo hace que se envió. Tienes dos pantallas: <b>📊 Panel</b> (resumen con mapa y gráficas) y <b>🔎 Libros</b> (la lista para revisar).' },
      { p: '¿Cómo verifico un libro?', k: 'verificar verificado verifico revisar libro correcto quitar',
        r: 'En <b>🔎 Libros</b>, cada libro tiene el botón <b>✓ Verificar</b>. Tócalo cuando la numeración sea la correcta para esa iglesia. Queda <b>✓ Verificado</b> con tu nombre y la fecha. Si te equivocas, toca <b>Quitar</b>.<br><br>Los libros en estado "Siguiente libro" no se verifican todavía.' },
      { p: '¿Cómo reporto una novedad?', k: 'novedad novedades reportar problema error incorrecto libro mal equivocado no cuadra',
        r: 'En el libro, toca <b>⚠️ Novedad</b> y escribe qué pasa (libro incorrecto, numeración mal, no lo recibieron…). El <b>administrador la ve en su usuario</b> y te responde. Mientras no la resuelva, puedes tocar <b>Editar novedad</b> para corregir el texto.' },
      { p: '¿Qué pasa cuando el administrador resuelve mi novedad?', k: 'resuelta resuelve respuesta administrador novedad responde',
        r: 'El libro muestra <b>✔ Novedad resuelta</b> con la <b>respuesta del administrador</b>, y deja de contar como novedad abierta.' },
      { p: '¿Qué muestra el mapa del Panel?', k: 'mapa panel envios destinos puntos camino ruta bodega zona',
        r: 'Muestra <b>hacia dónde se han enviado más libros</b>, saliendo de la Bodega en Cúcuta. Los destinos con más envíos se ven <b>más grandes</b> y con más buses. Toca un destino para ver su detalle y los distritos que incluye.' },
      { p: '¿Qué significan los colores del mapa?', k: 'colores color verde naranja rojo gris mapa significan semaforo',
        r: 'Muestran cuánto hace que cada zona <b>recibió libros</b>:<ul><li>🟢 <b>Verde:</b> menos de 6 meses</li><li>🟠 <b>Naranja:</b> entre 6 y 12 meses</li><li>🔴 <b>Rojo:</b> más de un año</li><li>⚪ <b>Gris:</b> sin fecha o sin envíos</li></ul>' },
      { p: '¿Cómo cambio el período y la zona del mapa?', k: 'periodo zona dias meses todo arauca vichada santander cambiar filtro ver',
        r: 'Arriba del mapa hay dos selectores: <b>Período</b> (30 días, 90 días, 12 meses o Todo) y <b>Zona</b> (Todo, N. Santander, Arauca, Vichada). En el celular, usa las zonas para acercarte a cada departamento. En Arauca el mapa se desliza hacia los lados.' },
      { p: '¿Qué es "Tiempo sin recibir libros"?', k: 'tiempo sin recibir libros inactivos mucho tiempo distritos atrasados pedido',
        r: 'Es la lista de distritos ordenada por el <b>último libro enviado con fecha</b>: los que llevan más tiempo sin recibir salen primero. Toca un distrito para ver sus libros en la pantalla Libros. Los distritos <b>sin fecha</b> salen en gris al final.' },
      { p: '¿Qué es "Distritos con novedades"?', k: 'distritos novedades alerta datos revisar lista panel',
        r: 'Lista los distritos que tienen <b>⚠ novedades sin resolver</b> o <b>🔍 libros con datos por revisar</b> (numeración dudosa, repetida o que se cruza con otro libro).' },
      { p: '¿Qué significan los números de arriba en Libros?', k: 'tarjetas numeros arriba libros registrados enviados por enviar verificados sin verificar con novedad filtrar',
        r: 'Son botones: <b>Libros registrados</b>, <b>Enviados</b>, <b>Por enviar / en bodega</b>, <b>Verificados</b>, <b>Sin verificar</b> y <b>Con novedad</b>. Al tocar uno, la lista se filtra. Toca "Libros registrados" para verlos todos otra vez.' },
      { p: '¿Qué significan los estados de los libros?', k: 'estados estado enviado por enviar bodega siguiente libro significa',
        r: '<ul><li><b>Enviado:</b> ya se entregó a la iglesia.</li><li><b>Por enviar:</b> está listo para salir.</li><li><b>En bodega:</b> guardado en la bodega.</li><li><b>Siguiente libro:</b> la numeración que sigue para esa iglesia.</li></ul>' },
      { p: '¿Qué es la etiqueta amarilla ⚠ en un libro?', k: 'amarilla etiqueta alerta advertencia datos dudosos revisar cruza repetido numeracion',
        r: 'Es una alerta de <b>datos por revisar</b>: por ejemplo, la numeración no empieza con el código de la iglesia, está repetida en otra iglesia o se cruza con otro libro. Míralo con más cuidado y, si algo no cuadra, repórtalo como novedad.' },
      { p: '¿Por qué hay libros "sin fecha de envío"?', k: 'sin fecha envio fecha falta tiempo no aparece cuanto hace',
        r: 'Porque en el Excel original no se anotó la fecha en que se enviaron. Sin fecha no se puede calcular el tiempo ni el movimiento, por eso esos libros salen en gris. Los libros que se envíen desde ahora sí llevan fecha.' },
      { p: '¿Puedo modificar o borrar libros?', k: 'modificar borrar editar eliminar cambiar libros permiso',
        r: 'No. Tu usuario es <b>solo de revisión</b>: lo único que cambias es marcar libros como verificados y reportar novedades. El administrador es quien modifica los datos.' }
    ]);

  // ── Secretaría (Karen) ───────────────────────────────────────────────────────────────────
  window.AYUDA_CONTENIDO.secretaria = perfil('Ayuda · Secretaría',
    '¡La paz, {nombre}! 👋 Soy el asistente de ayuda de Secretaría. Elige una pregunta o escríbeme tu duda.',
    [
      { p: '¿Para qué es mi usuario?', k: 'usuario secretaria para que sirve funcion',
        r: 'Para manejar las <b>Biblias</b>: <b>autorizar o rechazar</b> las solicitudes que llegan de los pastores y <b>entregar Biblias directamente</b> a un distrito. También puedes ver el inventario y pedir material para tu departamento.' },
      { p: '¿Cómo autorizo una solicitud de Biblias?', k: 'autorizar autorizo aprobar biblias solicitud pastor cantidad',
        r: 'Cuando un pastor pide Biblias te llega un correo. Entra a <b>📖 Biblias</b>, revisa la solicitud, ajusta la cantidad si hace falta y toca <b>Autorizar</b>. El administrador ve tu decisión dentro del pedido.' },
      { p: '¿Puedo cambiar la cantidad que pidió el pastor?', k: 'cambiar cantidad ajustar biblias menos mas original',
        r: 'Sí. Antes de autorizar, cambia la cantidad en la solicitud. Queda guardada la cantidad original y la que autorizaste.' },
      { p: '¿Cómo rechazo una solicitud de Biblias?', k: 'rechazar rechazo no autorizar biblias motivo',
        r: 'Toca <b>Rechazar</b> y escribe el <b>motivo</b>: se incluye en el correo que le llega al pastor.' },
      { p: '¿Dónde veo las decisiones que ya tomé?', k: 'decisiones recientes historial anteriores autorizadas rechazadas',
        r: 'En <b>📖 Biblias</b>, abajo, despliega <b>"Ver decisiones recientes"</b>.' },
      { p: '¿Cómo entrego Biblias directo a un distrito?', k: 'distribuir distribucion entregar entrega biblias distrito directo registrar',
        r: 'Entra a <b>Distribuir Biblias</b>:<ol><li>Escribe el <b>responsable</b> de la entrega.</li><li>Escoge el <b>distrito</b>, pon la cantidad y toca <b>＋ Agregar</b> (puedes agregar varios distritos).</li>' +
           '<li>Si quieres, anota el <b>costo del envío</b>.</li><li>Toca <b>✓ Registrar distribución de Biblias</b>.</li></ol>' +
           'Al guardar se descuenta del inventario (y también el Certificado de Bautismo correspondiente).' },
      { p: '¿Qué pasa con el costo de envío cuando son varios distritos?', k: 'costo envio transporte viaje varios distritos reparte',
        r: 'El costo es opcional. Si el viaje incluye <b>varios distritos</b>, se reparte en <b>partes iguales</b> entre ellos.' },
      { p: '¿Cómo veo cuántas Biblias hay en bodega?', k: 'cuantas biblias hay stock inventario existencias bodega',
        r: 'Entra a <b>Inventario</b> y busca "Biblias". También aparece en la pantalla de Distribuir Biblias cuando escoges el distrito.' },
      solicitudInterna, inventario, dashboard
    ]);

  // ── Facturador (Eliana) ──────────────────────────────────────────────────────────────────
  window.AYUDA_CONTENIDO.facturador = perfil('Ayuda · Facturación y distribución',
    '¡La paz, {nombre}! 👋 Soy el asistente de ayuda de tu usuario. Elige una pregunta o escríbeme tu duda.',
    [
      { p: '¿Para qué es mi usuario?', k: 'usuario facturador para que sirve funcion',
        r: 'Para hacer las <b>distribuciones de materiales</b> a los distritos y generar las <b>remisiones</b> de materiales con costo. También puedes ver el inventario y pedir material para tu departamento.' },
      { p: '¿Cómo hago una distribución?', k: 'distribucion distribuir entregar entrega materiales distrito registrar',
        r: 'Entra a <b>Distribución</b>:<ol><li>Escribe el <b>responsable</b> de la distribución.</li>' +
           '<li>Escoge el <b>distrito</b>, busca cada material, pon la cantidad y toca <b>＋ Agregar</b>.</li>' +
           '<li>Si quieres, anota el <b>costo de envío</b> del viaje.</li><li>Toca <b>✓ Registrar distribución</b>.</li></ol>' +
           'Al guardar se <b>descuenta del inventario</b>.' },
      { p: '¿Qué pasa con el costo de envío?', k: 'costo envio transporte viaje varios distritos reparte',
        r: 'Es opcional. Si el viaje incluye varios distritos, el costo se reparte en partes iguales entre ellos. Se guarda para el control interno de gastos; no se le cobra al distrito.' },
      { p: '¿Cómo genero una remisión?', k: 'remision remisiones generar imprimir factura cobro iglesia destinatario',
        r: 'Entra a <b>Remisiones</b>:<ol><li>Escribe la <b>iglesia o destinatario</b>, el <b>distrito</b> y el <b>responsable</b> (el correo es opcional).</li>' +
           '<li>Busca cada material con precio, pon la cantidad y toca <b>＋ Agregar</b>.</li>' +
           '<li>Revisa el total y toca <b>🖨️ Generar e imprimir remisión</b>.</li></ol>' +
           'Sale un documento imprimible; también puedes guardarlo como PDF.' },
      { p: 'No me aparece un material al hacer la remisión', k: 'material no aparece remision precio buscar falta',
        r: 'En remisiones solo salen los <b>materiales que tienen precio</b> registrado. Si falta uno, pídele al administrador que le ponga precio en el inventario.' },
      { p: '¿Dónde veo las distribuciones y remisiones anteriores?', k: 'recientes anteriores historial distribuciones remisiones ver',
        r: 'En cada pantalla, a la derecha: <b>Distribuciones recientes</b> y <b>Remisiones recientes</b>.' },
      { p: 'Me equivoqué en una distribución, ¿cómo la corrijo?', k: 'equivoque error corregir distribucion eliminar borrar cambiar entrega mal',
        r: 'Avísale al administrador: es quien puede eliminar o corregir una entrega ya registrada, para que el inventario quede bien.' },
      solicitudInterna, inventario, dashboard
    ]);

  // ── Auxiliar contable ────────────────────────────────────────────────────────────────────
  window.AYUDA_CONTENIDO.auxiliar = perfil('Ayuda · Cobros',
    '¡La paz, {nombre}! 👋 Soy el asistente de ayuda de Cobros. Elige una pregunta o escríbeme tu duda.',
    [
      { p: '¿Para qué es mi usuario?', k: 'usuario auxiliar contable para que sirve funcion',
        r: 'Para llevar los <b>cobros a pastores y distritos</b> de los materiales con costo (talonarios, libro misionero, etc.) y marcar si están pendientes, en pago, atrasados o pagados.' },
      { p: '¿Cómo aparecen los cobros en mi lista?', k: 'cobros aparecen solos automatico aprobado pedido correo aviso llegan',
        r: 'Cuando el administrador <b>aprueba un pedido</b> con materiales con costo, el cobro <b>aparece solo</b> en tu lista y te llega un correo de aviso. También puedes agregar cobros a mano o importarlos desde Excel.' },
      { p: '¿Cómo cambio el estado de un cobro?', k: 'estado cambiar cobro pagado pagando atrasado pendiente marcar',
        r: 'En <b>Lista de cobros</b>, usa el selector de cada cobro: <b>Pendiente, Pagando, Atrasado o Pagado</b>. Si el cobro tiene el correo del pastor, se le avisa del cambio.' },
      { p: '¿Cómo agrego un cobro a mano?', k: 'agregar cobro manual nuevo pastor concepto valor',
        r: 'En <b>➕ Agregar cobro manual</b>: escoge el <b>pastor</b> (el correo se llena solo), el distrito, el <b>concepto</b> (busca un material con precio o escribe uno nuevo), la cantidad, el <b>valor unitario</b> y la fecha. Luego toca <b>➕ Agregar cobro</b>.' },
      { p: '¿Cómo importo cobros desde Excel?', k: 'importar excel cobros plantilla archivo columnas subir',
        r: 'En <b>📥 Importar cobros desde Excel</b>: el archivo lleva las columnas <b>Pastor, Distrito, Material, Valor</b> (y Cantidad si quieres). El correo no va: se busca solo según los pedidos anteriores del pastor. Toca <b>⬇ Descargar plantilla</b> si necesitas el formato.' },
      { p: '¿Qué significan los tres totales de arriba?', k: 'totales por cobrar atrasado pagado suma resumen',
        r: '<ul><li><b>Por cobrar:</b> lo pendiente y lo que está en pago.</li><li><b>Atrasado:</b> los cobros marcados como atrasados.</li><li><b>Pagado:</b> lo que ya se pagó.</li></ul>' },
      { p: '¿Cómo busco los cobros de un pastor?', k: 'buscar pastor filtrar cobros estado lista',
        r: 'En <b>Lista de cobros</b> escribe el nombre en el buscador y, si quieres, filtra por estado.' },
      { p: '¿Cómo edito o elimino un cobro?', k: 'editar eliminar borrar cobro corregir equivoque lapiz',
        r: 'Cada cobro tiene <b>✏️</b> para editarlo y <b>🗑</b> para eliminarlo (úsalo, por ejemplo, si cargaste uno por error).' },
      { p: '¿Qué ve el pastor de sus cobros?', k: 'pastor ve resumen formulario materiales con costo informativo',
        r: 'En el formulario de pedidos, el pastor ve <b>"Tu resumen de materiales con costo"</b> con lo que tiene pendiente. Es solo informativo: la Asociación descuenta esos valores por remesas.' },
      dashboard, inventario
    ]);

  // ── Tesorero ─────────────────────────────────────────────────────────────────────────────
  window.AYUDA_CONTENIDO.tesorero = perfil('Ayuda · Tesorería',
    '¡La paz, {nombre}! 👋 Soy el asistente de ayuda de Tesorería. Elige una pregunta o escríbeme tu duda.',
    [
      { p: '¿Para qué es mi usuario?', k: 'usuario tesorero para que sirve funcion',
        r: 'Para ver los <b>Indicadores de Bodega</b>: cómo rotan los materiales, cuánto vale el inventario, qué hay que comprar y cuánto se gasta en envíos. También puedes ver el inventario y pedir material para tu departamento.' },
      { p: '¿Qué es la clasificación del inventario?', k: 'clasificacion rotacion rapida normal lenta inactivo inventario tarjetas',
        r: 'Cada material se clasifica según sus <b>salidas de los últimos 12 meses</b>: <b>Rápida, Normal, Lenta o Inactiva</b>. Las tarjetas de arriba y la dona lo resumen; al tocar una tarjeta se filtra la tabla de detalle.' },
      { p: '¿Qué son los materiales más solicitados?', k: 'mas solicitados pedidos demanda unidades despachadas ranking',
        r: 'Son las <b>unidades despachadas en los últimos 12 meses</b>: lo que más se pide, sin importar cuánto stock quede.' },
      { p: '¿Qué es el capital dormido?', k: 'capital dormido parado inmovilizado dinero materiales sin movimiento',
        r: 'Es el dinero que está detenido en materiales con stock que casi no se mueven. Te sirve para decidir qué dejar de comprar.' },
      { p: '¿Cómo se calcula el valor del inventario?', k: 'valor inventario precio compra cantidad cuanto vale precio material',
        r: 'Es <b>cantidad en existencia × precio de compra registrado</b>. Solo cuenta los materiales que tienen precio; se va completando cuando se registra el precio al registrar o agregar stock.' },
      { p: '¿Qué es la proyección de compra?', k: 'proyeccion compra comprar antes agotamiento estacionalidad necesidad',
        r: 'Está en <b>"Ver proyección de compra"</b>: estima cuándo se agota cada material de rotación rápida o normal y <b>hasta cuándo conviene comprar</b>, considerando la estacionalidad (por ejemplo, enero para los sobres de diezmo) y 30 días de espera de la compra.' },
      { p: '¿Qué son los gastos de envío?', k: 'gastos envio transporte costo despacho viaje',
        r: 'Es el costo de transporte de cada despacho o distribución. Se anota al despachar y sirve para el <b>control interno</b>; no se le cobra a los distritos.' },
      { p: '¿Cómo veo el comportamiento de un distrito?', k: 'comportamiento distrito ver por distrito materiales pide',
        r: 'En Indicadores de Bodega, despliega <b>"📍 Ver comportamiento por distrito"</b>.' },
      { p: '¿Cómo genero el informe para la junta directiva?', k: 'informe junta directiva pdf imprimir reporte descargar',
        r: 'Toca <b>📄 Informe para junta directiva</b>, arriba a la derecha de Indicadores de Bodega. Se abre un informe de una página; para guardarlo usa <b>Ctrl+P → Guardar como PDF</b>.' },
      solicitudInterna, inventario, dashboard
    ]);

  // ── Consultor / solo lectura ─────────────────────────────────────────────────────────────
  window.AYUDA_CONTENIDO.reader = perfil('Ayuda · Consulta',
    '¡La paz, {nombre}! 👋 Soy el asistente de ayuda de AsoBodex. Elige una pregunta o escríbeme tu duda.',
    [
      { p: '¿Para qué es mi usuario?', k: 'usuario consultor lectura para que sirve funcion',
        r: 'Para <b>consultar el inventario</b> y <b>pedir material</b> para tu departamento o campaña. No puedes modificar el inventario.' },
      solicitudInterna,
      { p: '¿Cómo sé si mi solicitud fue atendida?', k: 'estado solicitud atendida aprobada respuesta como va',
        r: 'En <b>Solicitud Interna</b>, a la derecha, <b>Mis solicitudes recientes</b> muestra el estado de cada una.' },
      inventario,
      { p: '¿Qué significa "stock bajo" y "material viejo"?', k: 'stock bajo material viejo significa minimo bodega meses alerta',
        r: '<b>Stock bajo:</b> la cantidad está por debajo del mínimo definido. <b>Material viejo:</b> lleva más de 4 meses en bodega.' },
      dashboard
    ]);

  // ── Administrador ────────────────────────────────────────────────────────────────────────
  window.AYUDA_CONTENIDO.admin = perfil('Ayuda · Administrador',
    '¡La paz, {nombre}! 👋 Soy el asistente de ayuda del administrador. Elige una pregunta o escríbeme tu duda.',
    [
      { p: '¿Para qué sirve cada pestaña?', k: 'pestanas menu que hace cada pantallas sirve resumen funciones',
        r: '<ul><li><b>Dashboard / Inventario:</b> estado de la bodega.</li><li><b>Registrar / Despachar:</b> meter y sacar materiales.</li>' +
           '<li><b>Solicitudes:</b> pedidos de los pastores (aprobar, rechazar, enviar).</li><li><b>Distribuciones:</b> resumen de lo entregado por distrito.</li>' +
           '<li><b>Libros:</b> talonarios de diáconos y novedades del auditor.</li><li><b>Pastores:</b> quién está a cargo de cada distrito.</li>' +
           '<li><b>Historial:</b> todos los movimientos, con Excel y PDF.</li><li><b>Indicadores de Bodega:</b> rotación, valor y gastos.</li></ul>' },
      { p: '¿Cómo apruebo un pedido?', k: 'aprobar aprobacion pedido solicitud pastor desmarcar cantidad',
        r: 'En <b>Solicitudes</b> abre el pedido pendiente. Puedes <b>cambiar cantidades</b> y <b>desmarcar</b> lo que no vas a aprobar (con su motivo). Toca <b>Aprobar</b>: al pastor le llega un correo, y si hay materiales con costo, el cobro le aparece al auxiliar con su aviso.' },
      { p: '¿Cómo rechazo un pedido?', k: 'rechazar rechazo pedido motivo no aprobar',
        r: 'Abre el pedido y toca <b>Rechazar</b>. Te pide el motivo (opcional) y se incluye en el correo al pastor.' },
      { p: '¿Cómo marco un pedido como enviado?', k: 'enviado enviar marcar guia foto entregado despachar pedido',
        r: 'Cuando el pedido está <b>aprobado</b> toca <b>📤 Marcar como enviado</b> y adjunta la <b>foto de la guía</b>. Se descuenta el inventario, queda en el <b>Historial</b> con la guía y al pastor le llega un correo.' },
      { p: '¿Quién autoriza las Biblias?', k: 'biblias secretaria autoriza karen decision pedido',
        r: 'Las <b>Biblias</b> las autoriza <b>Secretaría</b>. Tú ves su decisión (autorizada con su cantidad, o rechazada con motivo) dentro del pedido.' },
      { p: '¿Cómo hago un envío ocasional?', k: 'envio ocasional material no pedido guia correo pastor',
        r: 'En <b>Solicitudes</b> toca <b>✉️ Envío ocasional</b>: escribe el nombre o correo del pastor (se autocompleta), agrega los materiales, adjunta la <b>foto de la guía</b> y toca <b>Enviar correo al pastor</b>. Queda en el Historial.' },
      { p: '¿Cómo registro un material nuevo?', k: 'registrar material nuevo agregar stock inventario precio foto minimo',
        r: 'En <b>Registrar</b>: nombre, cantidad, stock mínimo de alerta, departamento, precio de compra (opcional, para Indicadores), foto y notas. Para sumar stock a uno que ya existe, usa las acciones del <b>Inventario</b>.' },
      { p: '¿Cómo despacho materiales?', k: 'despachar despacho sacar materiales entregar costo envio',
        r: 'En <b>Despachar</b>: agrega los materiales a la lista, escribe quién entrega y quién recibe, el costo de envío si quieres y toca <b>✓ Confirmar despacho</b>. Se descuenta del inventario.' },
      { p: '¿Cómo cambio el pastor de un distrito?', k: 'pastores pastor distrito cambiar reasignar correo importar excel',
        r: 'En <b>Pastores</b>: el distrito es lo fijo. Escoge el distrito, escribe el nuevo pastor y correo y guarda; el historial y los cobros del distrito no cambian. También puedes importar la relación desde Excel. Esta lista autocompleta el formulario del pastor y los cobros.' },
      { p: '¿Cómo manejo los libros de diáconos y las novedades?', k: 'libros diaconos novedades auditor importar excel reenviar resolver historial',
        r: 'En <b>Libros</b>: ves el historial de entregas y alertas. Las <b>novedades del auditor</b> salen arriba (y en la pestaña con un número): abre cada una, responde y márcala como resuelta. Para cargar el historial usa <b>📥 Importar historial de libros desde Excel</b>; <b>🔄 Reenviar libro</b> sirve para registrar un reenvío.' },
      { p: '¿Qué es el cobro por distrito?', k: 'cobros distrito correo aviso pastores cobro',
        r: 'El botón <b>📧 Cobros por distrito</b> (en Solicitudes) permite enviar el aviso de cobros de un distrito. Los cobros en sí los lleva el auxiliar en su pantalla.' },
      { p: '¿Cómo saco un reporte del Historial?', k: 'historial reporte excel pdf exportar descargar movimientos filtrar',
        r: 'En <b>Historial</b> busca o filtra por tipo (ingresos, despachos, entregas a pastores, distribuciones, envíos ocasionales) y toca <b>⬇ Excel</b> o <b>⬇ PDF</b>.' },
      { p: 'No me llegan los correos', k: 'correo correos email no llegan no envia prueba cupo limite aviso',
        r: 'En el <b>Dashboard</b> toca <b>Enviar correo de prueba</b>. Si falla, puede que se haya agotado el cupo mensual del servicio de correo, o que el mensaje esté en la carpeta de spam. Los avisos importantes (aprobado, enviado y cobros) siguen saliendo mientras haya cupo.' },
      { p: 'Falló al subir una foto', k: 'foto imagen subir falla error guia material cloudinary',
        r: 'Si la foto de la guía no sube, el pedido se envía igual sin ella y verás un aviso. Intenta de nuevo con una foto más liviana o con mejor conexión.' },
      dashboard, inventario
    ], false);
})();
