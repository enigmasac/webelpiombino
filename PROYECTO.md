# Template Web para Restaurantes — Documentacion Tecnica

Basado en el proyecto **El Piombino** (test.elpiombino.com). Este documento sirve como guia para replicar y adaptar la web a otros restaurantes.

---

## 1. Stack Tecnologico

| Tecnologia | Version | Rol |
|---|---|---|
| React | 19 | UI framework |
| Vite | 6 | Build tool + dev server |
| Tailwind CSS | v4 | Estilos utility-first |
| Motion (framer-motion) | 12 | Animaciones |
| React Router | v7 | SPA routing |

**Solo 4 dependencias de produccion**: react, react-dom, react-router-dom, motion.

### Instalacion

```bash
npm install
npm run dev      # desarrollo en localhost:3000
npm run build    # build de produccion en dist/
```

---

## 2. Estructura del Proyecto

```
frontend/
├── public/
│   ├── images/
│   │   ├── hero/           # 4 fotos para el carousel principal
│   │   ├── favorites/      # 6 fotos de productos destacados
│   │   ├── menu/           # 100+ fotos de platos (600x600, quality 80)
│   │   ├── logo.png        # Logo horizontal
│   │   ├── logo-vertical.png # Logo con isotipo + texto
│   │   ├── rappi-icon.png  # Icono de Rappi
│   │   ├── gmaps-icon.png  # Icono de Google Maps
│   │   └── waze-icon.png   # Icono de Waze
│   ├── carta.pdf           # Menu en PDF descargable
│   ├── favicon.png         # 256x256, isotipo con padding
│   ├── favicon.ico         # 32x32
│   ├── apple-touch-icon.png # 180x180, fondo cream
│   ├── og-image.jpg        # 1200x630, para WhatsApp/iMessage/redes
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Paginas (lazy loaded)
│   ├── data/               # Datos del restaurante (facilmente reemplazables)
│   ├── hooks/              # Custom hooks
│   ├── App.jsx             # Router principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Theme Tailwind + animaciones
├── index.html              # Meta tags, SEO, schema.org
├── vite.config.js
└── package.json
```

---

## 3. Sistema de Diseño

### Paleta de Colores (index.css)

```css
--color-brown: #5B3327;   /* Color principal: headings, fondos oscuros, textos */
--color-beige: #ECDFCF;   /* Fondo alterno de secciones */
--color-blue:  #004459;   /* Acento: botones, precios, links activos */
--color-cream: #FAF6F1;   /* Fondo claro, tarjetas */
--color-line:  #D4C3AF;   /* Bordes, separadores */
```

**Para adaptar a otro restaurante**: cambiar estas 5 variables CSS. Todo el sitio se actualiza automaticamente.

### Tipografia

```css
--font-heading: "Arvo", serif;       /* Titulos (solo bold 700) */
--font-body: "Montserrat", sans-serif; /* Cuerpo (200-700) */
```

Se cargan via Google Fonts en `index.html`. Para otro restaurante, cambiar los imports y estas variables.

### Animaciones Custom

- `fade-up`: entrada desde abajo (24px) con opacidad — para secciones
- `fade-in`: solo opacidad — para elementos sutiles
- `slide-in`: entrada desde izquierda (-16px) — para listas
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out, muy suave)

### Responsive

- Mobile: 1 columna, bottom nav visible, WhatsApp bubble oculta
- Tablet (md): 2 columnas en grids
- Desktop (lg): layout completo, navbar superior, WhatsApp bubble flotante

---

## 4. Archivos de Datos (lo que se reemplaza por restaurante)

Todo el contenido del restaurante esta centralizado en `src/data/`. Para un nuevo restaurante, solo hay que modificar estos archivos:

### `data/locations.js` — Locales

```js
export const locations = [
  {
    id: "san-miguel",          // slug unico
    name: "San Miguel",        // nombre del local
    address: "Av. Rafael Escardo 711, San Miguel",
    phone: "979 782 761",      // sin +51, se agrega en el codigo
    hours: "Lun - Dom: 8:00 am - 10:00 pm",
    lat: -12.0769,             // coordenadas para mapa
    lng: -77.0886,
    mapsUrl: "https://maps.google.com/?q=...",
    wazeUrl: "https://www.waze.com/ul?ll=...",
    orderUrl: "https://pedidos.elpiombino.pe/san-miguel",
    razonSocial: "Inversiones Alimentarias Umarol SAC", // para libro reclamaciones
    ruc: "20547254776",                                  // para libro reclamaciones
  },
  // ... mas locales
];
```

**Usado por**: WhatsAppBubble, MobileBottomNav, Locales, LibroReclamaciones, OrderCTA.

### `data/menu.js` — Carta Completa

```js
export const menuCategories = [
  {
    id: "desayunos",       // para scroll y tabs
    name: "Desayunos",     // titulo visible
    subtitle: "Los Clasicos de la Casa", // opcional
    subcategories: [
      {
        name: "Desayunos",
        note: "Nota opcional", // ej: "No incluyen tostadas"
        items: [
          {
            name: "Desayuno Continental",
            description: "Jugo de papaya, mermelada, mantequilla, tostadas y cafe.", // opcional
            price: 18.5, // numero, no string
          },
          // ... mas items
        ],
      },
      // ... mas subcategorias
    ],
  },
  // ... 12 categorias total
];
```

**Categorias del Piombino (12)**: Desayunos, Sandwiches, Hamburguesas, Platos, Variedades, Ensaladas, Jugos, Helados, Cafes, Postres, Bebidas, Cocktails.

### `data/menuImages.js` — Fotos de Platos

```js
export const menuImages = {
  "Lomo saltado (Lomo fino)": "/images/menu/lomo-saltado-lomo-fino.jpg",
  "Tiramisu": "/images/menu/tiramisu.jpg",
  // ... 104 items mapeados
};
```

El nombre debe coincidir **exactamente** con el `name` del item en `menu.js`. Los items con foto muestran un icono de camara y al hacer click abren un modal con la imagen.

### `data/favorites.js` — Productos Destacados (Home)

```js
export const favorites = [
  {
    id: 1,
    name: "Tres Leches",
    category: "Postres",
    itemSlug: "item-tres-leches", // para scroll a la carta (id del DOM)
    image: "/images/favorites/tres-leches.jpg",
  },
  // ... 6 favoritos
];
```

Click en favorito muestra popover con "Pedir online" y "Ver en carta" (scroll al item exacto).

### `data/navigation.js` — Links y Redes

```js
export const navLinks = [
  { label: "Inicio", path: "/" },
  { label: "Carta", path: "/carta" },
  { label: "Historia", path: "/historia" },
  { label: "Locales", path: "/locales" },
  { label: "Contacto", path: "/contacto" },
];

export const socialLinks = [
  { label: "Instagram", url: "https://...", icon: "instagram" },
  { label: "Facebook", url: "https://...", icon: "facebook" },
  { label: "TikTok", url: "https://...", icon: "tiktok" },
  { label: "Rappi", url: "https://...", icon: "rappi" },
];

export const whatsappNumber = "51999999999";
export const contactEmail = "contacto@elpiombino.pe";
```

---

## 5. Paginas y Componentes

### Paginas (lazy loaded)

| Ruta | Archivo | Descripcion |
|---|---|---|
| `/` | Home.jsx | Hero carousel + Favoritos + CTA pedidos |
| `/carta` | Carta.jsx | Menu interactivo con busqueda, tabs, fotos |
| `/historia` | Historia.jsx | Historia del restaurante |
| `/locales` | Locales.jsx | Tarjetas de cada local con mapa, Waze, horarios |
| `/contacto` | Contacto.jsx | Formulario de contacto |
| `/trabaja-con-nosotros` | TrabajaConNosotros.jsx | Formulario de empleo |
| `/libro-reclamaciones` | LibroReclamaciones.jsx | Libro de reclamaciones (requerido por ley en Peru) |
| `/proveedores` | Proveedores.jsx | Informacion para proveedores |

### Componentes Globales (siempre visibles)

| Componente | Descripcion |
|---|---|
| **Navbar** | Fijo en top, logo + links. Se oculta al scroll down, reaparece al scroll up. Transparente en hero, solido despues. |
| **Footer** | Fondo brown, logo, links de navegacion, redes sociales, copyright, credito desarrollador. |
| **WhatsAppBubble** | Solo desktop (lg+). Boton flotante bottom-right. Click abre selector de local → wa.me/51{phone}. |
| **MobileBottomNav** | Solo mobile. Barra inferior con 5 tabs: Menu (hamburguesa), Carta, Pide Aqui (CTA central), Locales, WhatsApp. |
| **CookieConsent** | Banner de consentimiento de cookies. |

### Carta.jsx — Componentes Internos

| Componente | Funcion |
|---|---|
| **CategoryGrid** | Grid de iconos de categorias (scroll horizontal en mobile). Click = scroll a seccion. |
| **MenuItem** | Tarjeta de item: nombre + linea punteada + precio. Icono camara si tiene foto. |
| **CategorySection** | Seccion completa: titulo, subcategorias, grid de items. |
| **PhotoBreak** | Imagen fullwidth entre secciones (parallax zoom-in). |
| **PhotoModal** | Modal fullscreen al click en item con foto: imagen, nombre, descripcion, precio, boton "Pedir". |
| **SearchResults** | Resultados filtrados cuando el usuario busca. |

---

## 6. Funcionalidades Clave

### Menu Interactivo (Carta)
- **Barra sticky**: input de busqueda + tabs de categorias (scroll horizontal)
- **Busqueda en tiempo real**: filtra items por nombre, oculta tabs
- **Tab activo**: se resalta segun la seccion visible (IntersectionObserver no implementado, se activa por click)
- **Scroll suave**: click en tab → scrollIntoView smooth
- **Fotos de platos**: 104 items tienen foto, click abre modal
- **Photo breaks**: imagenes intercaladas entre secciones para dar ritmo visual
- **Aviso legal**: "Todos los precios incluyen IGV. Algunos platos pueden contener alergenos."
- **Descarga PDF**: link al final para descargar carta.pdf

### Favoritos (Home)
- Grid 2x3 (mobile) / 3x2 (desktop) con fotos reales
- Click abre popover: "Pedir online" (→ seccion pedidos) o "Ver en carta" (→ scroll al item exacto en /carta)
- Nombre y categoria sobre la foto con gradient overlay

### WhatsApp — Selector de Local
- **Desktop**: burbuja flotante → popover con 3 locales → abre wa.me
- **Mobile**: tab en bottom nav y card en menu hamburguesa → panel fullscreen con 3 locales → abre wa.me
- Cada local muestra nombre, direccion, telefono y boton "Abrir chat"

### Libro de Reclamaciones
- Selector de local (cada uno tiene su razon social y RUC)
- Muestra datos del proveedor dinamicamente
- Formulario completo: datos personales, bien contratado, detalle del reclamo
- POST a `/api/complaints` (backend requerido)

### SEO y Social
- Schema.org JSON-LD: Organization + 3 Restaurant + WebSite
- Open Graph: og:image JPG 1200x630, og:title, og:description
- Twitter Cards: summary_large_image
- Canonical URL
- Sitemap.xml + robots.txt
- Favicons: .ico 32x32, .png 256x256, apple-touch-icon 180x180

---

## 7. Optimizacion de Imagenes

### Proceso para fotos de menu
```bash
# Desde un directorio de fotos stock, optimizar a 600x600 max, quality 80
magick input.jpg -resize 600x600\> -quality 80 output.jpg
```

### Proceso para favoritos
```bash
# 800x800 max, quality 80
magick input.jpg -resize 800x800\> -quality 80 output.jpg
```

### Favicon desde isotipo
```bash
# 1. Extraer isotipo del logo vertical (crop sin texto)
magick logo-vertical.png -crop WxH+X+Y +repage -trim +repage isotipo.png

# 2. Centrar en canvas cuadrado con padding
magick isotipo.png -background transparent -gravity center -extent 2400x2400 favicon-base.png

# 3. Generar todas las versiones
magick favicon-base.png -resize 256x256 favicon.png
magick favicon-base.png -resize 32x32 favicon.ico
magick favicon-base.png -background "#FAF6F1" -flatten -resize 180x180 apple-touch-icon.png
```

### og-image
1200x630 JPG. Logo centrado sobre fondo del color principal del restaurante.

---

## 8. Deploy en Apache (Virtualmin)

### Requisitos del servidor
- Apache con mod_rewrite habilitado
- Certificado SSL (Let's Encrypt via certbot)
- Virtualmin para gestion de dominios

### .htaccess para SPA routing
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**IMPORTANTE**: Vite borra `dist/` en cada build. Hay que recrear `.htaccess` despues de cada `npm run build`.

### Proceso de deploy
```bash
# 1. Build
npm run build

# 2. Recrear .htaccess
cat > dist/.htaccess << 'EOF'
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOF

# 3. Subir archivos al servidor
scp -i ~/.ssh/KEY.pem -r dist/* dist/.htaccess USER@SERVER:/tmp/deploy/

# 4. Sincronizar con el directorio publico (excluir carpetas de Virtualmin)
ssh -i ~/.ssh/KEY.pem USER@SERVER \
  "sudo rsync -a --delete \
    --exclude='icon' --exclude='awstats' --exclude='cgi-bin' \
    /tmp/deploy/ /home/DOMAIN/domains/SUBDOMAIN/public_html/ && \
   sudo chown -R DOMAIN:DOMAIN /home/DOMAIN/domains/SUBDOMAIN/public_html/ && \
   sudo chmod 755 /home/DOMAIN/domains/SUBDOMAIN/public_html/"
```

### SSL con Let's Encrypt
```bash
# Generar certificado
sudo certbot certonly --webroot -w /home/DOMAIN/domains/SUBDOMAIN/public_html/ -d SUBDOMAIN

# Configurar en Apache vhost (443)
SSLCertificateFile /etc/letsencrypt/live/SUBDOMAIN/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/SUBDOMAIN/privkey.pem
```

### Errores comunes
- **403 Forbidden**: permisos del directorio public_html deben ser 755
- **Pagina en blanco**: assets JS/CSS no desplegados correctamente (rsync anidado)
- **og:image no carga en WhatsApp**: usar URL absoluta con https, formato JPG, 1200x630

---

## 9. Checklist para Nuevo Restaurante

### Datos a recopilar del cliente
- [ ] Nombre del restaurante
- [ ] Logo horizontal + logo vertical/isotipo (PNG con transparencia, alta resolucion)
- [ ] Paleta de colores (o dejar que elijamos)
- [ ] Tipografias preferidas (o elegir nosotros)
- [ ] Carta/menu completa con precios
- [ ] Fotos de platos (stock o propias)
- [ ] Locales: nombre, direccion, telefono, horarios, coordenadas GPS
- [ ] Redes sociales: Instagram, Facebook, TikTok
- [ ] Link de Rappi / delivery
- [ ] Razon social y RUC por local (para libro de reclamaciones)
- [ ] Datos de contacto: email, telefono principal
- [ ] 4 fotos para hero carousel
- [ ] 6 productos destacados (favoritos)
- [ ] Historia del restaurante (texto + fotos opcionales)
- [ ] Carta en PDF (descargable)
- [ ] Dominio y hosting

### Archivos a modificar
- [ ] `index.html` — titulo, meta tags, schema.org, Google Fonts, og:image
- [ ] `index.css` — colores y tipografias del tema
- [ ] `data/locations.js` — locales del restaurante
- [ ] `data/menu.js` — carta completa
- [ ] `data/menuImages.js` — mapeo de fotos a items
- [ ] `data/favorites.js` — 6 favoritos
- [ ] `data/navigation.js` — links, redes sociales, whatsapp, email
- [ ] `public/images/` — todas las imagenes
- [ ] `public/favicon.*` + `apple-touch-icon.png` — favicons desde isotipo
- [ ] `public/og-image.jpg` — imagen para compartir en redes
- [ ] `public/carta.pdf` — menu en PDF
- [ ] `public/sitemap.xml` — URLs del sitio
- [ ] `components/Footer.jsx` — credito desarrollador (mantener Enigma Developers)

### Componentes que NO se tocan (reutilizables tal cual)
- Navbar (lee de navigation.js)
- MobileBottomNav (lee de locations.js)
- WhatsAppBubble (lee de locations.js)
- CookieConsent
- Carta.jsx (lee de menu.js + menuImages.js)
- LibroReclamaciones.jsx (lee de locations.js)
- Locales.jsx (lee de locations.js)
- HeroCarousel (solo cambiar imagenes en public/images/hero/)

---

## 10. Code Splitting

Vite genera chunks optimizados:

```js
// vite.config.js
manualChunks: {
  vendor: ["react", "react-dom", "react-router-dom"],  // ~48 KB gzip
  animations: ["motion"],                               // ~31 KB gzip
}
```

Cada pagina es lazy loaded: solo se descarga cuando el usuario navega a ella.

---

## 11. API Backend (pendiente/opcional)

El frontend tiene preparado:
- **Proxy en dev**: `/api` → `http://localhost:4000`
- **Libro de reclamaciones**: POST `/api/complaints` con JSON del formulario
- **Contacto**: formulario listo para conectar a endpoint
- **Trabaja con nosotros**: formulario listo para conectar a endpoint

Para produccion, se necesita un backend (Node/Express, PHP, etc.) o se pueden reemplazar por servicios como Formspree, EmailJS, etc.
