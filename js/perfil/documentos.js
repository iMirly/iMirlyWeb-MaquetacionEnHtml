const btnVolver = document.querySelector('.btn-volver');

if (btnVolver) {
  btnVolver.addEventListener('click', () => {
    window.history.back();
  });
}
function abrirDocumento(tipo, titulo) {
  window.location.href =
    `documento.html?doc=${tipo}&title=${encodeURIComponent(titulo)}`;
}
