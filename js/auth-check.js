console.log('Auth Check JS cargado');

// Verificar sesión en cada página que requiera login
function verificarSesion() {
  // Buscar "usuario" no "usuario_registrado"
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const paginaActual = window.location.pathname.split('/').pop();

  console.log('Página actual:', paginaActual);
  console.log('Usuario en localStorage (clave "usuario"):', usuario);

  // Páginas que no requieren login
  const paginasPublicas = [
    'login.html',
    'registro.html',
    'index.html',
    'welcome.html',
    ''
  ];

  if (!usuario && !paginasPublicas.includes(paginaActual)) {
    console.log('No hay sesión activa, redirigiendo a login');
    window.location.href = 'login.html';
    return null;
  }

  return usuario;
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  const usuario = verificarSesion();

  if (usuario && window.location.pathname.includes('perfil.html')) {
    console.log('Sesión activa para:', usuario.nombre);
  }

  // Cargar bottom nav
  if (document.getElementById('bottom-nav-container')) {
    cargarBottomNav();
  }
});