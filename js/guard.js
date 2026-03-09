console.log('Guard JS cargado');

const usuario = sessionStorage.getItem('usuarioLogado');

if (!usuario) {
  window.location.href = 'welcome.html';
}
