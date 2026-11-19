// Zonas de destino de los envíos de AsoBodex (compartido por el panel del auditor y por el
// formulario de los pastores, para que el mapa se vea igual en los dos).
//
// Es un mapa ESQUEMÁTICO (no a escala): la bodega en Cúcuta y una "zona" por destino, puestas
// más o menos como en la realidad (Ocaña al occidente, Tibú al norte, Arauca al oriente...).
// Cada zona agrupa los distritos que le tocan. Las posiciones xy están en un lienzo de 1000 x 470.
//
// Si un distrito está en otra zona, basta con moverlo de lista aquí — se actualiza en los dos sitios.
// Los distritos de ubicación dudosa (se asignaron según su lugar en la lista de distritos del
// sistema): VIÑA DEL SEÑOR, LIBERTAD, PANAMA, PALESTINA, NUEVO CARANAL, LA ESMERALDA, LA HERMOSA.
window.ZONAS_ENVIO = {
  origen: { nombre: 'Bodega · Cúcuta', xy: [300, 262] },
  zonas: [
    { nombre: 'Ocaña',                xy: [70, 130],  distritos: ['OCAÑA CENTRAL', 'OCAÑA NORTE'] },
    { nombre: 'El Tarra',             xy: [175, 72],  distritos: ['EL TARRA'] },
    { nombre: 'Tibú',                 xy: [320, 45],  distritos: ['TIBU'] },
    { nombre: 'Arboledas',            xy: [150, 222], distritos: ['ARBOLEDAS'] },
    { nombre: 'Pamplona',             xy: [105, 345], distritos: ['PAMPLONA'] },
    { nombre: 'Chinácota',            xy: [240, 360], distritos: ['CHINACOTA'] },
    { nombre: 'Cúcuta y alrededores', xy: [400, 190], distritos: ['CUCUTA CENTRAL', 'RENACER', 'SION', 'ATALAYA', 'ZULIA', 'VIÑA DEL SEÑOR', 'CUCUTA OCCIDENTE', 'LIBERTAD', 'GETSEMANI', 'EDEN', 'PATIOS'] },
    { nombre: 'Cubará',               xy: [480, 385], distritos: ['CUBARA'] },
    { nombre: 'Saravena',             xy: [580, 285], distritos: ['CENTRAL SARAVENA', 'REDENCION', 'PALESTINA', 'BETHEL', 'MARANATHA'] },
    { nombre: 'Fortul',               xy: [610, 360], distritos: ['FORTUL', 'NUEVO CARANAL'] },
    { nombre: 'Arauquita',            xy: [680, 232], distritos: ['ARAUQUITA', 'LA ESMERALDA', 'PUERTO JORDAN', 'LA HERMOSA'] },
    { nombre: 'Arauca',               xy: [790, 150], distritos: ['CENTRAL ARAUCA', 'BETANIA', 'PANAMA'] },
    { nombre: 'Tame',                 xy: [710, 420], distritos: ['TAME CENTRAL', 'TAME ORIENTAL'] },
    { nombre: 'Puerto Carreño',       xy: [935, 262], distritos: ['PUERTO CARREÑO'] },
    { nombre: 'Vichada',              xy: [890, 395], distritos: ['VICHADA'] }
  ],
  otros: { nombre: 'Otros destinos', xy: [930, 55] },
  // Versión vertical (celular): se gira el mapa para que el oriente quede hacia abajo y entre
  // completo en una pantalla angosta (lienzo de 420 x 700).
  vertical: function (xy) { return [(470 - xy[1]) * 0.8 + 30, xy[0] * 0.68 + 30]; }
};
