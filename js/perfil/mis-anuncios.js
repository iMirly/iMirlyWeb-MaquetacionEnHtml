function obtenerPrecioResumen(anuncio) {
  const d = anuncio.detalles || {};

  if (d.precio_hora) return `${d.precio_hora}€ / h`;
  if (d.precio_sesion) return `${d.precio_sesion}€ / sesión`;
  if (d.precio_servicio) return `${d.precio_servicio}€ / servicio`;

  return '—';
}

document.addEventListener("DOMContentLoaded", () => {

  const lista = document.getElementById("listaAnuncios");
  const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];

  if (anuncios.length === 0) {
    lista.innerHTML = "<p>No tienes anuncios todavía</p>";
    return;
  }

  anuncios.forEach(anuncio => {

    const card = document.createElement("div");
    card.className = "anuncio-card";
    if (anuncio.oculto) card.classList.add("oculto");

    card.innerHTML = `
      <div class="anuncio-avatar"></div>

      <div class="anuncio-info">
        <div class="anuncio-titulo">${anuncio.titulo}</div>
        <div class="anuncio-sub">${anuncio.categoria} · ${anuncio.provincia}</div>
        <div class="anuncio-precio">${obtenerPrecioResumen(anuncio)}</div>
      </div>
    `;

    //  Preparado para ir al detalle
    card.addEventListener("click", () => {
      window.location.href = `editar-anuncio.html?id=${anuncio.id}`;
    });

    lista.appendChild(card);
  });

  // Volver
  const btnVolver = document.querySelector(".btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => history.back());
  }

});
