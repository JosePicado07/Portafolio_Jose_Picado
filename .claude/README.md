# José Picado - Data Engineer Portfolio

**Portafolio web profesional construido con HTML5, CSS3, JavaScript vanilla y Bootstrap 5.**

Proyecto académico para Universidad Cenfotec - Curso de Desarrollo de Software.

🔗 **Live Site:** [https://josepicado07.github.io/Portaflio_Jose_Picado/](https://josepicado07.github.io/Portaflio_Jose_Picado/)

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación Local](#instalación-local)
- [Configuración EmailJS](#configuración-emailjs)
- [Deployment a GitHub Pages](#deployment-a-github-pages)
- [Checklist Pre-Deployment](#checklist-pre-deployment)
- [Personalización](#personalización)
- [Requisitos Académicos](#requisitos-académicos)
- [Contacto](#contacto)

---

## 📖 Descripción

Portafolio web profesional de José Andrés Picado Corrales, Data Engineer especializado en pipelines ETL, optimización de procesos y arquitectura de datos escalable.

**Objetivo dual:**
1. Cumplir requisitos académicos (30% del curso universitario)
2. Herramienta de marketing profesional para oportunidades laborales como Senior Data Engineer

**Slogan:** *"Precision in Process, Power in Performance"*

---

## ✨ Características

### Funcionalidades Principales
- ✅ **5 secciones de contenido:** Hero, About, Projects, Skills, Contact
- ✅ **Switch idioma ES/EN:** Sistema completo de traducción en JavaScript
- ✅ **Galería interactiva:** 4 proyectos con descripción, tecnologías e impacto
- ✅ **Formulario contacto:** Validación JavaScript + integración EmailJS
- ✅ **Botón WhatsApp flotante:** Link directo a +506 8475-6191
- ✅ **Scroll-to-top button:** Aparece después de 300px de scroll
- ✅ **Botón descarga CV:** PDF disponible para descarga
- ✅ **Favicon personalizado:** Logo de marca personal
- ✅ **Animaciones AOS:** Animaciones sutiles on-scroll
- ✅ **100% Responsive:** Diseño adaptable mobile-first
- ✅ **GitHub Pages deployment:** Hosting gratuito

### Diseño
- **Paleta de colores (60-30-10):**
  - Primary: `#f9fbfc` (60% - Fondos)
  - Secondary: `#203c86` (30% - Estructura)
  - Accent: `#33af7f` (10% - CTAs)
  - Support: `#4b77bb` (Apoyo)

- **Tipografía:**
  - Títulos: 'Exo 2' Bold (Google Fonts)
  - Contenido: 'Inter' (Google Fonts)

---

## 🛠️ Tecnologías

### Stack Principal
- **HTML5:** Estructura semántica
- **CSS3:** Diseño responsive con variables CSS
- **JavaScript (Vanilla):** Funcionalidad interactiva
- **Bootstrap 5.3.0:** Framework CSS (CDN únicamente)

### Librerías CDN
```html
<!-- Bootstrap 5 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Font Awesome 6.4.0 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- AOS Animations -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Exo+2:wght@700&display=swap" rel="stylesheet">

<!-- EmailJS (opcional) -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

### Herramientas
- **Git/GitHub:** Control de versiones
- **GitHub Pages:** Hosting
- **VS Code:** Editor de código (recomendado)

---

## 📂 Estructura del Proyecto

```
Portaflio_Jose_Picado/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos personalizados
├── js/
│   ├── main.js             # Funcionalidad principal
│   └── language.js         # Sistema de traducción ES/EN
├── images/
│   ├── favicon.ico         # Favicon del sitio
│   ├── profile.jpg         # Foto de perfil (reemplazar placeholder)
│   └── projects/           # Imágenes de proyectos
├── assets/
│   └── CV_Jose_Picado_EN.pdf  # CV en PDF
├── README.md               # Este archivo
└── .gitignore              # Archivos ignorados por Git
```

---

## 💻 Instalación Local

### Opción 1: Navegador directo (más simple)

1. Clona el repositorio:
```bash
git clone https://github.com/josepicado07/Portaflio_Jose_Picado.git
cd Portaflio_Jose_Picado
```

2. Abre `index.html` directamente en tu navegador

### Opción 2: Servidor local (recomendado)

Con Python:
```bash
# Python 3
python -m http.server 8000

# Abre http://localhost:8000 en tu navegador
```

Con Node.js (live-server):
```bash
npm install -g live-server
live-server
```

Con VS Code:
- Instala extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

---

## 📧 Configuración EmailJS

Para habilitar el formulario de contacto funcional:

### Paso 1: Crear cuenta EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Configurar servicio de email
1. En el dashboard, ve a "Email Services"
2. Click "Add New Service"
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones de autenticación
5. Guarda el **Service ID**

### Paso 3: Crear template de email
1. Ve a "Email Templates"
2. Click "Create New Template"
3. Usa esta estructura:
```
Asunto: Nuevo mensaje de {{ from_name }}

De: {{ from_name }} ({{ from_email }})

Mensaje:
{{ message }}
```
4. Guarda el **Template ID**

### Paso 4: Obtener Public Key
1. Ve a "Account" → "General"
2. Copia tu **Public Key**

### Paso 5: Configurar en el código

En `index.html` (línea ~535):
```html
<!-- Descomenta esta línea -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

En `js/main.js` (línea ~139):
```javascript
// Descomenta y reemplaza con tus valores:
emailjs.init('TU_PUBLIC_KEY');

emailjs.send('TU_SERVICE_ID', 'TU_TEMPLATE_ID', {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_name: 'José Picado'
})
```

### Paso 6: Probar
1. Guarda los cambios
2. Recarga la página
3. Envía un mensaje de prueba
4. Verifica tu email

---

## 🚀 Deployment a GitHub Pages

### Método 1: Via GitHub Web Interface

1. **Sube tu código a GitHub:**
```bash
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

2. **Habilita GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Click en "Settings"
   - Scroll hasta "Pages" en el menú lateral
   - En "Source", selecciona `main` branch
   - Click "Save"
   - Espera 2-3 minutos

3. **Verifica el sitio:**
   - La URL será: `https://josepicado07.github.io/Portaflio_Jose_Picado/`
   - Aparecerá en la sección "Pages"

### Método 2: Via Command Line

```bash
# Asegúrate de estar en la rama main
git checkout main

# Sube tus cambios
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# GitHub Pages se actualiza automáticamente
```

### Actualizar el sitio
```bash
# Haz cambios en tu código
# Luego:
git add .
git commit -m "Update portfolio content"
git push origin main

# El sitio se actualiza en 1-2 minutos
```

---

## ✅ Checklist Pre-Deployment

Antes de publicar, verifica:

### Contenido
- [ ] Foto de perfil profesional en `images/profile.jpg`
- [ ] CV actualizado en `assets/CV_Jose_Picado_EN.pdf`
- [ ] Favicon personalizado en `images/favicon.ico`
- [ ] Imágenes de proyectos (reemplazar placeholders)
- [ ] Links de redes sociales funcionando
- [ ] Número de WhatsApp correcto (+506 8475-6191)
- [ ] Email correcto (jpicado011@gmail.com)

### Funcionalidad
- [ ] Switch de idioma ES/EN funciona
- [ ] Smooth scroll funciona en todos los links
- [ ] Botón scroll-to-top aparece y funciona
- [ ] Botón WhatsApp abre chat correctamente
- [ ] Formulario valida campos correctamente
- [ ] EmailJS configurado (o comentado apropiadamente)
- [ ] Todas las animaciones AOS funcionan

### Responsive
- [ ] Se ve bien en móvil (320px - 767px)
- [ ] Se ve bien en tablet (768px - 1023px)
- [ ] Se ve bien en desktop (1024px+)
- [ ] Menú hamburguesa funciona en móvil
- [ ] Imágenes cargan correctamente en todos los tamaños

### Performance
- [ ] Todas las imágenes optimizadas (<500KB cada una)
- [ ] No hay errores en la consola del navegador
- [ ] Todos los links externos tienen `target="_blank"`
- [ ] Favicon aparece correctamente

### SEO
- [ ] Meta description apropiada
- [ ] Meta keywords relevantes
- [ ] Título de página descriptivo
- [ ] Todas las imágenes tienen atributo `alt`

---

## 🎨 Personalización

### Cambiar colores
Edita las variables CSS en `css/style.css`:
```css
:root {
    --color-primary: #f9fbfc;
    --color-secondary: #203c86;
    --color-accent: #33af7f;
    --color-support: #4b77bb;
}
```

### Cambiar tipografía
Edita los imports de Google Fonts en `index.html` y las variables en `css/style.css`

### Agregar más proyectos
Duplica un bloque de proyecto en `index.html` y actualiza:
- Imagen
- Título y descripción (en ambos idiomas)
- Tecnologías
- Métricas de impacto

Actualiza las traducciones en `js/language.js`

### Cambiar contenido
Todo el contenido bilingüe está en `js/language.js`. Edita los objetos `es` y `en`.

---

## 📚 Requisitos Académicos

Este proyecto cumple con todos los requisitos del curso:

✅ **Estructura obligatoria:**
- 5 secciones de contenido (sin contar header/footer)
- HTML5 semántico
- Bootstrap 5 desde CDN (NUNCA archivos locales)
- CSS personalizado
- JavaScript funcional

✅ **Funcionalidades requeridas:**
- Switch de idioma ES/EN programado
- Galería interactiva (4+ proyectos)
- Formulario de contacto con validación
- Botón WhatsApp flotante
- Botón scroll-to-top
- Botón descarga CV
- Favicon personalizado
- Animaciones sutiles
- 100% responsive

✅ **Deployment:**
- GitHub Pages público
- URL funcional

✅ **Prohibiciones respetadas:**
- No templates externos
- No barras de porcentaje en skills
- No Bootstrap local (solo CDN)

---

## 👤 Contacto

**José Andrés Picado Corrales**

- 📧 Email: [jpicado011@gmail.com](mailto:jpicado011@gmail.com)
- 💼 LinkedIn: [José Andrés Picado Corrales](https://www.linkedin.com/in/josé-andrés-picado-corrales-a10a28173)
- 💻 GitHub: [@josepicado07](https://github.com/josepicado07)
- 📱 WhatsApp: [+506 8475-6191](https://wa.me/50684756191)

**Puesto actual:** Product Data Analyst @ WWT Costa Rica

**Especialización:** Data Engineering | ETL Pipelines | Process Automation

---

## 📝 Licencia

Este proyecto es de código abierto para fines educativos y de portfolio.

**© 2025 José Picado. Todos los derechos reservados.**

---

## 🙏 Agradecimientos

- Universidad Cenfotec - Curso de Desarrollo de Software
- Bootstrap Team
- Font Awesome
- AOS Library
- EmailJS
- GitHub Pages

---

## 📌 Notas Adicionales

### Troubleshooting común

**El formulario no envía emails:**
- Verifica que EmailJS esté configurado correctamente
- Revisa la consola del navegador para errores
- Confirma que descomentaste el script de EmailJS

**Las animaciones no funcionan:**
- Verifica que el CDN de AOS esté cargando
- Revisa la consola para errores de JavaScript

**El switch de idioma no funciona:**
- Asegúrate de que `language.js` esté cargando antes que `main.js`
- Verifica que todos los elementos tengan el atributo `data-translate`

**GitHub Pages no muestra el sitio:**
- Espera 2-3 minutos después del push
- Verifica que el repositorio sea público
- Confirma que GitHub Pages esté habilitado en Settings

---

**¡Gracias por visitar mi portfolio!** 🚀

*Precision in Process, Power in Performance* 🐧
