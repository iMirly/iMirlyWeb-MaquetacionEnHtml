document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('formCambiarPassword');
  const inputPass1 = document.getElementById('inputPassword');
  const inputPass2 = document.getElementById('inputPassword2');
  const btnVolver = document.querySelector('.btn-volver');

  // =============================
  // CARGAR USUARIO (BUSCAR EN AMBAS CLAVES)
  // =============================
  let usuario = JSON.parse(localStorage.getItem('usuario')) ||
    JSON.parse(localStorage.getItem('usuario_registrado'));

  if (!usuario) {
    alert('No hay usuario logueado');
    window.location.href = '../perfil.html';
    return;
  }

  // =============================
  // BOTÓN VOLVER
  // =============================
  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      window.history.back();
    });
  }

  // =============================
  // MOSTRAR / OCULTAR CONTRASEÑA
  // =============================
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const img = btn.querySelector('img');

      if (input.type === 'password') {
        input.type = 'text';
        img.src = img.src.includes('ojo.png') ? 'assets/icons/ojo_cerrado.png' : 'assets/icons/ojo-cruzado.png';
      } else {
        input.type = 'password';
        img.src = 'assets/icons/ojo.png';
      }
    });
  });

  // =============================
  // GUARDAR CONTRASEÑA
  // =============================
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pass1 = inputPass1.value.trim();
    const pass2 = inputPass2.value.trim();

    if (pass1.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (pass1 !== pass2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Actualizar usuario (ambas claves)
    usuario.password = pass1;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('usuario_registrado', JSON.stringify(usuario));

    // Actualizar lista de usuarios
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios = usuarios.map(u =>
      u.id === usuario.id ? { ...u, password: pass1 } : u
    );

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Contraseña actualizada correctamente');
    window.history.back();
  });
});