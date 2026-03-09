document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  let anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
  const anuncio = anuncios.find(a => a.id === id);

  if (!anuncio) {
    alert("Anuncio no encontrado");
    history.back();
    return;
  }

  // Campos base
  document.getElementById("titulo").value = anuncio.titulo;
  document.getElementById("descripcion").value = anuncio.descripcion || "";
  document.getElementById("oculto").checked = anuncio.oculto || false;

  // Cargar formularios.json
  const res = await fetch("../data/formularios.json");
  const formularios = await res.json();

  const campos =
    formularios?.[anuncio.categoria]?.[anuncio.subcategoria]?.campos || [];

  const contenedor = document.getElementById("campos-dinamicos");

  campos.forEach(campo => {
    const valor = anuncio.detalles?.[campo.id];

    const bloque = document.createElement("div");
    bloque.className = "form-bloque";

    if (campo.tipo === "number") {
      bloque.innerHTML = `
        <label>
          ${campo.label}
          <input type="number" id="${campo.id}" value="${valor ?? ""}">
        </label>
      `;
    }

    if (campo.tipo === "boolean") {
      bloque.innerHTML = `
        <label class="check-item">
          <input type="checkbox" id="${campo.id}" ${valor ? "checked" : ""}>
          ${campo.label}
        </label>
      `;
    }

    if (campo.tipo === "select") {
      const opciones = campo.opciones
        .map(o => `<option ${o === valor ? "selected" : ""}>${o}</option>`)
        .join("");

      bloque.innerHTML = `
        <label>
          ${campo.label}
          <select id="${campo.id}">
            ${opciones}
          </select>
        </label>
      `;
    }

    if (campo.tipo === "checkbox-group") {
      bloque.innerHTML = `
    <p class="form-section-title">${campo.label}</p>
    ${campo.opciones.map(op => `
      <label class="check-item">
        <input type="checkbox"
          value="${op}"
          ${valor?.includes(op) ? "checked" : ""}>
        ${op}
      </label>
    `).join("")}
  `;
    }

    contenedor.appendChild(bloque);
  });

  // GUARDAR
  document.getElementById("form-editar-anuncio").addEventListener("submit", e => {
    e.preventDefault();

    anuncio.descripcion = document.getElementById("descripcion").value;
    anuncio.oculto = document.getElementById("oculto").checked;
    anuncio.detalles = anuncio.detalles || {};

    campos.forEach(campo => {
      if (campo.tipo === "checkbox-group") {
        anuncio.detalles[campo.id] =
          [...document.querySelectorAll(`#campos-dinamicos input[value]`)]
            .filter(i => i.checked)
            .map(i => i.value);
      } else if (campo.tipo === "boolean") {
        anuncio.detalles[campo.id] =
          document.getElementById(campo.id).checked;
      } else {
        anuncio.detalles[campo.id] =
          document.getElementById(campo.id).value;
      }
    });

    localStorage.setItem("anuncios", JSON.stringify(anuncios));
    alert("Anuncio actualizado");
    history.back();
  });

  // Volver
  document.querySelector(".btn-volver").onclick = () => history.back();
});
