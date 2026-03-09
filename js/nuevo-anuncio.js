console.log('Nuevo anuncio JS cargado');

document.addEventListener('DOMContentLoaded', () => {

    const selectCategoria = document.getElementById('select-categoria');
    const selectSubcategoria = document.getElementById('select-subcategoria');
    const selectProvincia = document.getElementById('select-provincia');
    const form = document.getElementById('form-paso-1');

    if (!selectCategoria || !selectSubcategoria || !selectProvincia || !form) {
        console.warn('Faltan elementos del DOM en nuevo-anuncio.html');
        return;
    }

    let datosSubcategorias = {};

    // =============================
    // UTIL: slug sin tildes
    // =============================
    function slugify(texto) {
        return texto
            .toString()
            .trim()
            .toLowerCase()
            .normalize('NFD')                 // separa letras y tildes
            .replace(/[\u0300-\u036f]/g, '')  // elimina tildes
            .replace(/[^a-z0-9\s-_]/g, '')    // quita símbolos
            .replace(/\s+/g, '_');            // espacios -> _
    }

    // =============================
    // 1) CARGAR CATEGORÍAS + SUBCATS
    // =============================
    fetch('data/subcategorias.json')
        .then(res => res.json())
        .then(data => {
            datosSubcategorias = data;

            // Cargar categorías
            Object.keys(data).forEach(cat => {
                const option = document.createElement('option');
                option.value = cat; // clave interna
                option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); // visible
                selectCategoria.appendChild(option);
            });
        })
        .catch(err => console.error('Error cargando subcategorias.json', err));

    // =============================
    // 2) CAMBIO DE CATEGORÍA -> carga subcategorías
    // =============================
    selectCategoria.addEventListener('change', () => {
        const categoria = selectCategoria.value;

        selectSubcategoria.innerHTML = `<option value="">Selecciona subcategoría</option>`;
        selectSubcategoria.disabled = true;

        if (!categoria || !datosSubcategorias[categoria]) return;

        datosSubcategorias[categoria].items.forEach(sub => {
            const option = document.createElement('option');

            // value = CLAVE (slug) para que coincida con formularios.json
            option.value = slugify(sub.nombre);

            // texto visible
            option.textContent = sub.nombre;

            selectSubcategoria.appendChild(option);
        });

        selectSubcategoria.disabled = false;
    });

    // =============================
    // 3) CARGAR PROVINCIAS
    // =============================
    fetch('data/provincias.json')
        .then(res => res.json())
        .then(provincias => {
            provincias.forEach(p => {
                const option = document.createElement('option');
                option.value = p;
                option.textContent = p;
                selectProvincia.appendChild(option);
            });
        })
        .catch(err => console.error('Error cargando provincias.json', err));

    // =============================
    // 4) SUBMIT -> guardar paso1 + ir paso2
    // =============================
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const datosPaso1 = {
            categoria: selectCategoria.value,     // ej: "clases"
            subcategoria: selectSubcategoria.value, // ej: "musica"
            provincia: selectProvincia.value,
            titulo: document.getElementById('titulo')?.value?.trim() || '',
            //precio: document.getElementById('precio')?.value?.trim() || '',
            descripcion: document.getElementById('descripcion')?.value?.trim() || ''
        };

        // Validación simple
        for (const key in datosPaso1) {
            if (!datosPaso1[key]) {
                alert('Completa todos los campos');
                return;
            }
        }

        // Persistimos paso 1
        sessionStorage.setItem('nuevoAnuncioPaso1', JSON.stringify(datosPaso1));

        // Paso 2 (con params para que form-builder lo lea fácil)
        window.location.href = `nuevo-anuncio-detalle.html?cat=${encodeURIComponent(datosPaso1.categoria)}&subcat=${encodeURIComponent(datosPaso1.subcategoria)}`;
    });

    // =============================
    // 5) Botón salir (si existe)
    // =============================
    const btnSalir = document.querySelector('.btn-salir');
    if (btnSalir) {
        btnSalir.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});


