console.log('Perfil JS cargado');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado en perfil.js');

  // DEBUG: Mostrar todo el localStorage
  console.log('=== DEBUG LOCALSTORAGE ===');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}:`, value ? value.substring(0, 100) + '...' : 'null');
  }
  console.log('==========================');

  // INTENTAR OBTENER USUARIO DE DIFERENTES FORMAS
  let usuario = null;

  // Primero intentar de localStorage directo
  usuario = JSON.parse(localStorage.getItem('usuario'));

  // Si no está, buscar en sessionStorage
  if (!usuario) {
    usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
  }

  // Si todavía no está, buscar en la lista de usuarios (último usuario)
  if (!usuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.length > 0) {
      usuario = usuarios[usuarios.length - 1]; // Último usuario registrado
      console.log('Usando último usuario de la lista:', usuario);
    }
  }

  if (!usuario) {
    console.error('ERROR CRÍTICO: No se encontró usuario en ningún sitio');
    alert('No hay sesión activa. Serás redirigido al login.');
    window.location.href = 'login.html';
    return;
  }

  console.log('Usuario encontrado para perfil:', usuario);

  // GUARDARLO SIEMPRE COMO 'usuario' PARA FUTURAS VISITAS
  if (!localStorage.getItem('usuario')) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    console.log('Usuario guardado en localStorage para futuras visitas');
  }

  // PINTAR PERFIL
  pintarPerfil(usuario);

  // PINTAR RESUMEN
  pintarResumen(usuario);

  // CERRAR SESIÓN
  configurarCerrarSesion();

  // CONFIGURAR MODAL
  configurarModal();
});

// ===================================================
// PINTAR PERFIL
// ===================================================
function pintarPerfil(usuario) {
  console.log('Pintando perfil para:', usuario);

  const nombreEl = document.getElementById('perfil-nombre');
  const emailEl = document.getElementById('perfil-email');
  const avatarEl = document.getElementById('avatarPerfil');

  if (nombreEl) {
    nombreEl.textContent = usuario.nombre || 'Usuario';
    console.log('Nombre puesto:', usuario.nombre);
  } else {
    console.error('ERROR: Elemento perfil-nombre no encontrado');
  }

  if (emailEl) {
    emailEl.textContent = usuario.email || 'email@ejemplo.com';
    console.log('Email puesto:', usuario.email);
  } else {
    console.error('ERROR: Elemento perfil-email no encontrado');
  }

  if (avatarEl) {
    if (usuario.avatar && usuario.avatar !== '' && usuario.avatar !== 'undefined') {
      avatarEl.src = usuario.avatar;
      console.log('Avatar cargado:', usuario.avatar);
    } else {
      avatarEl.src = 'assets/icons/usuario.png';
      console.log('Avatar por defecto cargado');
    }
  } else {
    console.error('ERROR: Elemento avatarPerfil no encontrado');
  }
}

// ===================================================
// RESUMEN (anuncios) - VERSIÓN SIMPLIFICADA
// ===================================================
function pintarResumen(usuario) {
  console.log('Pintando resumen para:', usuario.email);

  const anuncios = JSON.parse(localStorage.getItem('anuncios') || '[]');
  console.log('Total anuncios:', anuncios.length);

  // Contador simple: contar todos los anuncios (por ahora)
  const anunciosCount = document.getElementById('contador-anuncios');
  if (anunciosCount) {
    anunciosCount.textContent = anuncios.length;
    console.log('Contador de anuncios actualizado:', anuncios.length);

    // Mostrar siempre el badge, aunque sea 0
    anunciosCount.style.display = 'flex';
  } else {
    console.error('ERROR: Elemento contador-anuncios no encontrado');
  }
}

// ===================================================
// CERRAR SESIÓN
// ===================================================
function configurarCerrarSesion() {
  console.log('Configurando cierre de sesión');

  const btnCerrar = document.querySelector('.cerrar-sesion');

  if (!btnCerrar) {
    console.error('ERROR: No se encontró botón de cerrar sesión');
    return;
  }

  btnCerrar.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Clic en cerrar sesión');

    const modal = document.getElementById('modal-logout');
    if (modal) {
      modal.classList.remove('hidden');
    } else {
      const confirmar = confirm('¿Seguro que quieres cerrar sesión?');
      if (confirmar) {
        cerrarSesion();
      }
    }
  });
}

// ===================================================
// CONFIGURAR MODAL
// ===================================================
function configurarModal() {
  const modal = document.getElementById('modal-logout');
  if (!modal) {
    console.log('Modal no encontrado, usando confirm nativo');
    return;
  }

  const btnCancelar = document.getElementById('btn-cancelar');
  const btnConfirmar = document.getElementById('btn-confirmar');

  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  if (btnConfirmar) {
    btnConfirmar.addEventListener('click', cerrarSesion);
  }

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      modal.classList.add('hidden');
    }
  });
}

// ===================================================
// FUNCIÓN CERRAR SESIÓN
// ===================================================
function cerrarSesion() {
  console.log('Ejecutando cerrarSesion()');

  // Limpiar TODOS los datos de usuario
  localStorage.removeItem('usuario');
  localStorage.removeItem('usuario_registrado');
  sessionStorage.clear();

  console.log('Sesión cerrada. Redirigiendo...');
  window.location.href = 'index.html';
}