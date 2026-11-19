// Preguntas y respuestas del chat de ayuda, una lista por perfil. Para cambiar o agregar una
// pregunta basta con editar este archivo:  p = la pregunta que se ve,  k = palabras clave con las que
// el usuario podría buscarla (separadas por espacio),  r = la respuesta (puede llevar <b>, <ol>, <ul>).
window.AYUDA_CONTENIDO = window.AYUDA_CONTENIDO || {};

// ── Formulario de pedidos de los pastores ────────────────────────────────────────────────────
window.AYUDA_CONTENIDO.pastor = {
  titulo: 'Ayuda para tu pedido',
  saludo: '¡La paz, pastor! 👋 Soy el asistente de ayuda del formulario de pedidos. Elige una pregunta o escríbeme tu duda.',
  contacto: {
    email: 'mensajeria@asonoreste.org',
    asunto: 'Ayuda con el formulario de pedidos',
    whatsapp: ''          // ← poner aquí el número del administrador (ej. 573001234567) para activar el botón de WhatsApp
  },
  preguntas: [
    { p: '¿Cómo hago un pedido?',
      k: 'pedido pedir solicitud solicitar hacer paso pasos como empiezo comenzar',
      r: 'Son <b>3 pasos</b>:<ol>' +
         '<li><b>Datos:</b> escribe tu nombre (tu correo y tu distrito se llenan solos) y toca <b>Continuar</b>.</li>' +
         '<li><b>Materiales:</b> toca cada material que necesites, pon la cantidad y toca <b>Revisar pedido</b>.</li>' +
         '<li><b>Confirmar:</b> revisa el resumen y toca <b>Enviar solicitud</b>.</li></ol>' +
         'Al terminar verás la referencia de tu pedido.' },

    { p: '¿Hasta cuándo puedo hacer pedidos?',
      k: 'hora plazo miercoles cuando fecha limite tiempo dias recibe reciben cierre',
      r: 'Los pedidos se reciben <b>hasta el miércoles a las 12:00 PM</b>.' },

    { p: '¿Cómo sé si mi pedido fue aprobado o enviado?',
      k: 'aprobado aprobada enviado enviada correo email aviso avisan notificacion estado seguimiento llega llegada demora',
      r: 'Te avisamos <b>por correo</b> cuando tu solicitud sea <b>aprobada</b> y cuando sea <b>enviada</b>. Por eso es importante que el correo corporativo del formulario sea el tuyo.' +
         '<br><br>Los tiempos de llegada dependen del transporte hacia tu zona; si tienes urgencia, escríbele al administrador.' },

    { p: 'Mi nombre, mi correo o mi distrito no aparece o está mal',
      k: 'nombre correo distrito aparece cambio cambiar cambie error equivocado mal incorrecto autocompleta lleno lista',
      r: 'Al escribir tu nombre, el formulario llena <b>solo</b> tu correo y tu distrito con la información que mantiene la administración.' +
         '<ul><li>Si tu nombre no aparece, escríbelo completo y <b>escoge tu distrito</b> en la lista.</li>' +
         '<li>Si cambiaste de distrito o tu correo está mal, avísale al administrador para que lo actualice.</li></ul>' },

    { p: '¿Cómo pido el Talonario de Diáconos?',
      k: 'talonario talonarios diacono diaconos libro libros iglesia numero foto codigo anterior',
      r: 'Cada libro es <b>para una iglesia</b>:<ol>' +
         '<li>Toca <b>Talonario de Diáconos</b> y pon cuántos libros necesitas.</li>' +
         '<li>Por cada libro escribe el <b>nombre de la iglesia</b> (obligatorio).</li>' +
         '<li>Si lo sabes, escribe el <b>número del talonario anterior</b> (solo el número, sin letras).</li>' +
         '<li>Si lo tienes a la mano, adjunta la <b>foto del talonario anterior</b> ahí mismo — ya no hace falta mandarla por WhatsApp.</li></ol>' },

    { p: '¿Cuántos puedo pedir de cada material?',
      k: 'cantidad cantidades minimo maximo cuantos cuanto limite limites pedir material materiales',
      r: function () {
        var base = 'Cada material tiene un <b>mínimo y un máximo</b>; lo ves debajo de su nombre.';
        if (typeof MATS === 'undefined') return base;
        var filas = MATS.map(function (m) {
          var rango = m.max ? m.min + ' a ' + m.max : (m.tipo === 'libre' ? 'cantidad libre' : 'desde ' + m.min);
          return '<li>' + m.nombre + ': <b>' + rango + '</b></li>';
        }).join('');
        return base + '<ul>' + filas + '</ul>';
      } },

    { p: '¿Qué materiales tienen costo?',
      k: 'costo valor precio cobro cobran pagar pago arqueo caja menor debo deuda resumen cuanto cuesta',
      r: '<b>Arqueo de Caja</b> y <b>Talonario de Caja Menor</b> valen <b>$3.000 c/u</b>.' +
         '<br><br>En el paso 1 ves <b>"Tu resumen de materiales con costo"</b> con lo que tienes pendiente. Es solo informativo: la Asociación descuenta esos valores por remesas.' },

    { p: '¿Cómo pido el Talonario de Fondos Confiados?',
      k: 'fondos confiados talonario iglesia nombre exacto personalizar',
      r: 'Toca <b>Talonario de Fondos Confiados</b>, pon la cantidad y escribe el <b>nombre exacto de la iglesia</b>: el talonario se personaliza con ese nombre.' },

    { p: '¿Las Biblias se aprueban igual?',
      k: 'biblia biblias secretaria autoriza autorizar aprobar cantidad',
      r: 'Las <b>Biblias</b> las revisa y autoriza <b>Secretaría</b> antes de enviarlas, y puede ajustar la cantidad. Puedes pedir de <b>5 a 40</b>.' },

    { p: '¿Puedo pedir un material que no está en la lista?',
      k: 'otro otros material no aparece lista falta nuevo diferente necesito',
      r: 'Sí. En el paso 2, abajo, está <b>"¿Necesitas otro material?"</b>: descríbelo y pon la cantidad aproximada.' },

    { p: '¿Para qué es el mapa de arriba?',
      k: 'mapa ruta bus buses bodega camino viaja viaje recorrido departamento',
      r: 'El mapa muestra <b>la ruta de tu pedido</b>: sale de la <b>Bodega en Cúcuta</b> hacia tu distrito, con el borde del departamento donde queda. Es solo informativo.' },

    { p: 'No me deja continuar al siguiente paso',
      k: 'continuar siguiente paso error boton falta obligatorio no deja no puedo avanza avanzar revisar',
      r: 'Revisa esto:<ul>' +
         '<li><b>Paso 1:</b> tu nombre y tu distrito deben estar llenos.</li>' +
         '<li><b>Paso 2:</b> toca al menos un material (o escribe en "Otro material"), con la cantidad dentro del mínimo y máximo.</li>' +
         '<li>En <b>Talonario de Diáconos</b> y <b>Fondos Confiados</b> hay que poner el nombre de la iglesia.</li></ul>' +
         'El aviso en naranja de arriba te dice qué falta.' },

    { p: '¿Puedo cambiar o cancelar un pedido ya enviado?',
      k: 'cambiar cancelar modificar editar corregir equivoque error enviado anular borrar',
      r: 'Desde este formulario <b>no se puede editar</b> un pedido que ya enviaste. Escríbele al administrador lo antes posible para que lo tenga en cuenta antes de aprobarlo.' }
  ]
};
