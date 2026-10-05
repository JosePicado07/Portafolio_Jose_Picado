# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for José Picado, a Data Engineer. Built as a static site using pure HTML5, CSS3, and vanilla JavaScript with no build tools. Deployed to GitHub Pages.

**Live Site:** https://josepicado07.github.io/Portaflio_Jose_Picado/

**Tech Stack:** HTML5, CSS3, JavaScript (vanilla), Bootstrap 5 (CDN), EmailJS

## Development Workflow

### Running Locally

This is a static site with no build process. Open directly in a browser or use a local server:

```bash
# Option 1: Direct - open index.html in browser

# Option 2: Python server (recommended)
python -m http.server 8000
# Visit http://localhost:8000

# Option 3: VS Code Live Server
# Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

### Deployment to GitHub Pages

The site auto-deploys from the `main` branch:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
# Site updates in 1-2 minutes at the GitHub Pages URL
```

## Architecture

### File Structure

```
/
├── index.html              # Single-page application
├── css/
│   ├── style.css          # Main styles + CSS variables
│   └── swiper-custom.css  # Swiper carousel styles
├── js/
│   ├── language.js        # Bilingual ES/EN translation system
│   └── main.js            # All interactive functionality
├── images/                # Images, favicon, project screenshots
├── assets/                # CV PDFs
└── Trabajos/              # Additional project documents
```

### JavaScript Architecture

**language.js** (must load before main.js):
- Manages bilingual ES/EN translation system
- `translations` object contains all text in both languages
- `switchLanguage()` toggles between languages
- Uses `data-translate` attributes on HTML elements
- Persists language preference to localStorage

**main.js**:
- Initializes all interactive features on DOMContentLoaded
- Key functions:
  - `initTheme()` - Dark/light theme with localStorage
  - `setupSmoothScroll()` - Navigation smooth scrolling
  - `setupContactForm()` - Form validation + EmailJS integration
  - `initProjectsSwiper()` - Swiper.js carousel initialization
  - `initGSAPAnimations()` - Advanced scroll animations

### Translation System

All user-facing text is in [language.js:10-184](js/language.js#L10-L184). To add/modify content:

1. Add key to both `es` and `en` objects in `translations`
2. Add `data-translate="your-key"` attribute to HTML element
3. Call `updateContent()` to apply (happens automatically on language switch)

Example:
```javascript
// In language.js
es: { 'nav-about': 'Sobre Mí' }
en: { 'nav-about': 'About' }

// In HTML
<a data-translate="nav-about">Sobre Mí</a>
```

### EmailJS Integration

Contact form uses EmailJS with credentials in [main.js:259-264](js/main.js#L259-L264):

- `PUBLIC_KEY`: c1v4HjVi2uotL4KP0
- `SERVICE_ID`: service_wrz9qj4
- `TEMPLATE_CONTACT`: template_z5lima8 (notification to José)
- `TEMPLATE_AUTOREPLY`: template_zjzcuqt (confirmation to user)

**Important:** If changing EmailJS templates, ensure template variables match:
- Contact template: `{{from_name}}`, `{{from_email}}`, `{{message}}`
- Auto-reply template: `{{email}}`, `{{from_name}}`, `{{message}}`

Form validation in [main.js:330-394](js/main.js#L330-L394) handles:
- Empty field validation
- Email format validation (regex)
- Min/max length constraints
- Bilingual error messages

### CDN Dependencies

All external libraries loaded via CDN (no local copies allowed per academic requirements):

- **Bootstrap 5.3.0** - CSS framework
- **Font Awesome 6.4.0** - Icons
- **AOS 2.3.1** - Scroll animations
- **Swiper.js 11** - Project carousel
- **GSAP 3.12.5** - Advanced animations
- **EmailJS 3** - Contact form backend

**Critical:** Never use local Bootstrap files. Always use CDN per project requirements.

### Theme System

Dark/light mode toggle ([main.js:62-104](js/main.js#L62-L104)):
- Uses `data-theme` attribute on `<html>` element
- Persists to localStorage as `theme` key
- CSS variables defined in [css/style.css](css/style.css)
- Auto-detects system preference on first visit

### Color Palette

CSS variables in `:root` (60-30-10 rule):
```css
--color-primary: #f9fbfc    /* 60% - Backgrounds */
--color-secondary: #203c86  /* 30% - Structure */
--color-accent: #33af7f     /* 10% - CTAs */
--color-support: #4b77bb    /* Support */
```

## Project Content

### Projects Section (Swiper Carousel)

4 featured projects in [index.html:247-443](index.html#L247-L443):
1. **Enterprise Audit System** - 92% latency reduction, 500K+ records
2. **SharePoint-Power BI ETL Pipeline** - OAuth 2.0, 80% faster processing
3. **Data Normalization Tool** - PyQt6 desktop app, fuzzy matching
4. **Databricks Medallion Architecture** - Academic project, PySpark/Delta Lake

To update projects:
- Edit HTML slides in index.html
- Update translations in language.js
- Replace images in `/images/` directory
- Ensure both ES/EN versions are updated

## Academic Requirements

This project fulfills Universidad Cenfotec course requirements:

**Must Have:**
- ✅ 5 content sections (Hero, About, Projects, Skills, Contact)
- ✅ Programmatic ES/EN language switcher
- ✅ Interactive project gallery (4+ projects)
- ✅ Contact form with validation
- ✅ WhatsApp floating button
- ✅ Scroll-to-top button
- ✅ CV download button
- ✅ Custom favicon
- ✅ 100% responsive design
- ✅ GitHub Pages deployment

**Prohibited:**
- ❌ External templates
- ❌ Percentage bars in skills section
- ❌ Local Bootstrap files (CDN only)

## Common Modifications

### Adding a New Project

1. Duplicate a `.swiper-slide` block in [index.html:247-443](index.html#L247-L443)
2. Update image src, alt text, and project number badge
3. Add translations to [language.js](js/language.js) for both ES/EN
4. Add corresponding `data-translate` keys to HTML
5. Update project image in `/images/` directory

### Changing Colors

Edit CSS variables in [css/style.css](css/style.css):
```css
:root {
    --color-primary: #your-color;
    --color-accent: #your-color;
}
```

### Updating Contact Information

- Email: Update in footer, contact section, and EmailJS configuration
- WhatsApp: Update `href="https://wa.me/PHONE"` in floating button
- LinkedIn/GitHub: Update links in footer and contact section
- CV: Replace file in `/assets/` and update filename in download buttons

## Responsive Breakpoints

Mobile-first approach:
- Mobile: < 768px (hamburger menu, stacked layout)
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## Browser Console Easter Egg

Custom branding messages in [main.js:837-846](js/main.js#L837-L846) display when developers open DevTools. Update these to match current contact info.
