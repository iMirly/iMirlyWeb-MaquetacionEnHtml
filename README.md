<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=0:6c5ce7,100:3f51b5&height=180&section=header&text=iMirly%20Web%20Maquetaci%C3%B3n%20HTML&fontSize=55&fontColor=fff&fontAlignY=40&desc=Maquetaci%C3%B3n%20web%20con%20HTML%2C%20CSS%20y%20JavaScript%20Vanilla&descAlignY=70&descSize=18" width="100%"/>
</div>

<br>

<div align="center">
  <a href="https://appimirly.github.io/iMirlyWeb/index.html" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Demo-6c5ce7?style=for-the-badge&logo=google-chrome&logoColor=white"/>
  </a>
  <a href="https://github.com/iMirly/iMirlyWeb-MaquetacionEnHtml" target="_blank">
    <img src="https://img.shields.io/badge/Código-3f51b5?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
  <img src="https://img.shields.io/badge/Status-MVP-FFA500?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-6c5ce7?style=for-the-badge&logo=html5&logoColor=white" alt="Frontend" />
  <img src="https://img.shields.io/badge/PWA-Ready-3f51b5?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA" />
</div>

<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=6c5ce7&center=true&vCenter=true&width=600&lines=HTML5+%2B+CSS3+%2B+JavaScript+Vanilla;Diseño+mobile-first+responsive;PWA+con+manifest+y+service+worker;Autenticación+simulada+con+localStorage;Catálogo+de+servicios+con+filtros;Publicación+de+anuncios+en+2+pasos"/>
</div>

# 🚀 Sobre el Proyecto

**iMirly Web Maquetación HTML** es una **versión web funcional** del marketplace de servicios iMirly, desarrollada completamente con **HTML, CSS y JavaScript vanilla** sin frameworks ni dependencias externas. Simula la experiencia de la app nativa en un entorno web, permitiendo navegar por categorías, publicar anuncios, gestionar favoritos y administrar el perfil de usuario.

✨ Características principales:

- 📱 **Diseño mobile-first** con experiencia de app nativa
- 🖥️ **Responsive completo** con layout específico para desktop (`web.css`)
- 📲 **PWA lista** con manifest.json e iconos adaptativos
- 🔐 **Autenticación simulada** con persistencia en localStorage
- 📂 **Catálogo de servicios** organizado por categorías y subcategorías
- 🔍 **Buscador inteligente** que busca en categorías, subcategorías y anuncios
- ❤️ **Sistema de favoritos** con persistencia en localStorage
- ➕ **Publicación de anuncios** en 2 pasos con formularios dinámicos
- 👤 **Perfil de usuario** con edición de datos, cambio de contraseña y eliminación de cuenta
- 💰 **Monedero virtual** con visualización de saldo

# 🧠 Contexto del Proyecto

Este proyecto surge como **versión web de demostración** del TFC (Trabajo Fin de Ciclo) **iMirly**, desarrollado en el ciclo de **DAM (Desarrollo de Aplicaciones Multiplataforma)** en **NDT NewDigitalTalent · Granada**.

El objetivo era crear una **maquetación web funcional y desplegable** que permitiera:

- Mostrar la interfaz y flujos de la app sin necesidad de compilar Android
- Compartir fácilmente mediante un enlace web accesible desde cualquier dispositivo
- Validar la experiencia de usuario con stakeholders antes del desarrollo nativo
- Servir como **prototipo interactivo** para el diseño final de la app

> Esta versión web es una **recreación frontend pura** que mantiene la estética y funcionalidades clave de la app nativa, utilizando solo tecnologías base de la web.

# 🖼️ Capturas

> 📷 `[captura: pantalla principal de iMirlyWeb]`
<img src="https://github.com/user-attachments/assets/c7f2baea-91fd-4c83-a01d-b719d51698da" alt="Captura de iMirlyWeb" width="800"/>

# 🖼️ Diseño del Proyecto

El diseño visual se adapta directamente del sistema de diseño de la app nativa:

- 🎨 **Paleta de colores** en OKLCH (morado `#6C5CE7`, verde éxito, rojo destructivo)
- 📐 **Tipografías** Inter (cuerpo) y Plus Jakarta Sans (títulos)
- 📱 **Mobile-first** con navegación inferior tipo app
- 🖥️ **Layout desktop** con header web, barra de categorías y footer completo
- ✨ **Gradientes y sombras** consistentes con la identidad de marca
- 🎯 **Bottom navigation** en móvil / Header con acciones en desktop

> El objetivo fue mantener fidelidad visual al 100% con la app nativa, priorizando la experiencia móvil.

# 🛠️ Tecnologías

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-6c5ce7?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-3f51b5?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-6c5ce7?style=for-the-badge&logo=javascript&logoColor=white"/>
  <img src="https://img.shields.io/badge/PWA-3f51b5?style=for-the-badge&logo=pwa&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Pages-6c5ce7?style=for-the-badge&logo=github&logoColor=white"/>
</p>

**Frontend:** HTML5 semántico, CSS3 (Flexbox/Grid, variables CSS), JavaScript vanilla (ES6+)  
**Estilos:** Mobile-first con `mobile.css` + desktop con `web.css` (media query `min-width: 769px`)  
**Persistencia:** localStorage (usuario, favoritos, anuncios, sesión)  
**PWA:** Manifest.json con theme color `#7864D7`, iconos 192x192 y 512x512  
**Deploy:** GitHub Pages (sitio estático 100%)

# 🧩 Arquitectura del Proyecto

```bash
iMirlyWeb/
│
├── index.html                    # Home con banner y categorías destacadas
├── welcome.html                  # Pantalla de bienvenida (onboarding)
├── login.html                    # Inicio de sesión
├── registro.html                 # Crear cuenta
├── anuncios.html                 # Listado de anuncios por categoría/subcategoría
├── anuncio-detalle.html          # Detalle completo de un anuncio
├── favoritos.html                # Lista de anuncios favoritos
├── nuevo-anuncio.html            # Paso 1: Datos básicos del anuncio
├── nuevo-anuncio-detalle.html    # Paso 2: Formulario dinámico por subcategoría
├── subcategorias.html            # Grid de subcategorías por categoría
├── perfil.html                   # Perfil de usuario con menú de opciones
├── mis-anuncios.html             # Listado de anuncios publicados por el usuario
├── editar-anuncio.html           # Edición de anuncio existente
├── editar-perfil.html            # Edición de datos personales
├── cambiar-contrasena.html       # Cambio de contraseña
├── saldo.html                    # Visualización de saldo disponible
├── que-es-imirly.html            # FAQ acordeón sobre la plataforma
├── sobre-imirly.html             # Legal: términos, privacidad, cookies
├── documento.html                # Visor de PDFs (términos, privacidad, cookies)
├── contacto.html                 # Formulario de contacto con soporte
├── ayuda.html                    # Centro de ayuda con categorías
├── 404.html                      # Página de "en construcción"
│
├── css/
│   ├── mobile.css                # Estilos mobile-first (base)
│   └── web.css                   # Estilos desktop (min-width: 769px)
│
├── js/
│   ├── app.js                    # Core global: layout, buscador, favoritos, helpers
│   ├── auth.js                   # Login y registro con localStorage
│   ├── auth-check.js             # Guard de rutas protegidas
│   ├── guard.js                  # Redirección si no hay sesión
│   ├── init.js                   # Inicialización de la app
│   ├── bottom_nav.js             # Navegación inferior con marca activa
│   ├── web-inject.js             # Inyección de layout desktop (header, footer, categorías)
│   ├── subcategorias.js          # Carga dinámica de subcategorías
│   ├── anuncios.js               # Listado y filtrado de anuncios
│   ├── anuncio-detalle.js        # Detalle de anuncio con favoritos
│   ├── favoritos.js              # Gestión de lista de favoritos
│   ├── filtros.js                # Panel de filtros dinámicos
│   ├── form-builder.js           # Construcción de formularios por subcategoría
│   ├── nuevo-anuncio.js          # Lógica del paso 1 de publicación
│   ├── perfil.js                 # Perfil: datos, resumen, cerrar sesión
│   ├── mis-anuncios.js           # Listado de anuncios del usuario
│   ├── editar-anuncio.js         # Edición de anuncio con campos dinámicos
│   ├── editar-perfil.js          # Edición de perfil con avatar
│   ├── cambiar-contrasena.js     # Cambio de contraseña
│   ├── faq.js                    # Acordeón de preguntas frecuentes
│   └── documentos.js             # Navegación de documentos legales
│
├── partials/
│   ├── header.html               # Header móvil con buscador
│   ├── footer.html               # Footer con enlaces legales y redes
│   └── bottom-nav.html           # Navegación inferior (5 pestañas)
│
├── data/
│   ├── subcategorias.json        # Categorías y subcategorías con imágenes
│   ├── anuncios_mock.json        # Anuncios de demo
│   ├── formularios.json          # Configuración de campos por subcategoría
│   └── provincias.json          # Listado de provincias de España
│
├── assets/
│   ├── images/                   # Imágenes de categorías, subcategorías, logos
│   └── icons/                    # Iconos de la interfaz (PNG)
│
├── manifest.json                 # Configuración PWA
├── icon-192.png                  # Icono PWA pequeño
└── icon-512.png                  # Icono PWA grande
```

# 📱 Funcionalidades

### 🏠 Home
- Header con buscador inteligente (categorías + anuncios)
- Banner hero con CTA
- Grid de 6 categorías destacadas con imágenes

### 🔍 Categorías y Subcategorías
- Navegación jerárquica: Categoría → Subcategoría → Anuncios
- Carga dinámica de subcategorías desde JSON
- Slugificación de nombres para URLs limpias

### 📂 Anuncios
- Listado paginado con cards (avatar, nombre, precio, descripción)
- Filtros dinámicos según la subcategoría (precio, booleanos, checkbox-groups)
- Búsqueda en título y descripción
- Exclusión de anuncios propios en exploración

### ❤️ Favoritos
- Guardar/quitar con icono de corazón en cards y detalle
- Persistencia en localStorage
- Lista compacta con acceso rápido desde bottom-nav

### ➕ Publicar Anuncio (2 Pasos)
- **Paso 1:** Categoría, subcategoría, provincia, título, descripción
- **Paso 2:** Formulario dinámico según subcategoría (precio, disponibilidad, servicio a domicilio...)
- Validación de campos obligatorios
- Almacenamiento en localStorage

### 👤 Perfil y Gestión de Cuenta
- Visualización de datos personales y avatar
- Edición de perfil (nombre, email, avatar con FileReader)
- Cambio de contraseña con validación
- Eliminar cuenta con confirmación modal
- Cerrar sesión con modal de confirmación

### 💰 Monedero
- Visualización de saldo disponible
- Simulación de transferencia a cuenta bancaria
- Mensaje informativo sobre cobros

### 📚 Legal y Ayuda
- FAQ acordeón con 10 preguntas frecuentes
- Documentos legales (términos, privacidad, cookies) en visor PDF
- Formulario de contacto con soporte
- Centro de ayuda por categorías

# 🚀 Cómo usar

### Probar la versión desplegada sin necesidad de clonar:

<p align="center">
  <a href="https://appimirly.github.io/iMirlyWeb/index.html">
    <img src="https://img.shields.io/badge/🌐_Abrir-6c5ce7?style=for-the-badge&labelColor=3f51b5"/>
  </a>
</p>

### Ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/iMirly/iMirlyWeb-MaquetacionEnHtml.git

# Entrar al directorio
cd iMirlyWeb-MaquetacionEnHtml

# Abrir en cualquier navegador (no requiere servidor)
# En Windows:
start index.html
# En macOS:
open index.html
# En Linux:
xdg-open index.html
```

### Desplegar en GitHub Pages

1. Sube el repositorio a GitHub
2. Ve a **Settings → Pages → Source** y selecciona la rama `main`
3. Tu sitio estará en: `https://tuusuario.github.io/iMirlyWeb-MaquetacionEnHtml/`

---

## 📚 Lo que aprendí con este proyecto

- **HTML semántico y accesibilidad:** Estructura correcta de landmarks, ARIA labels y navegación por teclado
- **CSS moderno:** Variables CSS, Flexbox, Grid, media queries y diseño mobile-first
- **JavaScript vanilla avanzado:** Manipulación del DOM, event delegation, FileReader, localStorage
- **PWA básica:** Manifest.json, iconos adaptativos y configuración para instalación
- **Inyección de layouts:** Carga dinámica de partials (header, footer, nav) con fetch API
- **Formularios dinámicos:** Construcción de campos según configuración JSON por subcategoría
- **Filtros inteligentes:** Sistema de filtrado con múltiples tipos de campos (range, checkbox, boolean)
- **Buscador unificado:** Búsqueda simultánea en categorías, subcategorías y contenido de anuncios
- **Gestión de estado sin frameworks:** Patrón de módulos JS y localStorage como "base de datos"
- **Responsive real:** Dos hojas de estilo completas (mobile + desktop) con experiencias diferenciadas

# 🔗 Repositorios Relacionados

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <h3>iMirly (App Nativa)</h3>
        <p>Kotlin + Jetpack Compose + Spring Boot</p>
        <a href="https://github.com/iMirly/iMirly">
          <img src="https://img.shields.io/badge/Ver_repositorio-6c5ce7?style=for-the-badge&logo=github&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="33%">
        <h3>iMirly Web MVP</h3>
        <p>Demo web con Vite + React 19 + Tailwind</p>
        <a href="https://github.com/iMirly/iMirlyWeb-MVP">
          <img src="https://img.shields.io/badge/Ver_repositorio-3f51b5?style=for-the-badge&logo=github&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="33%">
        <h3>iMirlyAppBackend</h3>
        <p>API REST + Admin Panel</p>
        <a href="https://github.com/iMirly/iMirlyAppBackend">
          <img src="https://img.shields.io/badge/Ver_repositorio-6c5ce7?style=for-the-badge&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
  </table>
</div>

# 🎯 Mejoras futuras

- 🔗 **Conexión con backend real** (API REST de iMirlyAppBackend)
- 🔔 **Service Worker** para funcionamiento offline completo
- 🗺️ **Geolocalización** real para mostrar servicios cercanos
- 💳 **Integración de pagos** simulada (Stripe/PayPal)
- 🌙 **Modo oscuro** completo con toggle
- 📸 **Subida de imágenes** a cloud storage
- 🧪 **Tests E2E** con Playwright o Cypress
- ♿ **Mejora de accesibilidad** (WCAG 2.1 AA)
- 🌍 **Internacionalización** (i18n) para multiidioma

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6c5ce7,100:3f51b5&height=100&section=footer" width="100%"/>
</div>

<div align="center">
  <sub>© 2025 iMirly — Todos los derechos reservados</sub>
</div>
