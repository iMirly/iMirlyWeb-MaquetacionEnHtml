console.log('Filtros JS cargado');

let filtrosActivos = {};

document.addEventListener('DOMContentLoaded', () => {

    const btnFiltros = document.querySelector('.btn-filtros');
    const panel = document.getElementById('panel-filtros');
    const cerrar = document.getElementById('cerrar-filtros');
    const form = document.getElementById('form-filtros');
    const aplicar = document.getElementById('aplicar-filtros');

    if (!btnFiltros || !panel || !form) return;

    // ===========================
    // ABRIR / CERRAR
    // ===========================
    btnFiltros.addEventListener('click', () => {
        panel.classList.remove('hidden');
    });

    cerrar.addEventListener('click', () => {
        panel.classList.add('hidden');
    });

    // ===========================
    // CARGAR FORMULARIOS
    // ===========================
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    const subcat = params.get('subcat');

    fetch('data/formularios.json')
        .then(r => r.json())
        .then(data => {
            const formulario = data?.[cat]?.[subcat];
            if (!formulario) return;
            construirFiltros(formulario.campos, form);
        });

    // ===========================
    // APLICAR FILTROS
    // ===========================
    aplicar.addEventListener('click', () => {
        filtrosActivos = leerFiltros(form);
        panel.classList.add('hidden');
        document.dispatchEvent(
            new CustomEvent('filtros-aplicados', { detail: filtrosActivos })
        );
    });
});

// ===================================================
// CONSTRUIR FILTROS
// ===================================================
function construirFiltros(campos, contenedor) {

    contenedor.innerHTML = '';

    campos.forEach(campo => {

        const bloque = document.createElement('div');
        bloque.className = 'filtro-bloque';

        // ===============================
        // LABEL GENERAL (no para boolean)
        // ===============================
        if (campo.tipo !== 'checkbox-group' && campo.tipo !== 'boolean') {
            const label = document.createElement('label');
            label.textContent = campo.label;
            bloque.appendChild(label);
        }

        // ===============================
        // BOOLEAN (alineado a la izquierda)
        // ===============================
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

        // ===============================
        // NUMBER → PRECIO POR HORA (RANGE)
        // ===============================
        if (campo.tipo === 'number' && campo.id === 'precio_hora') {

            const valueLabel = document.createElement('div');
            valueLabel.className = 'precio-rango-label';
            valueLabel.textContent = 'Hasta 100€ /h';

            const input = document.createElement('input');
            input.type = 'range';
            input.name = campo.id;
            input.min = 9;
            input.max = 100;
            input.step = 1;
            input.value = 100;

            input.addEventListener('input', () => {
                valueLabel.textContent = `Hasta ${input.value}€ /h`;
            });

            bloque.appendChild(valueLabel);
            bloque.appendChild(input);
        }

        // ===============================
        // CHECKBOX GROUP
        // ===============================
        if (campo.tipo === 'checkbox-group') {

            const label = document.createElement('label');
            label.textContent = campo.label;
            bloque.appendChild(label);

            campo.opciones.forEach(opcion => {

                const item = document.createElement('label');
                item.className = 'check-item';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = campo.id;
                input.value = opcion;

                const span = document.createElement('span');
                span.textContent = opcion;

                item.appendChild(input);
                item.appendChild(span);
                bloque.appendChild(item);
            });
        }

        contenedor.appendChild(bloque);
    });
}


// ===================================================
// LEER FILTROS
// ===================================================
function leerFiltros(form) {

    const data = {};
    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {

        if (input.type === 'checkbox') {
            if (!data[input.name]) data[input.name] = [];
            if (input.checked) data[input.name].push(input.value || true);
        }

        if (input.type === 'number' || input.type === 'range') {
            if (input.value) {
                data[input.name] = Number(input.value);
            }
        }
    });

    return data;
}
