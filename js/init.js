// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function () {
  console.log('App inicializada');

  // Verificar si hay usuario logueado
  const usuario = JSON.parse(localStorage.getItem('usuario_registrado'));

  if (usuario) {
    console.log('Usuario activo:', usuario.nombre);

    // Actualizar UI si es necesario
    const elementosUsuario = document.querySelectorAll('.user-name');
    elementosUsuario.forEach(el => {
      el.textContent = usuario.nombre;
    });
  }

  // Cargar bottom nav si existe el contenedor
  if (document.getElementById('bottom-nav-container')) {
    fetch('partials/bottom-nav.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('bottom-nav-container').innerHTML = html;
      })
      .catch(error => console.error('Error cargando bottom-nav:', error));
  }
});