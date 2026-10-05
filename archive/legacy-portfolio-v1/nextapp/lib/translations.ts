export type Language = "es" | "en";

export type TranslationKey =
  | "nav-about" | "nav-projects" | "nav-skills" | "nav-contact"
  | "hero-title" | "hero-tagline" | "hero-pain-hook" | "hero-avail"
  | "hero-cta" | "hero-contact" | "hero-github" | "hero-downloadCV" | "hero-slogan"
  | "hero-stat-1" | "hero-stat-2" | "hero-stat-3"
  | "about-title" | "about-sub" | "about-manifesto"
  | "dossier-role-label" | "dossier-role"
  | "dossier-exp-label" | "dossier-exp"
  | "dossier-company-label"
  | "dossier-location-label" | "dossier-location"
  | "dossier-background-label" | "dossier-background"
  | "dossier-achievement-label" | "dossier-achievement"
  | "dossier-approach-label" | "dossier-approach"
  | "projects-title" | "projects-subtitle"
  | "project1-title" | "project1-desc" | "project1-status"
  | "project1-value1" | "project1-impact1" | "project1-value2" | "project1-impact2"
  | "project2-title" | "project2-desc" | "project2-status"
  | "project2-value1" | "project2-impact1" | "project2-value2" | "project2-impact2"
  | "project3-title" | "project3-desc" | "project3-status"
  | "project3-value1" | "project3-impact1" | "project3-value2" | "project3-impact2"
  | "project4-title" | "project4-desc" | "project4-status"
  | "project4-value1" | "project4-impact1" | "project4-value2" | "project4-impact2"
  | "project-view-code" | "project-confidential" | "project-academic"
  | "skills-title" | "skills-cat1" | "skills-cat2" | "skills-cat3" | "skills-cat4"
  | "contact-title" | "contact-heading" | "contact-available-text"
  | "contact-cv" | "contact-expect-title" | "contact-expect-body" | "contact-expect-end"
  | "form-name" | "form-email" | "form-message" | "form-submit"
  | "form-sending" | "form-retry" | "form-success" | "form-error"
  | "footer-rights";

export type Translations = Record<TranslationKey, string>;

const es: Translations = {
  "nav-about": "Sobre Mí",
  "nav-projects": "Proyectos",
  "nav-skills": "Skills",
  "nav-contact": "Contacto",

  "hero-title": "Workday Consultant",
  "hero-tagline": "Automatización de datos · Pipelines ETL · Migración Workday",
  "hero-pain-hook": "Convierto procesos manuales de días en pipelines automáticos de minutos.",
  "hero-avail": "Disponible · Respondo en 24h",
  "hero-cta": "Ver Proyectos",
  "hero-contact": "Hablemos",
  "hero-github": "GitHub",
  "hero-downloadCV": "Descargar CV",
  "hero-slogan": "Precision in Process, Power in Performance",
  "hero-stat-1": "Reducción de Latencia",
  "hero-stat-2": "Registros Procesados",
  "hero-stat-3": "Flujos Concurrentes",

  "about-title": "Sobre Mí",
  "about-sub": "Consultor Workday · Data Engineer",
  "about-manifesto":
    "Migro datos empresariales a Workday y construyo pipelines ETL escalables — donde los datos siempre llegan limpios.",
  "dossier-role-label": "Rol",
  "dossier-role": "Consultor Workday · Data Engineer",
  "dossier-exp-label": "Experiencia",
  "dossier-exp": "6 años profesional · 2+ en datos",
  "dossier-company-label": "Plataforma",
  "dossier-location-label": "Ubicación",
  "dossier-location": "Costa Rica — remoto",
  "dossier-background-label": "Stack",
  "dossier-background": "ETL · Apache Spark · Databricks · OAuth 2.0",
  "dossier-achievement-label": "Resultado",
  "dossier-achievement": "92% reducción latencia · 500K+ registros · proceso 6h → 45min",
  "dossier-approach-label": "Métodos",
  "dossier-approach": "Arquitectura escalable · Automatización inteligente · Herramientas IA modernas",

  "projects-title": "Proyectos",
  "projects-subtitle": "Soluciones de datos que transforman negocios",

  "project1-title": "Sistema de Auditoría Empresarial",
  "project1-desc":
    "Automatización de auditorías de cumplimiento procesando 500K+ registros con 92% de reducción en tiempo de procesamiento (6 horas → 45 minutos). Sistema de validación de calidad de datos con detección automática de anomalías.",
  "project1-status": "Producción (2024)",
  "project1-value1": "92%",
  "project1-impact1": "Reducción tiempo",
  "project1-value2": "95%",
  "project1-impact2": "Menos revisión manual",

  "project2-title": "Pipeline ETL SharePoint-to-Power BI",
  "project2-desc":
    "Pipeline de datos incremental con autenticación OAuth 2.0 logrando 80% de reducción en tiempo de procesamiento. Ejecución automática diaria con recuperación ante fallos.",
  "project2-status": "Producción (2024)",
  "project2-value1": "80%",
  "project2-impact1": "Reducción procesamiento",
  "project2-value2": "350+",
  "project2-impact2": "Flujos concurrentes",

  "project3-title": "Herramienta Inteligente de Normalización",
  "project3-desc":
    "Aplicación desktop PyQt6 con algoritmo de fuzzy matching (85% precisión) para normalización automatizada de datos. Reduce entrada manual en 4 horas por semana.",
  "project3-status": "Producción (2024)",
  "project3-value1": "4h",
  "project3-impact1": "Horas ahorradas/sem",
  "project3-value2": "85%",
  "project3-impact2": "Precisión de coincidencia",

  "project4-title": "Medallion Architecture en Databricks",
  "project4-desc":
    "Pipeline ETL end-to-end con arquitectura medallion (3 capas: datos brutos → refinados → analíticos) procesando +100K transacciones. Implementa PySpark, Delta Lake y Great Expectations.",
  "project4-status": "Académico (2024)",
  "project4-value1": "100K+",
  "project4-impact1": "Transacciones procesadas",
  "project4-value2": "3 capas",
  "project4-impact2": "Arquitectura Medallion",

  "project-view-code": "Ver Código",
  "project-confidential": "Proyecto Empresarial",
  "project-academic": "Proyecto Académico",

  "skills-title": "Skills",
  "skills-cat1": "Languages",
  "skills-cat2": "Data Engineering",
  "skills-cat3": "Architecture",
  "skills-cat4": "Workday Platform",

  "contact-title": "Contacto",
  "contact-heading": "¿Buscas un consultor para tu próxima implementación Workday o proyecto de datos?",
  "contact-available-text": "Consultoría Workday • Data Conversion • ETL Pipelines • Arquitectura de Datos",
  "contact-cv": "Descargar CV",
  "contact-expect-title": "¿Qué esperar?",
  "contact-expect-body": " Responderé en 24h con un análisis inicial. También disponible por ",
  "contact-expect-end": " para consultas rápidas.",

  "form-name": "Tu nombre",
  "form-email": "Tu email (responderé aquí)",
  "form-message": "Cuéntame sobre tu proyecto",
  "form-submit": "Enviar mensaje",
  "form-sending": "Enviando...",
  "form-retry": "Intentar de nuevo",
  "form-success": "✓ ¡Mensaje enviado! Espera mi respuesta en 24 horas.",
  "form-error": "No se pudo enviar. Verifica tu conexión o escríbeme por WhatsApp.",

  "footer-rights": "Todos los derechos reservados",
};

const en: Translations = {
  "nav-about": "About",
  "nav-projects": "Projects",
  "nav-skills": "Skills",
  "nav-contact": "Contact",

  "hero-title": "Workday Consultant",
  "hero-tagline": "Data automation · ETL pipelines · Workday migration",
  "hero-pain-hook": "I turn days-long manual processes into automated pipelines that run in minutes.",
  "hero-avail": "Available · Reply within 24h",
  "hero-cta": "View Projects",
  "hero-contact": "Let's Talk",
  "hero-github": "GitHub",
  "hero-downloadCV": "Download CV",
  "hero-slogan": "Precision in Process, Power in Performance",
  "hero-stat-1": "Latency Reduction",
  "hero-stat-2": "Records Processed",
  "hero-stat-3": "Concurrent Flows",

  "about-title": "About",
  "about-sub": "Workday Consultant · Data Engineer",
  "about-manifesto":
    "I migrate enterprise data to Workday and build scalable ETL pipelines — where data always arrives clean.",
  "dossier-role-label": "Role",
  "dossier-role": "Workday Consultant · Data Engineer",
  "dossier-exp-label": "Experience",
  "dossier-exp": "6 years professional · 2+ in data",
  "dossier-company-label": "Platform",
  "dossier-location-label": "Location",
  "dossier-location": "Costa Rica — remote",
  "dossier-background-label": "Stack",
  "dossier-background": "ETL · Apache Spark · Databricks · OAuth 2.0",
  "dossier-achievement-label": "Result",
  "dossier-achievement": "92% latency reduction · 500K+ records · 6h process → 45min",
  "dossier-approach-label": "Methods",
  "dossier-approach": "Scalable architecture · Intelligent automation · Modern AI tools",

  "projects-title": "Projects",
  "projects-subtitle": "Data solutions that transform businesses",

  "project1-title": "Enterprise Audit System",
  "project1-desc":
    "Automated compliance audit processing 500K+ records with 92% latency reduction (6 hours → 45 minutes). Built data quality validation with automated anomaly detection.",
  "project1-status": "Production (2024)",
  "project1-value1": "92%",
  "project1-impact1": "Time reduction",
  "project1-value2": "95%",
  "project1-impact2": "Manual review reduction",

  "project2-title": "SharePoint-to-Power BI ETL Pipeline",
  "project2-desc":
    "Incremental data pipeline with OAuth 2.0 authentication achieving 80% processing time reduction. Runs automatically every day with built-in error recovery.",
  "project2-status": "Production (2024)",
  "project2-value1": "80%",
  "project2-impact1": "Processing reduction",
  "project2-value2": "350+",
  "project2-impact2": "Concurrent flows",

  "project3-title": "Intelligent Data Normalization Tool",
  "project3-desc":
    "PyQt6 desktop application with fuzzy matching algorithm (85% accuracy) for automated data normalization. Reduced manual data entry by 4 hours per week.",
  "project3-status": "Production (2024)",
  "project3-value1": "4h",
  "project3-impact1": "Hours/week saved",
  "project3-value2": "85%",
  "project3-impact2": "Match accuracy",

  "project4-title": "Databricks Medallion Architecture",
  "project4-desc":
    "End-to-end ETL pipeline with medallion architecture (3 layers: raw → refined → analytics) processing 100K+ transactions. Implements PySpark, Delta Lake, and Great Expectations.",
  "project4-status": "Academic (2024)",
  "project4-value1": "100K+",
  "project4-impact1": "Transactions processed",
  "project4-value2": "3 layers",
  "project4-impact2": "Medallion Architecture",

  "project-view-code": "View Code",
  "project-confidential": "Enterprise Project",
  "project-academic": "Academic Project",

  "skills-title": "Skills",
  "skills-cat1": "Languages",
  "skills-cat2": "Data Engineering",
  "skills-cat3": "Architecture",
  "skills-cat4": "Workday Platform",

  "contact-title": "Contact",
  "contact-heading": "Need a consultant for your next Workday implementation or data project?",
  "contact-available-text": "Workday Consulting • Data Conversion • ETL Pipelines • Data Architecture",
  "contact-cv": "Download CV",
  "contact-expect-title": "What to expect?",
  "contact-expect-body": " I'll reply within 24h with an initial analysis. Also available on ",
  "contact-expect-end": " for quick questions.",

  "form-name": "Your name",
  "form-email": "Your email (I'll reply here)",
  "form-message": "Tell me about your project",
  "form-submit": "Send message",
  "form-sending": "Sending...",
  "form-retry": "Try again",
  "form-success": "✓ Message sent! I'll reply within 24 hours.",
  "form-error": "Couldn't send the message. Check your connection or reach me via WhatsApp.",

  "footer-rights": "All rights reserved",
};

export const translations: Record<Language, Translations> = { es, en };
