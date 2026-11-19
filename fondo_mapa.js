// Fondo animado de AsoBodex: el mapa de la región (bordes de departamento, rutas desde la bodega de
// Cúcuta y buses que van y vienen), detrás de toda la interfaz. Los paneles son translúcidos (efecto
// "vidrio") y dejan ver este fondo. Es solo decorativo: no lee datos ni se puede tocar.
// Usa las coordenadas y contornos de zonas_envio.js. Con el botón 🎨 del menú se apaga el fondo o se
// cambia el color (tema); la elección se recuerda en el navegador.
(function () {
  // Temas: colores del fondo y del vidrio. Todo se aplica como variables CSS en <body>.
  var TEMAS = {
    cristal: { nombre: 'Cristal',
      fondo: 'radial-gradient(ellipse at 20% 15%,#2f95bb 0%,transparent 55%),radial-gradient(ellipse at 88% 85%,#1c6585 0%,transparent 55%),linear-gradient(160deg,#10405f 0%,#0a2a46 55%,#071c30 100%)',
      linea: '#a6e4f2',
      vars: { '--vidrio': 'rgba(255,255,255,.085)', '--vidrio-borde': 'rgba(255,255,255,.22)', '--vidrio-top': 'rgba(255,255,255,.10)',
              '--vidrio-th': 'rgba(255,255,255,.07)', '--vidrio-in': 'rgba(6,26,46,.48)', '--vidrio-modal': 'rgba(14,42,70,.84)',
              '--t2': '#bcd3e6', '--t3': '#8fb1cb', '--titulo': '#8fe0f0' } },
    oceano: { nombre: 'Océano',
      fondo: 'radial-gradient(ellipse at 30% 20%,#12324a 0%,#0b1929 55%,#070f1a 100%)',
      linea: '#5fb8cc',
      vars: { '--vidrio': 'rgba(15,34,54,.50)', '--vidrio-borde': 'rgba(255,255,255,.10)', '--vidrio-top': 'rgba(11,25,41,.50)',
              '--vidrio-th': 'rgba(21,45,71,.45)', '--vidrio-in': 'rgba(21,45,71,.62)', '--vidrio-modal': 'rgba(13,30,48,.86)',
              '--t2': '#8BA8C4', '--t3': '#4d6a85', '--titulo': '#3A8FA3' } },
    aurora: { nombre: 'Aurora',
      fondo: 'radial-gradient(ellipse at 18% 14%,#6a30b0 0%,transparent 55%),radial-gradient(ellipse at 88% 88%,#128a82 0%,transparent 55%),linear-gradient(160deg,#241a58 0%,#10264d 60%,#071c30 100%)',
      linea: '#d2baff',
      vars: { '--vidrio': 'rgba(255,255,255,.075)', '--vidrio-borde': 'rgba(222,204,255,.24)', '--vidrio-top': 'rgba(255,255,255,.09)',
              '--vidrio-th': 'rgba(255,255,255,.06)', '--vidrio-in': 'rgba(22,14,54,.48)', '--vidrio-modal': 'rgba(28,20,66,.85)',
              '--t2': '#cdc4ee', '--t3': '#9d93c9', '--titulo': '#cbb6ff' } }
  };
  var TEMA_INICIAL = 'cristal';
  var temaActual = TEMA_INICIAL;

  var CSS =
    '#fondoMapa{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:var(--fm-bg,#0b1929);color:var(--fm-linea,#5fb8cc);transition:background .4s}' +
    '#fondoMapa svg{position:absolute;inset:0;width:100%;height:100%;opacity:.95}' +
    '#fondoMapa .fm-velo{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(7,15,26,0) 0%,rgba(7,15,26,.38) 100%)}' +
    '.fm-ruta{fill:none;stroke:#2dd4a8;stroke-opacity:.38;stroke-linecap:round;animation:fmFlujo 3.2s linear infinite}' +
    '@keyframes fmFlujo{to{stroke-dashoffset:-40}}' +
    '@media (prefers-reduced-motion:reduce){.fm-ruta{animation:none}}' +
    'body.sin-fondo #fondoMapa{display:none}';

  var timer = null, ultimo = '';

  function aplicarTema(t) {
    var T = TEMAS[t] || TEMAS[TEMA_INICIAL];
    temaActual = TEMAS[t] ? t : TEMA_INICIAL;
    var s = document.body.style;
    s.setProperty('--fm-bg', T.fondo);
    s.setProperty('--fm-linea', T.linea);
    Object.keys(T.vars).forEach(function (k) { s.setProperty(k, T.vars[k]); });
  }

  function construir() {
    var cont = document.getElementById('fondoMapa');
    var ZE = window.ZONAS_ENVIO;
    if (!cont || !ZE || !ZE.geo) return;
    var G = ZE.geo, O = G.origenLL;
    var P = function (ll) { return [(ll[0] - O[0]) * 99, (O[1] - ll[1]) * 100]; };
    var f = function (n) { return n.toFixed(2); };
    var vw = window.innerWidth || 1000, vh = window.innerHeight || 700;
    var firma = Math.round(vw / 40) + 'x' + Math.round(vh / 40);
    if (firma === ultimo && cont.querySelector('svg')) return;     // no se redibuja por cambios mínimos
    ultimo = firma;
    var vertical = vh > vw * 1.1;

    // Encuadre: en horizontal, toda la región (Norte de Santander + Arauca); en vertical, Norte de Santander.
    var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    var abarcar = function (q) { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); };
    var contorno = function (n, fn) { (G.contornos[n] || []).forEach(function (r) { r.forEach(function (p) { fn(P(p)); }); }); };
    if (vertical) { contorno('NORTE DE SANTANDER', abarcar); }
    else { contorno('NORTE DE SANTANDER', abarcar); contorno('ARAUCA', abarcar); abarcar(P(G.ll['Puerto Carreño'] || [-67.5, 6.2])); }
    var w0 = (x1 - x0) * 1.12, h0 = (y1 - y0) * 1.12;
    var asp = vw / vh, w, h;
    if (w0 / h0 < asp) { h = h0; w = h * asp; } else { w = w0; h = w / asp; }
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    var vx = cx - w / 2, vy = cy - h / 2, k = w / vw;       // k = unidades del mapa por píxel de pantalla

    var trazo = function (n) {
      return (G.contornos[n] || []).map(function (r) {
        return 'M' + r.map(function (p) { var q = P(p); return f(q[0]) + ',' + f(q[1]); }).join('L') + 'Z';
      }).join(' ');
    };
    var cont2 = '';
    ['BOYACA', 'VICHADA', 'ARAUCA', 'NORTE DE SANTANDER'].forEach(function (n) {
      var d = trazo(n);
      if (!d) return;
      cont2 += '<path d="' + d + '" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-opacity=".14" stroke-width="' + f(10 * k) + '" stroke-linejoin="round"/>' +
               '<path d="' + d + '" fill="none" stroke="currentColor" stroke-opacity=".75" stroke-width="' + f(1.5 * k) + '" stroke-linejoin="round"/>';
    });

    var rutas = '', buses = '', puntos = '';
    var i = 0;
    ZE.zonas.forEach(function (z) {
      var ll = G.ll[z.nombre];
      if (!ll) return;
      var p = P(ll);
      if (Math.abs(p[0]) < 5 && Math.abs(p[1]) < 5) return;          // Cúcuta: es la propia bodega
      var len = Math.sqrt(p[0] * p[0] + p[1] * p[1]) || 1;
      var nx = -p[1] / len, ny = p[0] / len;
      if (ny > 0) { nx = -nx; ny = -ny; }
      var qx = p[0] / 2 + nx * len * 0.2, qy = p[1] / 2 + ny * len * 0.2;
      var id = 'fmR' + i;
      rutas += '<path id="' + id + '" class="fm-ruta" stroke-width="' + f(1.7 * k) + '" stroke-dasharray="' + f(3 * k) + ' ' + f(8 * k) + '" d="M0,0 Q' + f(qx) + ',' + f(qy) + ' ' + f(p[0]) + ',' + f(p[1]) + '"/>';
      puntos += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + f(4.2 * k) + '" fill="#2dd4a8" fill-opacity=".75"/>';
      var dur = Math.max(12, Math.min(26, (len / k) / 45));        // viaje lento y tranquilo (~45 px/s)
      var begin = ((i * 1.7) % 11).toFixed(1) + 's';
      buses += '<g opacity="0"><animateMotion dur="' + dur.toFixed(1) + 's" begin="' + begin + '" repeatCount="indefinite" rotate="auto"><mpath href="#' + id + '"/></animateMotion>' +
        '<animate attributeName="opacity" values="0;.9;.9;0" keyTimes="0;.07;.9;1" dur="' + dur.toFixed(1) + 's" begin="' + begin + '" repeatCount="indefinite"/>' +
        ZE.bus(f(k * 0.95)) + '</g>';
      i++;
    });

    var bodega =
      '<circle cx="0" cy="0" r="' + f(10 * k) + '" fill="#1a9aaa" opacity=".4"><animate attributeName="r" values="' + f(10 * k) + ';' + f(34 * k) + '" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;0" dur="3s" repeatCount="indefinite"/></circle>' +
      '<circle cx="0" cy="0" r="' + f(8 * k) + '" fill="#1a9aaa" stroke="#fff" stroke-opacity=".9" stroke-width="' + f(1.4 * k) + '"/>';

    cont.innerHTML =
      '<svg viewBox="' + f(vx) + ' ' + f(vy) + ' ' + f(w) + ' ' + f(h) + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><pattern id="fmPuntos" width="' + f(26 * k) + '" height="' + f(26 * k) + '" patternUnits="userSpaceOnUse"><circle cx="' + f(2 * k) + '" cy="' + f(2 * k) + '" r="' + f(1.1 * k) + '" fill="currentColor" opacity=".32"/></pattern></defs>' +
      '<rect x="' + f(vx) + '" y="' + f(vy) + '" width="' + f(w) + '" height="' + f(h) + '" fill="url(#fmPuntos)"/>' +
      cont2 + rutas + puntos + buses + bodega + '</svg><div class="fm-velo"></div>';
    var svg = cont.querySelector('svg');
    if (svg && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches && svg.pauseAnimations) svg.pauseAnimations();
  }

  window.FondoMapa = {
    iniciar: function () {
      if (!document.getElementById('fmCss')) {
        var st = document.createElement('style');
        st.id = 'fmCss';
        st.textContent = CSS;
        document.head.appendChild(st);
      }
      if (!document.getElementById('fondoMapa')) {
        var d = document.createElement('div');
        d.id = 'fondoMapa';
        d.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(d, document.body.firstChild);
      }
      var guardado = TEMA_INICIAL;
      try {
        if (localStorage.getItem('abx_fondo') === 'off') document.body.classList.add('sin-fondo');
        guardado = localStorage.getItem('abx_tema') || TEMA_INICIAL;
      } catch (e) {}
      aplicarTema(guardado);
      construir();
      window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(construir, 350); });
    },
    // Enciende o apaga el fondo (y recuerda la elección en este navegador).
    alternar: function () {
      var off = document.body.classList.toggle('sin-fondo');
      try { localStorage.setItem('abx_fondo', off ? 'off' : 'on'); } catch (e) {}
      if (!off) { ultimo = ''; construir(); }
      return !off;
    },
    encendido: function () { return !document.body.classList.contains('sin-fondo'); },
    // Cambia el color (tema) y lo recuerda.
    tema: function (t) {
      aplicarTema(t);
      try { localStorage.setItem('abx_tema', temaActual); } catch (e) {}
      return temaActual;
    },
    temaActual: function () { return temaActual; },
    temas: function () { return Object.keys(TEMAS).map(function (k) { return { id: k, nombre: TEMAS[k].nombre, fondo: TEMAS[k].fondo }; }); }
  };
})();
