console.log('Subcategorías JS cargado');

document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('cat');

    if (!categoria) {
        console.warn('No hay categoría en la URL');
        return;
    }

    const titulo = document.getElementById('titulo-subcategorias');
    const breadcrumb = document.getElementById('breadcrumb-categoria');
    const lista = document.getElementById('lista-subcategorias');

    fetch('data/subcategorias.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const datosCategoria = data[categoria];
            if (!datosCategoria) return;

            const nombreCategoria =
                categoria.charAt(0).toUpperCase() + categoria.slice(1);

            titulo.textContent = nombreCategoria;
            //breadcrumb.textContent = nombreCategoria;

            lista.innerHTML = '';

            datosCategoria.items.forEach(subcat => {

                const slug = generarSlug(subcat.nombre);

                const button = document.createElement('button');
                button.className = 'categoria-card';

                const img = document.createElement('img');
                img.src = `assets/images/subcategorias/${subcat.imagen}`;
                img.alt = subcat.nombre;

                const span = document.createElement('span');
                span.textContent = subcat.nombre;

                button.appendChild(img);
                button.appendChild(span);

                button.addEventListener('click', () => {
                    window.location.href =
                        `anuncios.html?cat=${encodeURIComponent(categoria)}&subcat=${encodeURIComponent(slug)}`;
                });

                lista.appendChild(button);
            });
        });
});

// Volver
document.querySelector(".btn-volver").onclick = () => history.back();

/* ===== Utils ===== */
function generarSlug(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '');
}
