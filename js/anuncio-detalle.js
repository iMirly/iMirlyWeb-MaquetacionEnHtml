console.log('Anuncio detalle JS cargado');

document.addEventListener('DOMContentLoaded', () => {

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    console.warn('No hay ID de anuncio');
    return;
  }

  const btnVolver = document.querySelector('.btn-volver');
  if (btnVolver) btnVolver.addEventListener('click', () => history.back());

  // ===================================================
  // BOTN FAVORITOS
  // ===================================================

  const btnFav = document.querySelector('.btn-favorito');
  const anuncioId = id; // el id que lees de la URL

  if (btnFav) {

    // Estado inicial
    if (esFavorito(anuncioId)) {
      btnFav.classList.add('activo');
      btnFav.textContent = '♥';
    }

    btnFav.addEventListener('click', () => {
      toggleFavorito(anuncioId);

      if (esFavorito(anuncioId)) {
        btnFav.classList.add('activo');
        btnFav.textContent = '♥';
      } else {
        btnFav.classList.remove('activo');
        btnFav.textContent = '♡';
      }
    });
  }


  // ===========================
  // CARGAR ANUNCIO (mock + user)
  // ===========================
  Promise.all([
    fetch('data/anuncios_mock.json').then(r => r.json()).catch(() => []),
    Promise.resolve(JSON.parse(localStorage.getItem('anuncios') || '[]')),
    fetch('data/formularios.json').then(r => r.json())
  ])
    .then(([mock, user, formularios]) => {

      const anuncios = [...mock, ...user];
      const anuncio = anuncios.find(a => String(a.id) === String(id));

      if (!anuncio) {
        console.warn('Anuncio no encontrado');
        return;
      }

      pintarCabecera(anuncio);
      pintarDescripcion(anuncio);
      pintarPrecio(anuncio);
      pintarCampos(anuncio, formularios);
    });
});

// ===================================================
// PINTAR PARTES
// ===================================================
function pintarCabecera(anuncio) {
  document.getElementById('detalle-nombre').textContent =
    anuncio.nombre || 'Isabel';

  document.getElementById('detalle-sub').textContent =
    formatearTitulo(anuncio.subcategoria);
}

function pintarDescripcion(anuncio) {
  document.getElementById('detalle-descripcion').textContent =
    anuncio.descripcion || '';
}

function pintarPrecio(anuncio) {
  const d = anuncio.detalles || {};

  let texto = '—';
  let sub = '';

  if (d.precio_hora) {
    texto = `${d.precio_hora}€`;
    sub = 'por hora';
  } else if (d.precio_sesion) {
    texto = `${d.precio_sesion}€`;
    sub = 'por sesión';
  } else if (d.precio_servicio) {
    texto = `${d.precio_servicio}€`;
    sub = 'por servicio';
  }

  document.getElementById('detalle-precio').textContent = texto;
  document.getElementById('detalle-precio-sub').textContent = sub;
}

// ===================================================
// CAMPOS DINÁMICOS (FORMULARIOS.JSON)
// ===================================================
function pintarCampos(anuncio, formularios) {

  const contenedor = document.getElementById('detalle-campos');
  contenedor.innerHTML = '';

  const { categoria, subcategoria, detalles } = anuncio;

  const formulario =
    formularios?.[categoria]?.[subcategoria];

  if (!formulario) {
    console.warn('Formulario no encontrado');
    return;
  }

  formulario.campos.forEach(campo => {

    const valor = detalles?.[campo.id];
    if (valor === undefined) return;

    const fila = document.createElement('div');
    fila.className = 'detalle-fila';

    const label = document.createElement('span');
    label.className = 'detalle-label';
    label.textContent = campo.label;

    const value = document.createElement('span');
    value.className = 'detalle-valor';

    // tipo de campo
    if (campo.tipo === 'boolean') {
      value.textContent = valor ? 'Sí' : 'No';
    }
    else if (Array.isArray(valor)) {
      value.textContent = valor.join(', ');
    }
    else {
      value.textContent = valor;
    }

    fila.appendChild(label);
    fila.appendChild(value);
    contenedor.appendChild(fila);
  });
}

// ===================================================
// HELPERS
// ===================================================
function formatearTitulo(txt) {
  return txt
    ?.replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase()) || '';

}

