console.log('Auth JS cargado');

// ===============================
// HELPERS STORAGE
// ===============================
function getUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

function guardarUsuarios(usuarios) {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function setSesion(usuario) {
  sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
}

function getSesion() {
  return JSON.parse(sessionStorage.getItem('usuarioLogado'));
}

function cerrarSesion() {
  sessionStorage.removeItem('usuarioLogado');
}

// ===============================
// LOGIN
// ===============================
const formLogin = document.getElementById('form-login');

if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = formLogin.email.value.trim();
    const password = formLogin.password.value;

    const usuarios = getUsuarios();

    const usuario = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (!usuario) {
      alert('Email o contraseña incorrectos');
      return;
    }

    // GUARDAR USUARIO ACTIVO EN LOCALSTORAGE (ESTA ES LA CLAVE)
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // También mantener la sesión en sessionStorage por compatibilidad
    setSesion(usuario);

    console.log('Sesión iniciada, usuario guardado en localStorage:', usuario);

    window.location.href = 'index.html';
  });
}

// ===============================
// REGISTRO
// ===============================
const formRegistro = document.getElementById('form-registro');

if (formRegistro) {
  formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = formRegistro.nombre.value.trim();
    const email = formRegistro.email.value.trim();
    const password = formRegistro.password.value;
    const password2 = formRegistro.password2.value;

    if (!nombre || !email || !password || !password2) {
      alert('Completa todos los campos');
      return;
    }

    if (password !== password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const usuarios = getUsuarios();

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
      alert('Ya existe un usuario con ese email');
      return;
    }

    const usuario = {
      id: Date.now(),
      nombre,
      email,
      password
    };

    usuarios.push(usuario);
    guardarUsuarios(usuarios);

    // GUARDAR USUARIO ACTIVO EN LOCALSTORAGE
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // También mantener la sesión
    setSesion(usuario);

    console.log('Usuario registrado y guardado en localStorage:', usuario);

    window.location.href = 'index.html';
  });
}

// ===============================
// TOGGLE PASSWORD (OJO)
// ===============================
document.querySelectorAll('.toggle-password')
  .forEach(btn => {

    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const img = btn.querySelector('img');

      if (input.type === 'password') {
        input.type = 'text';
        img.src = 'assets/icons/ojo_cerrado.png';
      } else {
        input.type = 'password';
        img.src = 'assets/icons/ojo.png';
      }
    });

  });

