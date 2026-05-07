/* ========================================
   LANGUAGE SWITCHER - ES/EN Translation System
   José Picado Portfolio
   ======================================== */

// Current language state (default: Spanish)
let currentLanguage = 'es';

// Complete translations object with all content
const translations = {
    es: {
        // Navigation
        'nav-about': 'Sobre Mí',
        'nav-projects': 'Proyectos',
        'nav-skills': 'Skills',
        'nav-contact': 'Contacto',

        // Hero Section
        'hero-title': 'Workday Consultant',
        'hero-tagline': 'Automatización de datos · Pipelines ETL · Migración Workday',
        'hero-pain-hook': 'Convierto procesos manuales de días en pipelines automáticos de minutos.',
        'hero-avail': 'Disponible · Respondo en 24h',
        'hero-cta': 'Ver Proyectos',
        'hero-contact': 'Hablemos',
        'hero-github': 'GitHub',
        'hero-downloadCV': 'Descargar CV',
        'hero-slogan': 'Precision in Process, Power in Performance',

        // About Section
        'about-title': 'Sobre Mí',
        'about-manifesto': 'Migro datos empresariales a Workday y construyo pipelines ETL escalables — donde los datos siempre llegan limpios.',
        'dossier-role-label': 'Rol',
        'dossier-role': 'Consultor Workday · Data Engineer',
        'dossier-exp-label': 'Experiencia',
        'dossier-exp': '6 años profesional · 2+ en datos',
        'dossier-company-label': 'Plataforma',
        'dossier-location-label': 'Ubicación',
        'dossier-location': 'Costa Rica — remoto',
        'dossier-background-label': 'Stack',
        'dossier-background': 'ETL · Apache Spark · Databricks · OAuth 2.0',
        'dossier-achievement-label': 'Resultado',
        'dossier-achievement': '92% reducción latencia · 500K+ registros · proceso de 6h → 45min',
        'dossier-approach-label': 'Métodos',
        'dossier-approach': 'Arquitectura escalable · Automatización inteligente · Herramientas IA modernas',

        // Projects Section
        'projects-title': 'Proyectos',
        'projects-subtitle': 'Soluciones de datos que transforman negocios',

        // Project 1
        'project1-title': 'Sistema de Auditoría Empresarial',
        'project1-desc': 'Automatización de auditorías de cumplimiento procesando 500K+ registros con 92% de reducción en tiempo de procesamiento (6 horas → 45 minutos). Sistema de validación de calidad de datos con detección automática de anomalías.',
        'project1-status': 'Producción (2024)',
        'project1-value1': '92%',
        'project1-impact1': 'Reducción tiempo',
        'project1-value2': '95%',
        'project1-impact2': 'Reducción revisión manual',

        // Project 2
        'project2-title': 'Pipeline ETL SharePoint-to-Power BI',
        'project2-desc': 'Pipeline de datos incremental con autenticación OAuth 2.0 (protocolo estándar para conexión segura entre sistemas empresariales), logrando 80% de reducción en tiempo de procesamiento. Ejecución automática diaria con recuperación ante fallos.',
        'project2-status': 'Producción (2024)',
        'project2-value1': '80%',
        'project2-impact1': 'Reducción procesamiento',
        'project2-value2': '350+',
        'project2-impact2': 'Flujos concurrentes',

        // Project 3
        'project3-title': 'Herramienta Inteligente de Normalización de Datos',
        'project3-desc': 'Aplicación desktop PyQt6 con algoritmo de fuzzy matching (reconocimiento aproximado de texto con 85% precisión) para normalización automatizada de datos. Reduce entrada manual de datos en 4 horas por semana.',
        'project3-status': 'Producción (2024)',
        'project3-value1': '4h',
        'project3-impact1': 'Horas ahorradas/sem',
        'project3-value2': '85%',
        'project3-impact2': 'Precisión de coincidencia',

        // Project 4
        'project4-title': 'Proyecto de Medallion Architecture en Databricks',
        'project4-desc': 'Pipeline ETL end-to-end con arquitectura medallion (3 capas: datos brutos → refinados → analíticos) procesando +100K transacciones. Implementa PySpark, Delta Lake y Great Expectations (validación automática de calidad de datos) con dashboard Streamlit interactivo.',
        'project4-status': 'Académico (2024)',
        'project4-value1': '100K+',
        'project4-impact1': 'Transacciones procesadas',
        'project4-value2': '3 capas',
        'project4-impact2': 'Arquitectura Medallion',

        // Project Actions
        'project-view-code': 'Ver Código',
        'project-confidential': 'Proyecto Empresarial',
        'project-academic': 'Proyecto Académico',

        // Hero Stats
        'hero-stat-1': 'Reducción de Latencia',
        'hero-stat-2': 'Registros Procesados',
        'hero-stat-3': 'Tiempo de Ciclo Optimizado',

        // About Label
        'about-sub': 'Consultor Workday · Data Engineer',

        // Skills Section
        'skills-title': 'Skills',
        'skills-cat1': 'Languages',
        'skills-cat2': 'Data Engineering',
        'skills-cat3': 'Architecture',
        'skills-cat4': 'Workday Platform',

        // Contact Section
        'contact-title': 'Contacto',
        'contact-heading': '¿Buscas un consultor para tu próxima implementación Workday o proyecto de datos?',
        'contact-available-text': 'Consultoría Workday • Data Conversion • ETL Pipelines • Arquitectura de Datos',
        'contact-cv': 'Descargar CV',
        'contact-expect-title': '¿Qué esperar?',
        'contact-expect-body': ' Responderé en 24h con un análisis inicial. También disponible por ',
        'contact-expect-end': ' para consultas rápidas.',

        // Contact Form
        'form-name': 'Tu nombre',
        'form-email': 'Tu email (responderé aquí)',
        'form-message': 'Cuéntame sobre tu proyecto',
        'form-submit': 'Enviar mensaje',
        'form-sending': 'Enviando...',
        'form-retry': 'Intentar de nuevo',
        'form-success': '✓ ¡Mensaje enviado! Espera mi respuesta en 24 horas.',
        'form-error': 'No se pudo enviar el mensaje. Verifica tu conexión o escríbeme por WhatsApp.',

        // Footer
        'footer-rights': 'Todos los derechos reservados'
    },

    en: {
        // Navigation
        'nav-about': 'About',
        'nav-projects': 'Projects',
        'nav-skills': 'Skills',
        'nav-contact': 'Contact',

        // Hero Section
        'hero-title': 'Workday Consultant',
        'hero-tagline': 'Data automation · ETL pipelines · Workday migration',
        'hero-pain-hook': 'I turn days-long manual processes into automated pipelines that run in minutes.',
        'hero-avail': 'Available · Reply within 24h',
        'hero-cta': 'View Projects',
        'hero-contact': 'Let\'s Talk',
        'hero-github': 'GitHub',
        'hero-downloadCV': 'Download CV',
        'hero-slogan': 'Precision in Process, Power in Performance',

        // About Section
        'about-title': 'About',
        'about-manifesto': 'I migrate enterprise data to Workday and build scalable ETL pipelines — where data always arrives clean.',
        'dossier-role-label': 'Role',
        'dossier-role': 'Workday Consultant · Data Engineer',
        'dossier-exp-label': 'Experience',
        'dossier-exp': '6 years professional · 2+ in data',
        'dossier-company-label': 'Platform',
        'dossier-location-label': 'Location',
        'dossier-location': 'Costa Rica — remote',
        'dossier-background-label': 'Stack',
        'dossier-background': 'ETL · Apache Spark · Databricks · OAuth 2.0',
        'dossier-achievement-label': 'Result',
        'dossier-achievement': '92% latency reduction · 500K+ records · 6h process → 45min',
        'dossier-approach-label': 'Methods',
        'dossier-approach': 'Scalable architecture · Intelligent automation · Modern AI tools',
        'about-card1': 'Performance',
        'about-card2': 'Scale',
        'about-card3': 'Quality',

        // Projects Section
        'projects-title': 'Projects',
        'projects-subtitle': 'Data solutions that transform businesses',

        // Project 1
        'project1-title': 'Enterprise Audit System',
        'project1-desc': 'Automated compliance audit processing 500K+ records with 92% latency reduction (6 hours → 45 minutes). Built data quality validation framework with automated anomaly detection.',
        'project1-status': 'Production (2024)',
        'project1-value1': '92%',
        'project1-impact1': 'Time reduction',
        'project1-value2': '95%',
        'project1-impact2': 'Manual review reduction',

        // Project 2
        'project2-title': 'SharePoint-to-Power BI ETL Pipeline',
        'project2-desc': 'Incremental data pipeline with OAuth 2.0 authentication (industry-standard secure connection between SharePoint and Power BI), achieving 80% processing time reduction. Runs automatically every day with built-in error recovery.',
        'project2-status': 'Production (2024)',
        'project2-value1': '80%',
        'project2-impact1': 'Processing reduction',
        'project2-value2': '350+',
        'project2-impact2': 'Concurrent flows',

        // Project 3
        'project3-title': 'Intelligent Data Normalization Tool',
        'project3-desc': 'PyQt6 desktop application with fuzzy matching algorithm (approximate text matching with 85% accuracy) for automated data normalization. Reduced manual data entry by 4 hours per week.',
        'project3-status': 'Production (2024)',
        'project3-value1': '4h',
        'project3-impact1': 'Hours/week saved',
        'project3-value2': '85%',
        'project3-impact2': 'Match accuracy',

        // Project 4
        'project4-title': 'Databricks Medallion Architecture Project',
        'project4-desc': 'End-to-end ETL pipeline with medallion architecture (3 layers: raw data → refined → analytics) processing 100K+ transactions. Implements PySpark, Delta Lake, and Great Expectations (automated data quality validation) with interactive Streamlit dashboard.',
        'project4-status': 'Academic (2024)',
        'project4-value1': '100K+',
        'project4-impact1': 'Transactions processed',
        'project4-value2': '3 layers',
        'project4-impact2': 'Medallion Architecture',

        // Project Actions
        'project-view-code': 'View Code',
        'project-confidential': 'Enterprise Project',
        'project-academic': 'Academic Project',

        // Hero Stats
        'hero-stat-1': 'Latency Reduction',
        'hero-stat-2': 'Records Processed',
        'hero-stat-3': 'Cycle Time Optimized',

        // About Label
        'about-sub': 'Workday Consultant · Data Engineer',

        // Skills Section
        'skills-title': 'Skills',
        'skills-cat1': 'Languages',
        'skills-cat2': 'Data Engineering',
        'skills-cat3': 'Architecture',
        'skills-cat4': 'Workday Platform',

        // Contact Section
        'contact-title': 'Contact',
        'contact-heading': "Need a consultant for your next Workday implementation or data project?",
        'contact-available-text': 'Workday Consulting • Data Conversion • ETL Pipelines • Data Architecture',
        'contact-cv': 'Download CV',
        'contact-expect-title': 'What to expect?',
        'contact-expect-body': ' I\'ll reply within 24h with an initial analysis. Also available on ',
        'contact-expect-end': ' for quick questions.',

        // Contact Form
        'form-name': 'Your name',
        'form-email': 'Your email (I\'ll reply here)',
        'form-message': 'Tell me about your project',
        'form-submit': 'Send message',
        'form-sending': 'Sending...',
        'form-retry': 'Try again',
        'form-success': '✓ Message sent! I\'ll reply within 24 hours.',
        'form-error': 'Couldn\'t send the message. Check your connection or reach me via WhatsApp.',

        // Footer
        'footer-rights': 'All rights reserved'
    }
};

/**
 * Switch between Spanish and English languages
 * Updates all elements with data-translate attribute
 */
function switchLanguage() {
    // Toggle language
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';

    // Update all translatable elements
    updateContent();

    // Update language button display
    updateLanguageButton();

    // Sync html[lang] attribute for screen readers
    document.documentElement.lang = currentLanguage;

    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);

    // Add smooth transition effect
    document.body.style.opacity = '0.95';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

/**
 * Update all content on the page based on current language
 */
function updateContent() {
    // Get all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[currentLanguage][key];

        if (translation) {
            // Check if element is an input/textarea (placeholder) or regular text content
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });
}

/**
 * Update the language switcher button display
 */
function updateLanguageButton() {
    const currentLangSpan = document.getElementById('currentLang');
    const otherLangSpan = document.getElementById('otherLang');

    if (currentLanguage === 'es') {
        currentLangSpan.textContent = 'ES';
        otherLangSpan.textContent = 'EN';
    } else {
        currentLangSpan.textContent = 'EN';
        otherLangSpan.textContent = 'ES';
    }
}

/**
 * Initialize language on page load
 */
function initLanguage() {
    // Check if user has a saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');

    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
    } else {
        // Default to Spanish
        currentLanguage = 'es';
    }

    // Update content and button on initial load
    updateContent();
    updateLanguageButton();
    document.documentElement.lang = currentLanguage;
}

// Initialize language when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initLanguage);

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        getCurrentLanguage: () => currentLanguage,
        translations
    };
}
