console.log('Favoritos JS cargado');

document.addEventListener('DOMContentLoaded', () => {

  const lista = document.getElementById('lista-anuncios');
  const empty = document.getElementById('empty-state');

  if (!lista) return;

  // ===========================
  // 1) LEER FAVORITOS
  // ===========================
  const favoritos = getFavoritos(); // viene de app.js

  if (favoritos.length === 0) {
    empty?.classList.remove('hidden');
    return;
  }

  // ===========================
  // 2) CARGAR ANUNCIOS (mock + user)
  // ===========================
  Promise.all([
    fetch('data/anuncios_mock.json')
      .then(r => r.json())
      .catch(() => []),

    Promise.resolve(
      JSON.parse(localStorage.getItem('anuncios') || '[]')
    )
  ])
    .then(([mock, user]) => {

      const anuncios = [...mock, ...user];

      // ===========================
      // 3) FILTRAR SOLO FAVORITOS
      // ===========================
      const anunciosFavoritos = anuncios.filter(a =>
        favoritos.includes(String(a.id))
      );

      if (anunciosFavoritos.length === 0) {
        empty?.classList.remove('hidden');
        return;
      }

      empty?.classList.add('hidden');
      lista.innerHTML = '';

      // ===========================
      // 4) PINTAR CARDS
      // ===========================
      anunciosFavoritos.forEach(anuncio => {
        lista.appendChild(crearCardFavorito(anuncio));
      });
    });
});

// ===================================================
// CARD FAVORITO (reutiliza diseño)
// ===================================================
function crearCardFavorito(anuncio) {

  const card = document.createElement('article');
  card.className = 'anuncio-card';

  const precio = obtenerPrecio(anuncio);

  card.innerHTML = `
    <div class="card-top">
      <div class="avatar-wrap">
        <div class="avatar"></div>

        <button class="fav-btn is-fav" aria-label="Quitar de favoritos">
          ♥
        </button>
      </div>

      <div class="card-info">
        <div class="card-name">${escapar(obtenerNombre(anuncio))}</div>
        <div class="card-sub">${obtenerServiciosCount(anuncio)} servicios</div>
      </div>

      <div class="card-price">
        <div class="price">${precio}</div>
        <div class="price-sub">${precio.includes('/h') ? 'por hora' : 'desde'}</div>
      </div>
    </div>

    <p class="card-desc">${escapar(anuncio.descripcion || '')}</p>
  `;

  // Click card → detalle
  card.addEventListener('click', (e) => {
    if (e.target.closest('.fav-btn')) return;

    window.location.href =
      `anuncio-detalle.html?id=${encodeURIComponent(anuncio.id)}`;
  });

  // Quitar de favoritos
  const favBtn = card.querySelector('.fav-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    toggleFavorito(anuncio.id); // app.js
    card.remove();

    // Si ya no quedan cards
    if (document.querySelectorAll('.anuncio-card').length === 0) {
      document.getElementById('empty-state')?.classList.remove('hidden');
    }
  });

  return card;
}
