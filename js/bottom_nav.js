console.log('Bottom nav cargado');

document.addEventListener('DOMContentLoaded', () => {

  marcarBotonActivo();

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-item');
    if (!btn) return;

    const action = btn.dataset.action;
    if (!action) return;

    switch (action) {
      case 'inicio':
        window.location.href = 'index.html';
        break;
      case 'favoritos':
        window.location.href = 'favoritos.html';
        break;
      case 'publicar':
        window.location.href = 'nuevo-anuncio.html';
        break;
      case 'mensajes':
        window.location.href = '404.html';
        break;
      case 'perfil':
        window.location.href = 'perfil.html';
        break;
    }
  });
});

function marcarBotonActivo() {

  const path = location.pathname;
  let action = null;

  if (
    path.includes('index.html') ||
    path.includes('anuncios.html') ||
    path.includes('anuncio-detalle.html')
  ) {
    action = 'inicio';
  } else if (path.includes('favoritos')) {
    action = 'favoritos';
  } else if (path.includes('nuevo-anuncio')) {
    action = 'publicar';
  } else if (path.includes('mensajes')) {
    action = 'mensajes';
  } else if (path.includes('perfil')) {
    action = 'perfil';
  }

  if (!action) return;

  document.querySelectorAll('.nav-item')
    .forEach(btn => btn.classList.remove('active'));

  const btnActivo = document.querySelector(
    `.nav-item[data-action="${action}"]`
  );

  if (btnActivo) btnActivo.classList.add('active');
}
