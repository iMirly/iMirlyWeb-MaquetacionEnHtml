document.addEventListener("DOMContentLoaded", () => {
  console.log('Editar perfil JS cargado');

  // =============================
  // ELEMENTOS DOM
  // =============================
  const inputNombre = document.getElementById("inputNombre");
  const inputEmail = document.getElementById("inputEmail");
  const form = document.querySelector(".form-editar-perfil");

  const avatarImg = document.getElementById("avatarPerfil");
  const inputAvatar = document.getElementById("inputAvatar");
  const btnEditarAvatar = document.querySelector(".btn-editar-avatar");
  const btnVolver = document.querySelector(".btn-volver");

  // =============================
  // CARGAR USUARIO (BUSCAR EN AMBAS CLAVES)
  // =============================
  console.log('Buscando usuario en localStorage...');

  // DEBUG: Mostrar todo el localStorage
  console.log('=== LOCALSTORAGE ACTUAL ===');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`${key}:`, localStorage.getItem(key));
  }
  console.log('===========================');

  let usuario = JSON.parse(localStorage.getItem("usuario")) ||
    JSON.parse(localStorage.getItem("usuario_registrado"));

  console.log('Usuario encontrado:', usuario);

  if (!usuario) {
    alert("No hay usuario logueado");
    window.location.href = "../perfil.html";
    return;
  }

  // =============================
  // PINTAR DATOS - ASEGURAR QUE SE RELLENAN
  // =============================
  console.log('Rellenando datos...');
  console.log('Nombre:', usuario.nombre);
  console.log('Email:', usuario.email);
  console.log('Avatar:', usuario.avatar);

  if (inputNombre) {
    inputNombre.value = usuario.nombre || "";
    console.log('Input nombre rellenado:', inputNombre.value);
  } else {
    console.error('ERROR: No se encontró inputNombre');
  }

  if (inputEmail) {
    inputEmail.value = usuario.email || "";
    console.log('Input email rellenado:', inputEmail.value);
  } else {
    console.error('ERROR: No se encontró inputEmail');
  }

  if (avatarImg) {
    if (usuario.avatar && usuario.avatar !== '' && usuario.avatar !== 'undefined') {
      avatarImg.src = usuario.avatar;
      console.log('Avatar cargado:', usuario.avatar);
    } else {
      avatarImg.src = "../assets/icons/usuario.png";
      console.log('Avatar por defecto cargado');
    }
  } else {
    console.error('ERROR: No se encontró avatarImg');
  }

  // =============================
  // BOTÓN VOLVER
  // =============================
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.history.back();
    });
  }

  // =============================
  // CAMBIAR AVATAR
  // =============================
  if (btnEditarAvatar) {
    btnEditarAvatar.addEventListener("click", () => {
      inputAvatar.click();
    });
  }

  if (inputAvatar) {
    inputAvatar.addEventListener("change", () => {
      const file = inputAvatar.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Selecciona una imagen válida");
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        avatarImg.src = reader.result;

        // Guardar avatar en el usuario
        usuario.avatar = reader.result;

        // Actualizar en ambas claves para compatibilidad
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("usuario_registrado", JSON.stringify(usuario));

        console.log('Avatar actualizado:', reader.result);
      };

      reader.readAsDataURL(file);
    });
  }

  // =============================
  // GUARDAR CAMBIOS
  // =============================
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log('Guardando cambios...');

      usuario.nombre = inputNombre.value.trim();
      usuario.email = inputEmail.value.trim();

      console.log('Nuevos datos:', usuario);

      // Guardar en ambas claves para compatibilidad
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("usuario_registrado", JSON.stringify(usuario));

      // Actualizar también en la lista de usuarios
      let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
      console.log('Usuarios antes de actualizar:', usuarios.length);

      usuarios = usuarios.map(u => {
        if (u.id === usuario.id) {
          console.log('Actualizando usuario en lista:', u.id);
          return {
            ...u,
            nombre: usuario.nombre,
            email: usuario.email,
            avatar: usuario.avatar
          };
        }
        return u;
      });

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log('Usuarios después de actualizar:', usuarios.length);

      alert("Cambios guardados correctamente");
      window.location.href = "../perfil.html";
    });
  }

  // =============================
  // ELIMINAR CUENTA 
  // =============================
  const btnEliminar = document.querySelector('.btn-eliminar-cuenta');
  const modalEliminar = document.getElementById('modal-eliminar-cuenta');

  if (btnEliminar && modalEliminar) {
    const btnCancelarEliminar = document.getElementById('btn-cancelar-eliminar');
    const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
    const overlayEliminar = modalEliminar.querySelector('.modal-overlay');

    btnEliminar.addEventListener('click', () => {
      modalEliminar.classList.remove('hidden');
    });

    function cerrarModalEliminar() {
      modalEliminar.classList.add('hidden');
    }

    if (btnCancelarEliminar) {
      btnCancelarEliminar.addEventListener('click', cerrarModalEliminar);
    }

    if (overlayEliminar) {
      overlayEliminar.addEventListener('click', cerrarModalEliminar);
    }

    if (btnConfirmarEliminar) {
      btnConfirmarEliminar.addEventListener('click', () => {
        // Eliminar usuario activo (ambas claves)
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuario_registrado');

        // Eliminar de la lista de usuarios
        let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        usuarios = usuarios.filter(u => u.id !== usuario.id);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Limpiar
        sessionStorage.clear();

        // Redirigir
        window.location.href = '../welcome.html';
      });
    }
  }
});