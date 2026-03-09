console.log('Form builder cargado');

document.addEventListener('DOMContentLoaded', () => {

  // ===============================
  // 0. BOTÓN SALIR
  // ===============================
  const btnSalir = document.querySelector('.btn-salir');
  if (btnSalir) {
    btnSalir.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres salir? Se perderán los cambios.')) {
        sessionStorage.removeItem('nuevoAnuncioPaso1');
        window.location.href = 'index.html';
      }
    });
  }

  // ===============================
  // 1. LEER DATOS DEL PASO 1
  // ===============================
  const datosPaso1Raw = sessionStorage.getItem('nuevoAnuncioPaso1');
  if (!datosPaso1Raw) {
    console.warn('No hay datos del paso 1');
    window.location.href = 'index.html';
    return;
  }

  const datosPaso1 = JSON.parse(datosPaso1Raw);
  const { categoria, subcategoria } = datosPaso1;

  if (!categoria || !subcategoria) {
    console.warn('Categoría o subcategoría inválidas');
    window.location.href = 'index.html';
    return;
  }

  // ===============================
  // 2. ELEMENTOS DOM
  // ===============================
  const titulo = document.getElementById('titulo-subcategoria');
  const form = document.getElementById('form-dinamico');

  if (!form) {
    console.error('No existe #form-dinamico en el HTML');
    return;
  }

  // ===============================
  // 3. CONSTRUIR FORM DINÁMICO
  // ===============================
  fetch('data/formularios.json')
    .then(res => res.json())
    .then(data => {
      const formulario = data?.[categoria]?.[subcategoria];

      if (!formulario) {
        console.warn('Formulario no encontrado:', categoria, subcategoria);
        return;
      }

      // Título
      if (titulo) titulo.textContent = formulario.titulo;

      // Limpiar
      form.innerHTML = '';

      // Crear campos
      formulario.campos.forEach(campo => {

        const bloque = document.createElement('div');
        bloque.className = 'form-bloque';

        // ---------- CHECKBOX GROUP ----------
        // En la sección de checkbox-group, añade console.log para ver qué está pasando:
        if (campo.tipo === 'checkbox-group') {
          console.log('Creando checkbox-group:', campo.label, 'con opciones:', campo.opciones);

          const label = document.createElement('label');
          label.textContent = campo.label;
          label.style.cssText = 'display:block; font-size:1.1rem; font-weight:600; color:#333; margin-bottom:1rem;';
          bloque.appendChild(label);

          // Contenedor para checkboxes
          const container = document.createElement('div');
          container.className = 'checkbox-group-container';
          container.style.cssText = 'display:flex; flex-direction:column; gap:8px; margin-top:0.5rem;';

          // Crear cada checkbox
          campo.opciones.forEach((opcion, index) => {
            console.log(`Opción ${index + 1}:`, opcion);

            // Label que contiene checkbox + texto
            const item = document.createElement('label');
            item.className = 'check-item';
            item.style.cssText = 'display:flex; align-items:center; gap:12px; padding:10px 0; cursor:pointer; width:100%;';

            // Checkbox
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = campo.id;
            input.value = opcion;
            input.id = `${campo.id}_${index}`;
            input.style.cssText = 'width:22px; height:22px; border:2px solid #4a90e2; border-radius:5px;';

            // Texto
            const span = document.createElement('span');
            span.textContent = opcion;
            span.style.cssText = 'font-size:1rem; color:#333;';

            item.appendChild(input);
            item.appendChild(span);
            container.appendChild(item);
          });

          bloque.appendChild(container);
        }

        // ---------- NUMBER ----------
        if (campo.tipo === 'number') {
          const label = document.createElement('label');
          label.textContent = campo.label;
          bloque.appendChild(label);

          const input = document.createElement('input');
          input.type = 'number';
          input.name = campo.id;
          input.placeholder = campo.label;

          bloque.appendChild(input);
        }

        // ---------- BOOLEAN ----------
        if (campo.tipo === 'boolean') {
          const label = document.createElement('label');
          label.textContent = campo.label;
          bloque.appendChild(label);

          const item = document.createElement('label');
          item.className = 'check-item';

          const input = document.createElement('input');
          input.type = 'checkbox';
          input.name = campo.id;

          const span = document.createElement('span');
          span.textContent = 'Sí';

          item.appendChild(input);
          item.appendChild(span);
          bloque.appendChild(item);
        }

        // ---------- SELECT ----------
        if (campo.tipo === 'select') {
          const label = document.createElement('label');
          label.textContent = campo.label;
          bloque.appendChild(label);

          const select = document.createElement('select');
          select.name = campo.id;

          campo.opciones.forEach(opcion => {
            const opt = document.createElement('option');
            opt.value = opcion;
            opt.textContent = opcion;
            select.appendChild(opt);
          });

          bloque.appendChild(select);
        }

        form.appendChild(bloque);
      });
    })
    .catch(err => console.error('Error cargando formularios.json', err));

  // ===============================
  // 5. SUBMIT FINAL → localStorage
  // ===============================
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Recoger valores
    const datosPaso2 = {};
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(el => {
      if (el.type === 'checkbox') {

        // checkbox-group → array (tiene value “real”)
        if (el.value && el.value !== 'on') {
          if (!datosPaso2[el.name]) datosPaso2[el.name] = [];
          if (el.checked) datosPaso2[el.name].push(el.value);
        }
        // boolean → true/false (value "on" o vacío)
        else {
          datosPaso2[el.name] = el.checked;
        }

      } else {
        datosPaso2[el.name] = el.value;
      }
    });

    const anuncioFinal = {
      id: Date.now().toString(),
      categoria: datosPaso1.categoria,
      subcategoria: datosPaso1.subcategoria,
      provincia: datosPaso1.provincia,
      titulo: datosPaso1.titulo,
      descripcion: datosPaso1.descripcion,
      fecha: new Date().toISOString(),
      detalles: datosPaso2
    };

    const anuncios = JSON.parse(localStorage.getItem('anuncios') || '[]');
    anuncios.push(anuncioFinal);
    localStorage.setItem('anuncios', JSON.stringify(anuncios));

    sessionStorage.removeItem('nuevoAnuncioPaso1');
    alert('Anuncio guardado correctamente');
    window.location.href = 'index.html';
  });

});
