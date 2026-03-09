/**********************************************************
 1. CARGAR HEADER, FOOTER y MENU INFERIOR
 **********************************************************/

document.addEventListener('DOMContentLoaded', () => {
  cargarLayout();
});

function cargarLayout() {

  Promise.all([
    fetch('partials/header.html').then(r => r.text()),
    fetch('partials/footer.html').then(r => r.text()),
    fetch('partials/bottom-nav.html').then(r => r.text())
  ])
    .then(([headerHTML, footerHTML, bottomNavHTML]) => {

      const header = document.getElementById('header');
      const footer = document.getElementById('footer');
      const bottomNav = document.getElementById('bottom-nav');

      if (header) header.innerHTML = headerHTML;
      if (footer) footer.innerHTML = footerHTML;
      if (bottomNav) bottomNav.innerHTML = bottomNavHTML;

      // el input ya existe
      cargarDatosBuscador()
        .then(() => activarBuscadorCategorias())
        .catch(err => console.error("Error buscador:", err));

      if (!document.body.classList.contains('has-fixed-bottom-nav')) {
        activarScrollWallapop();
      }
    });
}

/**********************************************************
 2. SCROLL TIPO WALLAPOP REAL
 **********************************************************/

let lastScrollY = window.scrollY;

function activarScrollWallapop() {

  const header = document.querySelector('.header');
  const bottomNav = document.querySelector('.bottom-nav');

  // Si no existen, no hacemos nada (pero no rompemos)
  if (!header || !bottomNav) {
    console.warn('Header o bottom nav no encontrados');
    return;
  }

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;

    // Evitar micro scrolls
    if (Math.abs(delta) < 8) return;

    // BAJANDO
    if (delta > 0 && currentY > 80) {
      header.classList.add('oculto');
      bottomNav.classList.add('visible');
    }

    // SUBIENDO
    if (delta < 0) {
      header.classList.remove('oculto');
      bottomNav.classList.remove('visible');
    }

    lastScrollY = currentY;

  }, { passive: true });
}



/**********************************************************
 3. CATEGORÍAS → SUBCATEGORÍAS
 **********************************************************/
function activarCategorias() {

  document.addEventListener('click', (e) => {

    const card = e.target.closest('.categoria-card');
    if (!card) return;

    const categoria = card.dataset.categoria;
    if (!categoria) return;

    window.location.href = `subcategorias.html?cat=${categoria}`;
  });
}

/**********************************************************
 4. NAVEGACIÓN GLOBAL (usada por bottom-nav.js)
 **********************************************************/
function irANuevoAnuncio() {
  window.location.href = 'nuevo-anuncio.html';
}

function irAInicio() {
  window.location.href = 'index.html';
}

/**********************************************************
 5. CLICK EN CATEGORÍAS PRINCIPALES (INDEX)
 **********************************************************/

document.addEventListener('click', (e) => {
  const card = e.target.closest('.categoria-card[data-categoria]');
  if (!card) return;

  const categoria = card.dataset.categoria;

  if (!categoria) return;

  window.location.href = `subcategorias.html?cat=${categoria}`;
});

// ===============================
// 6. FAVORITOS · CORE GLOBAL
// ===============================

function getFavoritos() {
  return JSON.parse(localStorage.getItem('favoritos') || '[]');
}

function esFavorito(id) {
  return getFavoritos().includes(String(id));
}

function toggleFavorito(id) {
  const favoritos = getFavoritos();
  const idStr = String(id);

  const index = favoritos.indexOf(idStr);

  if (index === -1) {
    favoritos.push(idStr);
  } else {
    favoritos.splice(index, 1);
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


// ===================================================
// 7. HELPERS
// ===================================================
function formatearTitulo(txt) {
  if (!txt) return '';
  return txt
    .toString()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function obtenerPrecio(anuncio) {
  const d = anuncio.detalles || {};

  if (d.precio_hora) return `${d.precio_hora}€ /h`;
  if (d.precio_sesion) return `${d.precio_sesion}€ /sesión`;
  if (d.precio_metro) return `${d.precio_metro}€ /m²`;
  if (d.precio_servicio) return `${d.precio_servicio}€`;
  if (d.precio_presupuesto) return `${d.precio_presupuesto}€`;

  return '—';
}

function obtenerNombre(anuncio) {
  return anuncio.nombre || 'Isabel';
}

function obtenerServiciosCount(anuncio) {
  return anuncio.serviciosCount || 8;
}

function escapar(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/**********************************************************
 8. BUSCADOR POR CATEGORÍAS Y SUBCATEGORÍAS
 **********************************************************/

let categoriasData = null;


/**********************************************************
 9. BUSCADOR INTELIGENTE (CATEGORÍAS + ANUNCIOS)
 **********************************************************/

let subcatsData = {};
let anunciosData = [];

/* ===============================
 10. CARGA DE DATOS
================================ */

async function cargarDatosBuscador() {
  const [subcats, anuncios] = await Promise.all([
    fetch('data/subcategorias.json').then(r => r.json()),
    fetch('data/anuncios_mock.json').then(r => r.json())
  ]);

  subcatsData = subcats || {};
  anunciosData = anuncios || [];
}

/* ===============================
 11. UTILIDADES
================================ */

function normalizar(txt) {
  return (txt || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/* ===============================
 12. ACTIVAR BUSCADOR
================================ */

function activarBuscadorCategorias() {
  const input = document.getElementById('buscadorCategorias');
  const contenedor = document.getElementById('resultadosBuscador');
  if (!input || !contenedor) return;

  input.addEventListener('input', () => {
    const q = normalizar(input.value.trim());
    contenedor.innerHTML = '';

    if (!q) return;

    const resultados = new Map();

    // A) MATCH DIRECTO (subcategorías oficiales)
    Object.entries(subcatsData).forEach(([cat, info]) => {
      (info.items || []).forEach(it => {
        if (
          normalizar(cat).includes(q) ||
          normalizar(it.nombre).includes(q)
        ) {
          resultados.set(`${cat}||${it.nombre}`, {
            tipo: 'directo',
            cat,
            sub: it.nombre
          });
        }
      });
    });

    // B) MATCH POR ANUNCIOS (título + descripción)
    anunciosData.forEach(a => {
      const texto = normalizar(`${a.titulo || ''} ${a.descripcion || ''}`);
      if (!texto.includes(q)) return;

      if (a.categoria && a.subcategoria) {
        const key = `${a.categoria}||${a.subcategoria}`;
        if (!resultados.has(key)) {
          resultados.set(key, {
            tipo: 'relacionado',
            cat: a.categoria,
            sub: a.subcategoria
          });
        }
      }
    });

    pintarResultadosBuscador([...resultados.values()]);
  });
}

/* ===============================
 13. PINTAR RESULTADOS
================================ */

function pintarResultadosBuscador(resultados) {
  const contenedor = document.getElementById('resultadosBuscador');

  if (!resultados.length) {
    contenedor.innerHTML = `<div class="search-empty">Sin resultados</div>`;
    return;
  }

  resultados.sort((a, b) =>
    a.tipo === b.tipo ? 0 : a.tipo === 'directo' ? -1 : 1
  );

  resultados.forEach(r => {
    const div = document.createElement('div');
    div.className = 'search-item';

    div.innerHTML = `
      🔹 ${escapar(r.sub)}
      <span>(${formatearTitulo(r.cat)})</span>
      ${r.tipo === 'relacionado' ? '<span class="search-related">(relacionado)</span>' : ''}
    `;

    div.onclick = () => {
      window.location.href =
        `anuncios.html?cat=${encodeURIComponent(r.cat)}&sub=${encodeURIComponent(r.sub)}`;
    };

    contenedor.appendChild(div);
  });
}
// Fallback para imágenes rotas
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.onerror = function () {
      // Si la imagen falla, usar placeholder según contexto
      if (this.parentElement.classList.contains('categoria-card')) {
        this.src = `https://picsum.photos/300/160?random=${Math.random()}`;
      } else if (this.classList.contains('logo')) {
        this.style.display = 'none';
        // Mostrar texto alternativo
        const textAlt = this.nextElementSibling;
        if (textAlt && textAlt.classList.contains('logo-text')) {
          textAlt.style.display = 'block';
        }
      }
    };
  });
});