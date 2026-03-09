// web-inject.js - Inyecta elementos iMirly solo en escritorio
if (window.innerWidth >= 769) {
    document.addEventListener('DOMContentLoaded', function () {

        console.log('Injecting iMorly layout for desktop...');

        // ================================
        // 1. FUNCIÓN PARA OBTENER FAVORITOS
        // ================================
        function obtenerFavoritos() {
            try {
                return JSON.parse(localStorage.getItem('favoritos') || '[]');
            } catch (e) {
                console.error('Error obteniendo favoritos:', e);
                return [];
            }
        }

        // ================================
        // 2. FUNCIÓN PARA OBTENER DATOS USUARIO
        // ================================
        function obtenerDatosUsuario() {
            const favoritosCount = obtenerFavoritos().length;
            const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Ana';

            return {
                nombre: nombreUsuario,
                favoritosCount: favoritosCount,
                mensajesCount: 0,
                notificacionesCount: 0
            };
        }

        const datosUsuario = obtenerDatosUsuario();

        // ================================
        // 3. CREAR HEADER iMirly
        // ================================
        const imorlyHeader = document.createElement('header');
        imorlyHeader.className = 'imorly-header web-only';
        imorlyHeader.innerHTML = `
            <a href="index.html" class="imorly-logo">
                <img src="assets/images/logotipo.png" alt="iMirly" class="logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="logo-circle" style="display: none;">i</div>
                <div class="logo-text" style="display: none;">iMirly</div>
            </a>
            
            <div class="header-actions">
                <a href="favoritos.html" class="header-icon" aria-label="Favoritos" id="header-favoritos">
                    <img src="assets/icons/favorito_claro.png" alt="Favoritos" onerror="this.outerHTML='❤️'">
                    ${datosUsuario.favoritosCount > 0 ? `<span class="badge" id="favoritos-badge">${datosUsuario.favoritosCount}</span>` : ''}
                </a>
                
                <a href="mensajes.html" class="header-icon" aria-label="Mensajes">
                    <img src="assets/icons/conversacion.png" alt="Mensajes" onerror="this.outerHTML='💬'">
                </a>
                
                <a href="perfil.html" class="header-icon" aria-label="Perfil ${datosUsuario.nombre}">
                    <div class="profile-icon">${datosUsuario.nombre.charAt(0).toUpperCase()}</div>
                </a>
            </div>
        `;

        // Insertar al inicio del body
        document.body.insertBefore(imorlyHeader, document.body.firstChild);

        // ================================
        // 4. CREAR BARRA DE CATEGORÍAS
        // ================================
        const categoriesBar = document.createElement('div');
        categoriesBar.className = 'categories-bar web-only';

        const categorias = ['hogar', 'clases', 'mascotas', 'deporte', 'cuidados', 'otros'];

        let categoriasHTML = `
            <div class="categories-scroll">
                <a href="index.html" class="cat-btn ${window.location.pathname.includes('index.html') || window.location.pathname === '/' ? 'active' : ''}">Todas las categorías</a>
        `;

        // Añadir cada categoría con su enlace
        categorias.forEach(cat => {
            const url = `subcategorias.html?cat=${cat}`;
            const nombreMostrado = cat.charAt(0).toUpperCase() + cat.slice(1);
            const esActiva = window.location.search.includes(`cat=${cat}`);

            categoriasHTML += `<a href="${url}" class="cat-btn ${esActiva ? 'active' : ''}">${nombreMostrado}</a>`;
        });

        categoriasHTML += '</div>';
        categoriesBar.innerHTML = categoriasHTML;

        // Insertar después del header
        document.body.insertBefore(categoriesBar, imorlyHeader.nextSibling);

        // ================================
        // AJUSTES ESPECÍFICOS FAVORITOS (DESKTOP)
        // ================================
        if (window.location.pathname.includes('favoritos.html')) {

            // Ocultar header móvil de favoritos
            const listHeader = document.querySelector('.list-header');
            if (listHeader) {
                listHeader.style.display = 'none';
            }

            // Ocultar bottom nav móvil
            const bottomNav = document.getElementById('bottom-nav');
            if (bottomNav) {
                bottomNav.style.display = 'none';
            }

            // Quitar padding reservado para bottom nav
            document.body.classList.remove('has-fixed-bottom-nav');
        }


        // ================================
        // 5. BOTÓN FLOTANTE
        // ================================
        const floatBtn = document.createElement('a');
        floatBtn.className = 'sell-float-btn web-only';
        floatBtn.href = 'nuevo-anuncio.html';
        floatBtn.innerHTML = '+';
        floatBtn.setAttribute('aria-label', 'Crear nuevo anuncio');
        document.body.appendChild(floatBtn);

        // ================================
        // 6. MEJORAR FOOTER
        // ================================
        const footer = document.getElementById('footer');
        if (footer && footer.innerHTML.trim() === '') {
            footer.innerHTML = `
                <div class="footer-container">
                    <div class="footer-column">
                        <h3>iMirly</h3>
                        <ul>
                            <li><a href="como-funciona.html">Cómo funciona</a></li>
                            <li><a href="seguridad.html">Seguridad</a></li>
                            <li><a href="prensa.html">Prensa</a></li>
                            <li><a href="trabaja-con-nosotros.html">Trabaja con nosotros</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Ayuda</h3>
                        <ul>
                            <li><a href="ayuda.html">Centro de ayuda</a></li>
                            <li><a href="reglas.html">Reglas de la comunidad</a></li>
                            <li><a href="contacto.html">Contactar</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="terminos.html">Condiciones de uso</a></li>
                            <li><a href="privacidad.html">Política de privacidad</a></li>
                            <li><a href="cookies.html">Configuración de cookies</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h3>Síguenos</h3>
                        <ul>
                            <li><a href="https://facebook.com/imirly" target="_blank">Facebook</a></li>
                            <li><a href="https://instagram.com/imirly" target="_blank">Instagram</a></li>
                            <li><a href="https://twitter.com/imirly" target="_blank">Twitter</a></li>
                            <li><a href="https://linkedin.com/company/imirly" target="_blank">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            `;
        }

        // ================================
        // 7. FUNCIÓN PARA ACTUALIZAR BADGE
        // ================================
        function actualizarBadgeFavoritos() {
            const favoritosCount = obtenerFavoritos().length;
            const favoritosLink = document.getElementById('header-favoritos');
            let badge = document.getElementById('favoritos-badge');

            if (favoritosCount > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'badge';
                    badge.id = 'favoritos-badge';
                    favoritosLink.appendChild(badge);
                }
                badge.textContent = favoritosCount;
            } else if (badge) {
                badge.remove();
            }
        }

        // ================================
        // 8. MANEJAR CLICS EN LAS TARJETAS DE CATEGORÍA
        // ================================
        const categoriaCards = document.querySelectorAll('.categoria-card');
        categoriaCards.forEach(card => {
            card.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const categoria = this.getAttribute('data-categoria');
                if (categoria) {
                    window.location.href = `subcategorias.html?cat=${categoria}`;
                }
            });
        });

        // ================================
        // 9. BOTÓN BANNER
        // ================================
        const bannerBtn = document.querySelector('.banner-btn');
        if (bannerBtn) {
            bannerBtn.addEventListener('click', function () {
                window.location.href = 'buscar.html';
            });
        }

        // ================================
        // 10. IMÁGENES DE FALLBACK
        // ================================
        // =======================================
        // IMÁGENES DE SUBCATEGORÍAS (DESKTOP)
        // =======================================
        setTimeout(() => {

            const cards = document.querySelectorAll('.categoria-card');

            cards.forEach(card => {

                const categoria = card.dataset.categoria;
                const subcategoria = card.dataset.subcategoria;

                if (!categoria || !subcategoria) return;

                const img = card.querySelector('img');
                if (!img) return;

                // Normalizar nombres
                const cat = categoria.toLowerCase().trim();
                const sub = subcategoria.toLowerCase().trim();

                // Ruta exacta a la imagen
                const src = `assets/images/subcategorias/${cat}_${sub}.jpg`;

                img.src = src;

                // Fallback
                img.onerror = function () {
                    console.warn(`Imagen no encontrada: ${src}`);
                    this.src = 'assets/images/subcategorias/default.jpg';
                };
            });

        }, 100);


        // ================================
        // 11. ESCUCHAR CAMBIOS EN FAVORITOS
        // ================================
        actualizarBadgeFavoritos();

        // Escuchar cambios en localStorage
        window.addEventListener('storage', function (e) {
            if (e.key === 'favoritos') {
                actualizarBadgeFavoritos();
            }
        });

        // También escuchar eventos personalizados
        window.addEventListener('favoritos-actualizados', actualizarBadgeFavoritos);

        // Hook para que tu código existente dispare eventos
        const originalToggleFavorito = window.toggleFavorito;
        if (typeof originalToggleFavorito === 'function') {
            window.toggleFavorito = function (id) {
                const result = originalToggleFavorito(id);
                window.dispatchEvent(new Event('favoritos-actualizados'));
                return result;
            };
        }

        // ================================
        // 12. PREVENIR COMPORTAMIENTO POR DEFECTO EN BOTONES DE CATEGORÍA
        // ================================
        setTimeout(() => {
            const catButtons = document.querySelectorAll('.categories-bar a.cat-btn');
            catButtons.forEach(btn => {
                btn.addEventListener('click', function (e) {
                    // Permitir que el enlace funcione normalmente
                    // El href ya está correctamente configurado
                });
            });
        }, 100);

        // ================================
        // 13. AJUSTES ESPECÍFICOS PARA PÁGINAS DE CATEGORÍAS
        // ================================
        if (window.location.pathname.includes('subcategorias.html')) {
            // Esta página ya tiene su propio header, asegurarnos de que no se duplique
            const existingHeader = document.querySelector('.list-header');
            if (existingHeader) {
                existingHeader.style.display = 'none';
            }
        }

        console.log('iMorly layout injected successfully!');

    });
}
