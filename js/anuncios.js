console.log('Anuncios JS cargado');

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // 1) LEER PARAMS cat / subcat
  // ===========================
  const params = new URLSearchParams(window.location.search);

  // Acepta varias formas (porque en el proyecto se suelen mezclar)
  const catRaw =
    params.get('cat') ||
    params.get('categoria');

  const subRaw =
    params.get('sub') ||
    params.get('subcat') ||
    params.get('subcategoria');

  // Normaliza (minúsculas + trim)
  const cat = (catRaw || '').toLowerCase().trim() || null;
  const subcat = (subRaw || '').toLowerCase().trim() || null;

  // Debug útil (mira la consola)
  console.log('PARAMS:', { cat, subcat, url: window.location.search });


  // ===========================
  // 2) ELEMENTOS DOM
  // ===========================
  const titleEl = document.getElementById('list-title');
  const lista = document.getElementById('lista-anuncios');
  const empty = document.getElementById('empty-state');
  const btnVolver = document.querySelector('.btn-volver');

  if (titleEl) {
    titleEl.textContent = formatearTitulo(subcat || cat || 'Anuncios');
  }

  if (btnVolver) {
    btnVolver.addEventListener('click', () => history.back());
  }

  if (!lista) return;

  // ===========================
  // 3) CARGAR ANUNCIOS (MOCK + USER)
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

      const anuncios = [...mock, ...user].map(a => ({
        ...a,
        categoria: a.categoria?.toLowerCase().trim(),
        subcategoria: a.subcategoria?.toLowerCase().trim()
      }));


      // ===========================
      // 4) FILTRAR
      // ===========================
      const filtrados = anuncios.filter(a => {
        const aCat = (a.categoria || '').toLowerCase().trim();
        const aSub = (a.subcategoria || '').toLowerCase().trim();

        const okCat = cat ? aCat === cat : true;
        const okSub = subcat ? aSub === subcat : true;

        return okCat && okSub;
      });

      console.log('FILTRADOS:', filtrados.length);



      // ===========================
      // 5) PINTAR
      // ===========================
      lista.innerHTML = '';

      if (filtrados.length === 0) {
        if (empty) empty.classList.remove('hidden');
        return;
      } else {
        if (empty) empty.classList.add('hidden');
      }

      filtrados.forEach(anuncio => {
        lista.appendChild(crearCard(anuncio));
      });
    });
});

// ===================================================
// CARD
// ===================================================
function crearCard(anuncio) {

  const card = document.createElement('article');
  card.className = 'anuncio-card';

  // NECESARIO PARA LOS FILTROS
  card.dataset.anuncio = JSON.stringify(anuncio);

  const precio = obtenerPrecio(anuncio);
  const favorito = esFavorito(anuncio.id);

  card.innerHTML = `
    <div class="card-top">
      <div class="avatar-wrap">
        <div class="avatar"></div>
        <button class="fav-btn ${favorito ? 'is-fav' : ''}" aria-label="Favorito">
          ${favorito ? '♥' : '♡'}
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

  //  Click card → detalle
  card.addEventListener('click', (e) => {
    if (e.target.closest('.fav-btn')) return;
    window.location.href =
      `anuncio-detalle.html?id=${encodeURIComponent(anuncio.id)}`;
  });

  //  Favorito
  const favBtn = card.querySelector('.fav-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorito(anuncio.id);
    favBtn.classList.toggle('is-fav');
    favBtn.textContent = favBtn.classList.contains('is-fav') ? '♥' : '♡';
  });

  return card;
}





document.addEventListener('filtros-aplicados', (e) => {
  aplicarFiltros(e.detail);
});

function aplicarFiltros(filtros) {

  const cards = document.querySelectorAll('.anuncio-card');

  cards.forEach(card => {

    const anuncio = JSON.parse(card.dataset.anuncio);
    let visible = true;

    for (const key in filtros) {

      const valorFiltro = filtros[key];
      const valorAnuncio = anuncio.detalles?.[key];

      //  si el anuncio no tiene ese campo
      if (valorAnuncio === undefined) {
        visible = false;
        break;
      }

      //  CHECKBOX-GROUP
      if (Array.isArray(valorFiltro)) {

        // si el filtro está vacío, no filtra
        if (valorFiltro.length === 0) continue;

        // el anuncio debe tener AL MENOS UNO
        if (!Array.isArray(valorAnuncio)) {
          visible = false;
          break;
        }

        const coincide = valorFiltro.some(v =>
          valorAnuncio.includes(v)
        );

        if (!coincide) {
          visible = false;
          break;
        }
      }

      //  NUMBER (precio, etc.)
      else if (typeof valorFiltro === 'number') {
        if (Number(valorAnuncio) > valorFiltro) {
          visible = false;
          break;
        }
      }

      //  BOOLEAN
      else if (typeof valorFiltro === 'boolean') {
        if (valorAnuncio !== valorFiltro) {
          visible = false;
          break;
        }
      }
    }

    card.style.display = visible ? '' : 'none';
  });
}


