// Chat de ayuda de AsoBodex (compartido por el formulario de pastores y por el sistema de bodega).
//
// No usa inteligencia artificial ni ningún servicio externo: cada perfil tiene una lista de
// preguntas con su respuesta ya escrita (ver ayuda_contenido.js). El usuario toca una pregunta o
// escribe la suya y el bot busca la pregunta que más se parece. Nada de lo que escribe sale del
// navegador.
//
// Uso:  AyudaBot.iniciar({ perfil:'pastor', titulo:'Ayuda', saludo:'...', preguntas:[...], contacto:{...} })
//   preguntas: [{ p:'¿Pregunta?', k:'palabras clave separadas por espacio', r:'respuesta HTML' | function(){ return html } }]
//   contacto:  { email:'', asunto:'', whatsapp:'573001234567' }  (cualquiera de los dos; opcional)
(function () {
  var CSS =
    '.ab-fab{position:fixed;right:14px;bottom:14px;z-index:9990;display:flex;align-items:center;gap:7px;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:700;color:#fff;padding:11px 16px 11px 13px;border-radius:30px;background:linear-gradient(135deg,#1a9aaa,#2a6f80);box-shadow:0 6px 20px rgba(0,0,0,.4),0 0 0 3px rgba(26,154,170,.25);transition:transform .15s}' +
    '.ab-fab:hover{transform:translateY(-2px)}.ab-fab .ab-i{font-size:19px;line-height:1}' +
    '.ab-panel{position:fixed;right:14px;bottom:70px;z-index:9991;width:370px;max-width:calc(100vw - 20px);height:min(560px,calc(100vh - 100px));display:none;flex-direction:column;background:var(--navy2,#0f2b3c);border:1px solid var(--bd,rgba(58,143,163,.3));border-radius:18px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.55);font-family:inherit;color:var(--t1,#e8edf3)}' +
    '.ab-panel.ab-open{display:flex;animation:abSube .22s ease both}' +
    '@keyframes abSube{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}' +
    '.ab-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,#1a9aaa,#2a6f80);color:#fff}' +
    '.ab-head .ab-av{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:18px}' +
    '.ab-head .ab-t{font-size:14px;font-weight:800;line-height:1.2}.ab-head .ab-s{font-size:11px;opacity:.85}' +
    '.ab-head button{margin-left:auto;border:none;background:rgba(255,255,255,.18);color:#fff;width:30px;height:30px;border-radius:50%;font-size:16px;cursor:pointer}' +
    '.ab-log{flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth}' +
    '.ab-m{max-width:88%;padding:9px 12px;border-radius:14px;font-size:13px;line-height:1.5;animation:abSube .2s ease both;word-wrap:break-word}' +
    '.ab-m.bot{align-self:flex-start;background:var(--navy3,#14364a);border:1px solid var(--bd,rgba(58,143,163,.25));border-bottom-left-radius:4px}' +
    '.ab-m.yo{align-self:flex-end;background:#1a9aaa;color:#fff;border-bottom-right-radius:4px}' +
    '.ab-m b{color:var(--teal,#3A8FA3)}.ab-m.yo b{color:#fff}' +
    '.ab-m ol,.ab-m ul{margin:6px 0 2px 18px;padding:0}.ab-m li{margin:3px 0}' +
    '.ab-q{display:block;width:100%;text-align:left;font-family:inherit;font-size:12.5px;color:var(--t1,#e8edf3);background:rgba(26,154,170,.1);border:1px solid var(--bd,rgba(58,143,163,.3));border-radius:10px;padding:8px 10px;margin-top:6px;cursor:pointer;transition:background .15s}' +
    '.ab-q:hover{background:rgba(26,154,170,.22)}' +
    '.ab-acc{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}' +
    '.ab-acc a,.ab-acc button{font-family:inherit;font-size:11.5px;font-weight:600;text-decoration:none;color:var(--teal,#3A8FA3);background:transparent;border:1px solid var(--bd,rgba(58,143,163,.4));border-radius:20px;padding:5px 11px;cursor:pointer}' +
    '.ab-acc a:hover,.ab-acc button:hover{background:rgba(26,154,170,.15)}' +
    '.ab-pie{display:flex;gap:8px;padding:10px;border-top:1px solid var(--bd,rgba(58,143,163,.25));background:rgba(0,0,0,.12)}' +
    '.ab-pie input{flex:1;min-width:0;font-family:inherit;font-size:13px;color:var(--t1,#e8edf3);background:var(--navy3,#14364a);border:1px solid var(--bd,rgba(58,143,163,.3));border-radius:20px;padding:9px 14px;outline:none}' +
    '.ab-pie input:focus{border-color:#1a9aaa}' +
    '.ab-pie button{border:none;background:#1a9aaa;color:#fff;width:38px;height:38px;border-radius:50%;font-size:16px;cursor:pointer;flex-shrink:0}' +
    '.ab-esc{display:inline-flex;gap:4px;padding:2px 0}.ab-esc i{width:6px;height:6px;border-radius:50%;background:var(--t2,#8899aa);animation:abPunto 1s infinite}.ab-esc i:nth-child(2){animation-delay:.15s}.ab-esc i:nth-child(3){animation-delay:.3s}' +
    '@keyframes abPunto{0%,60%,100%{opacity:.25}30%{opacity:1}}' +
    '@media(max-width:480px){.ab-panel{right:8px;left:8px;width:auto;max-width:none;bottom:66px;height:min(78vh,calc(100vh - 90px))}.ab-fab .ab-txt{display:none}.ab-fab{padding:13px}}';

  var STOP = ' de la el los las un una unos unas que como cual cuales cuando donde porque para por con sin sobre del al se lo le les mi mis tu tus su sus es son ser esta este estos estas eso esa ese y o u a en me te hay puedo puede pueden hago hacer quiero quisiera necesito saber favor ayuda ayudame ';
  var norm = function (s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ\s]/g, ' ').replace(/\s+/g, ' ').trim();
  };
  var tokens = function (s) {
    return norm(s).split(' ').filter(function (t) { return t.length > 1 && STOP.indexOf(' ' + t + ' ') === -1; });
  };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  var cfg = null, panel, log, input, fab;

  // Busca la pregunta que más se parece a lo escrito. Coincide por palabra completa o por prefijo (≥4 letras).
  function buscar(texto) {
    var q = tokens(texto);
    if (!q.length) return null;
    var mejor = null, mejorPts = 0;
    cfg.preguntas.forEach(function (it) {
      var claves = tokens(it.k || '');
      var tp = tokens(it.p);
      var pts = 0;
      q.forEach(function (t) {
        var hit = 0;
        claves.forEach(function (c) {
          if (c === t) hit = Math.max(hit, 3);
          else if (t.length >= 4 && c.length >= 4 && (c.indexOf(t) === 0 || t.indexOf(c) === 0)) hit = Math.max(hit, 2);
        });
        tp.forEach(function (c) {
          if (c === t) hit = Math.max(hit, 2);
          else if (t.length >= 4 && c.length >= 4 && (c.indexOf(t) === 0 || t.indexOf(c) === 0)) hit = Math.max(hit, 1);
        });
        pts += hit;
      });
      if (pts > mejorPts) { mejorPts = pts; mejor = it; }
    });
    return mejorPts >= 2 ? mejor : null;
  }

  function burbuja(clase, html) {
    var d = document.createElement('div');
    d.className = 'ab-m ' + clase;
    d.innerHTML = html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }
  function escribiendo(luego) {
    var d = burbuja('bot', '<span class="ab-esc"><i></i><i></i><i></i></span>');
    setTimeout(function () { d.parentNode && d.parentNode.removeChild(d); luego(); }, 420);
  }
  function listaPreguntas(intro) {
    var html = intro || 'Elige una pregunta:';
    cfg.preguntas.forEach(function (it, i) {
      html += '<button type="button" class="ab-q" data-i="' + i + '">' + esc(it.p) + '</button>';
    });
    var d = burbuja('bot', html);
    d.querySelectorAll('.ab-q').forEach(function (b) { b.onclick = function () { preguntar(parseInt(b.getAttribute('data-i'), 10)); }; });
  }
  function accesos() {
    var h = '<div class="ab-acc"><button type="button" data-a="lista">☰ Ver todas las preguntas</button>';
    var c = cfg.contacto || {};
    if (c.whatsapp) h += '<a target="_blank" rel="noopener" href="https://wa.me/' + c.whatsapp + '?text=' + encodeURIComponent(c.mensaje || 'Hola, tengo una duda con AsoBodex') + '">💬 Escribir por WhatsApp</a>';
    if (c.email) h += '<a href="mailto:' + c.email + '?subject=' + encodeURIComponent(c.asunto || 'Ayuda AsoBodex') + '">✉️ Escribir al administrador</a>';
    h += '</div>';
    var d = burbuja('bot', h);
    var b = d.querySelector('[data-a="lista"]');
    b.onclick = function () { listaPreguntas('Estas son las preguntas disponibles:'); };
  }
  function responder(it) {
    var r = typeof it.r === 'function' ? it.r() : it.r;
    escribiendo(function () {
      var b = burbuja('bot', r);
      accesos();
      // Si la respuesta es larga, se deja el chat al inicio de la respuesta (no al final).
      if (b.offsetHeight > log.clientHeight * 0.6) log.scrollTop = b.offsetTop - 10;
    });
  }
  function preguntar(i) {
    var it = cfg.preguntas[i];
    burbuja('yo', esc(it.p));
    responder(it);
  }
  function enviarTexto() {
    var t = input.value.trim();
    if (!t) return;
    input.value = '';
    burbuja('yo', esc(t));
    var n = norm(t);
    if (/^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|ola)\b/.test(n) && tokens(t).length <= 1) {
      escribiendo(function () { burbuja('bot', '¡Hola! 👋 Cuéntame qué necesitas, o elige una de las preguntas.'); listaPreguntas('Preguntas frecuentes:'); });
      return;
    }
    if (/^(gracias|muchas gracias|listo|ok|vale|perfecto)\b/.test(n)) {
      escribiendo(function () { burbuja('bot', '¡Con gusto! 🙌 Si necesitas algo más, aquí estoy.'); });
      return;
    }
    var it = buscar(t);
    if (it) { responder(it); return; }
    escribiendo(function () {
      burbuja('bot', 'No encontré una respuesta exacta para eso 🤔. Prueba con otras palabras o elige una de estas preguntas:');
      listaPreguntas('');
      accesos();
    });
  }

  function abrir() {
    panel.classList.add('ab-open');
    fab.style.display = 'none';
    setTimeout(function () { input.focus(); }, 200);
  }
  function cerrar() {
    panel.classList.remove('ab-open');
    fab.style.display = '';
  }

  window.AyudaBot = {
    iniciar: function (c) {
      cfg = c;
      if (document.getElementById('abPanel')) { document.getElementById('abPanel').remove(); document.getElementById('abFab').remove(); }
      if (!document.getElementById('abCss')) {
        var st = document.createElement('style');
        st.id = 'abCss';
        st.textContent = CSS;
        document.head.appendChild(st);
      }
      fab = document.createElement('button');
      fab.id = 'abFab';
      fab.className = 'ab-fab';
      fab.type = 'button';
      fab.setAttribute('aria-label', 'Abrir la ayuda');
      fab.innerHTML = '<span class="ab-i">💬</span><span class="ab-txt">Ayuda</span>';
      fab.onclick = abrir;
      panel = document.createElement('div');
      panel.id = 'abPanel';
      panel.className = 'ab-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-label', c.titulo || 'Ayuda');
      panel.innerHTML =
        '<div class="ab-head"><div class="ab-av">🤝</div><div><div class="ab-t">' + esc(c.titulo || 'Ayuda') + '</div><div class="ab-s">Respuestas rápidas</div></div><button type="button" aria-label="Cerrar">✕</button></div>' +
        '<div class="ab-log"></div>' +
        '<div class="ab-pie"><input type="text" placeholder="Escribe tu duda…" maxlength="120" aria-label="Escribe tu duda"><button type="button" aria-label="Enviar">➤</button></div>';
      document.body.appendChild(panel);
      document.body.appendChild(fab);
      log = panel.querySelector('.ab-log');
      input = panel.querySelector('input');
      panel.querySelector('.ab-head button').onclick = cerrar;
      panel.querySelector('.ab-pie button').onclick = enviarTexto;
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') enviarTexto(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('ab-open')) cerrar(); });
      burbuja('bot', c.saludo || '¡Hola! 👋 Soy el asistente de ayuda. Elige una pregunta o escribe tu duda.');
      listaPreguntas('Preguntas frecuentes:');
    },
    abrir: function () { if (panel) abrir(); },
    cerrar: function () { if (panel) cerrar(); },
    // Para pruebas: devuelve la pregunta que el bot elegiría para un texto.
    _buscar: function (t) { var it = buscar(t); return it ? it.p : null; }
  };
})();
