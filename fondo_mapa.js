// Fondo y colores de AsoBodex. Detrás de toda la interfaz va un fondo desenfocado y los paneles son de
// "vidrio" (translúcidos). Hay varios temas (se escogen en el botón 🎨 del menú):
//   · Arena (normal): tonos arena y carbón, con cajas de cartón de bodega desenfocadas de fondo.
//   · Cristal / Aurora: fondo con el mapa de la región (bordes, rutas desde Cúcuta y buses).
//   · Océano: el azul oscuro de siempre.
// Todo es decorativo: no lee datos ni se puede tocar. La elección se recuerda en el navegador.
// El mapa del Dashboard (con los datos) es otra cosa y vive en asobodex2.html.
(function () {
  var DARK_CHART = '#bccfdf';
  var TEMAS = {
    arena: { nombre: 'Arena', tipo: 'cajas',
      fondo: 'linear-gradient(180deg,#efe3d2 0%,#e0cfb8 60%,#d4bfa3 100%)',
      linea: '#8a5a1e',
      vars: { '--navy': '#e6d8c6', '--navy2': 'rgba(246,239,229,.62)', '--navy3': 'rgba(255,255,255,.55)', '--navy4': 'rgba(255,255,255,.78)',
              '--t1': '#2b2118', '--t2': '#6a5a4b', '--t3': '#9a8a7a',
              '--teal': '#2b2118', '--teal2': '#4a3a2c', '--teal3': '#5c4a3a', '--teal-light': 'rgba(43,33,24,.08)', '--teal-glow': 'rgba(43,33,24,.25)',
              '--gold': '#c98a2b', '--gold2': '#b27820', '--gold-light': 'rgba(201,138,43,.16)',
              '--bd': 'rgba(80,55,30,.16)', '--bd2': 'rgba(80,55,30,.30)',
              '--green': '#2f7a45', '--green-d': 'rgba(47,122,69,.14)', '--red': '#b3352a', '--red-d': 'rgba(179,53,42,.12)',
              '--amber': '#a8660f', '--amber-d': 'rgba(168,102,15,.14)',
              '--vidrio': 'rgba(246,239,229,.62)', '--vidrio-borde': 'rgba(255,255,255,.85)', '--vidrio-top': 'rgba(246,239,229,.80)',
              '--vidrio-th': 'rgba(43,33,24,.06)', '--vidrio-in': 'rgba(255,255,255,.72)', '--vidrio-modal': 'rgba(248,242,233,.94)', '--vidrio-chip': 'rgba(255,255,255,.62)',
              '--titulo': '#8a5a1e', '--tab-act': '#2b2118', '--tab-act-txt': '#f6efe5', '--rojo-txt': '#b3352a', '--ambar-txt': '#8a5a0c',
              '--ab-main': '#2b2118', '--ab-main2': '#4a3a2c', '--velo-login': 'rgba(230,216,198,.25)', '--chart-txt': '#5a4a3b' } },
    cristal: { nombre: 'Cristal', tipo: 'mapa',
      fondo: 'radial-gradient(ellipse at 20% 15%,#2685aa 0%,transparent 55%),radial-gradient(ellipse at 88% 85%,#17607f 0%,transparent 55%),linear-gradient(160deg,#0e3a58 0%,#092741 55%,#061a2c 100%)',
      linea: '#a6e4f2',
      vars: { '--vidrio': 'rgba(255,255,255,.085)', '--vidrio-borde': 'rgba(255,255,255,.22)', '--vidrio-top': 'rgba(255,255,255,.10)',
              '--vidrio-th': 'rgba(255,255,255,.07)', '--vidrio-in': 'rgba(6,26,46,.48)', '--vidrio-modal': 'rgba(14,42,70,.84)',
              '--t2': '#c4d8e9', '--t3': '#96b6cf', '--titulo': '#a8ecfa', '--tab-act': 'rgba(255,255,255,.22)', '--rojo-txt': '#ffc4bd', '--ambar-txt': '#ffe2a0', '--chart-txt': DARK_CHART } },
    oceano: { nombre: 'Océano', tipo: 'mapa',
      fondo: 'radial-gradient(ellipse at 30% 20%,#12324a 0%,#0b1929 55%,#070f1a 100%)',
      linea: '#5fb8cc',
      vars: { '--vidrio': 'rgba(15,34,54,.50)', '--vidrio-borde': 'rgba(255,255,255,.10)', '--vidrio-top': 'rgba(11,25,41,.50)',
              '--vidrio-th': 'rgba(21,45,71,.45)', '--vidrio-in': 'rgba(21,45,71,.62)', '--vidrio-modal': 'rgba(13,30,48,.86)',
              '--chart-txt': DARK_CHART } },
    aurora: { nombre: 'Aurora', tipo: 'mapa',
      fondo: 'radial-gradient(ellipse at 18% 14%,#6a30b0 0%,transparent 55%),radial-gradient(ellipse at 88% 88%,#128a82 0%,transparent 55%),linear-gradient(160deg,#241a58 0%,#10264d 60%,#071c30 100%)',
      linea: '#d2baff',
      vars: { '--vidrio': 'rgba(255,255,255,.075)', '--vidrio-borde': 'rgba(222,204,255,.24)', '--vidrio-top': 'rgba(255,255,255,.09)',
              '--vidrio-th': 'rgba(255,255,255,.06)', '--vidrio-in': 'rgba(22,14,54,.48)', '--vidrio-modal': 'rgba(28,20,66,.85)',
              '--t2': '#d3cbf2', '--t3': '#a59dcf', '--titulo': '#dccaff', '--tab-act': 'rgba(255,255,255,.20)', '--rojo-txt': '#ffc4cf', '--ambar-txt': '#ffe2a0', '--chart-txt': DARK_CHART } }
  };
  var TEMA_INICIAL = 'arena';
  var elegido = TEMA_INICIAL;      // tema que escogió el usuario (se usa cuando el fondo está encendido)

  var CSS =
    '#fondoMapa{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:var(--fm-bg,#0b1929);color:var(--fm-linea,#5fb8cc);transition:background .4s}' +
    '#fondoMapa svg{position:absolute;inset:0;width:100%;height:100%;opacity:.95}' +
    '#fondoMapa.fm-cajas svg{filter:blur(7px);transform:scale(1.04);opacity:1}' +
    '#fondoMapa .fm-velo{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(7,15,26,0) 0%,rgba(7,15,26,.38) 100%)}' +
    '#fondoMapa.fm-cajas .fm-velo{background:radial-gradient(ellipse at 50% 35%,rgba(255,244,225,.30) 0%,rgba(120,90,60,.22) 100%)}' +
    '.fm-ruta{fill:none;stroke:#2dd4a8;stroke-opacity:.38;stroke-linecap:round;animation:fmFlujo 3.2s linear infinite}' +
    '@keyframes fmFlujo{to{stroke-dashoffset:-40}}' +
    '@media (prefers-reduced-motion:reduce){.fm-ruta{animation:none}}' +
    'body.sin-fondo #fondoMapa{display:none}';

  var timer = null, ultimo = '', clavesAplicadas = [];

  function apagado() { return document.body.classList.contains('sin-fondo'); }
  // Con el fondo apagado se usan los colores de siempre (tema "oceano" sin fondo); encendido, el que se escogió.
  function actualizarAspecto() { aplicarTema(apagado() ? 'oceano' : elegido); }

  function aplicarTema(t) {
    var T = TEMAS[t] || TEMAS[TEMA_INICIAL];
    var id = TEMAS[t] ? t : TEMA_INICIAL;
    var b = document.body, s = b.style;
    clavesAplicadas.forEach(function (k) { s.removeProperty(k); });      // quita lo del tema anterior
    clavesAplicadas = ['--fm-bg', '--fm-linea'];
    s.setProperty('--fm-bg', T.fondo);
    s.setProperty('--fm-linea', T.linea);
    Object.keys(T.vars).forEach(function (k) { s.setProperty(k, T.vars[k]); clavesAplicadas.push(k); });
    Object.keys(TEMAS).forEach(function (k) { b.classList.remove('tema-' + k); });
    b.classList.add('tema-' + id);
    var cont = document.getElementById('fondoMapa');
    if (cont) cont.classList.toggle('fm-cajas', T.tipo === 'cajas');
  }

  // Cajas de cartón de bodega, apiladas (dibujo; se desenfoca por CSS).
  function cajasSVG() {
    var tonos = ['#cfae83', '#c9a679', '#d9bb90', '#c4a070', '#d4b58a'];
    var cajas = [
      [40, 560, 270, 210, 0], [70, 380, 230, 180, 2], [110, 250, 150, 130, 1],
      [360, 620, 210, 150, 3], [385, 490, 170, 130, 4],
      [620, 610, 140, 150, 1], [775, 630, 150, 130, 0], [665, 500, 200, 110, 2],
      [1000, 560, 250, 210, 4], [1025, 420, 205, 140, 3], [1290, 650, 190, 120, 0],
      [1330, 470, 240, 180, 2], [1370, 330, 170, 140, 1], [520, 330, 120, 100, 3], [900, 330, 130, 110, 0]
    ];
    var s = '<rect x="0" y="770" width="1600" height="130" fill="#c8b293" opacity=".55"/>';
    [300, 960, 1250].forEach(function (x) { s += '<rect x="' + x + '" y="120" width="16" height="650" fill="#a98a5e" opacity=".35"/>'; });
    [220, 420, 620].forEach(function (y) { s += '<rect x="0" y="' + y + '" width="1600" height="14" fill="#a98a5e" opacity=".28"/>'; });
    s += '<rect x="610" y="758" width="330" height="24" fill="#a98557" opacity=".7"/>';
    cajas.forEach(function (c) {
      var x = c[0], y = c[1], w = c[2], h = c[3], t = tonos[c[4]];
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" fill="' + t + '"/>' +
           '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + Math.round(h * 0.14) + '" fill="#b3905f" opacity=".75"/>' +
           '<rect x="' + (x + w / 2 - w * 0.05) + '" y="' + y + '" width="' + Math.round(w * 0.1) + '" height="' + h + '" fill="#ecdcb8" opacity=".75"/>' +
           '<rect x="' + (x + w * 0.66) + '" y="' + (y + h * 0.58) + '" width="' + Math.round(w * 0.24) + '" height="' + Math.round(h * 0.22) + '" rx="3" fill="#f7f0e4" opacity=".85"/>';
    });
    return '<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + s + '</svg><div class="fm-velo"></div>';
  }

  function construir() {
    var cont = document.getElementById('fondoMapa');
    var ZE = window.ZONAS_ENVIO;
    if (!cont) return;
    var T = TEMAS[apagado() ? 'oceano' : elegido];
    var vw = window.innerWidth || 1000, vh = window.innerHeight || 700;
    if (T.tipo === 'cajas') {
      if (ultimo !== 'cajas') { cont.innerHTML = cajasSVG(); ultimo = 'cajas'; }
      return;
    }
    if (!ZE || !ZE.geo) return;
    var G = ZE.geo, O = G.origenLL;
    var P = function (ll) { return [(ll[0] - O[0]) * 99, (O[1] - ll[1]) * 100]; };
    var f = function (n) { return n.toFixed(2); };
    var firma = 'mapa' + Math.round(vw / 40) + 'x' + Math.round(vh / 40);
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
      var off = false;
      try {
        off = localStorage.getItem('abx_fondo3') === 'off';          // por defecto encendido
        var g = localStorage.getItem('abx_tema3');
        if (g && TEMAS[g]) elegido = g;
      } catch (e) {}
      if (off) document.body.classList.add('sin-fondo');
      actualizarAspecto();
      ultimo = '';
      construir();
      window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(construir, 350); });
    },
    // Enciende o apaga el fondo (y recuerda la elección en este navegador).
    alternar: function () {
      var off = document.body.classList.toggle('sin-fondo');
      try { localStorage.setItem('abx_fondo3', off ? 'off' : 'on'); } catch (e) {}
      actualizarAspecto();
      if (!off) { ultimo = ''; construir(); }
      return !off;
    },
    encendido: function () { return !apagado(); },
    // Escoge el tema, lo recuerda y, si el fondo estaba apagado, lo enciende para que se vea.
    tema: function (t) {
      if (!TEMAS[t]) return elegido;
      elegido = t;
      try { localStorage.setItem('abx_tema3', elegido); } catch (e) {}
      if (apagado()) {
        document.body.classList.remove('sin-fondo');
        try { localStorage.setItem('abx_fondo3', 'on'); } catch (e) {}
      }
      actualizarAspecto();
      ultimo = '';
      construir();
      return elegido;
    },
    temaActual: function () { return apagado() ? '' : elegido; },
    temas: function () { return Object.keys(TEMAS).map(function (k) { return { id: k, nombre: TEMAS[k].nombre, fondo: TEMAS[k].fondo }; }); }
  };
})();
