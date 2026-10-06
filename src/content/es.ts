import type { CareerItem, Dictionary, Project, Stage } from "./en";

const esProjects = [
  {
    id: "personal-data-platform",
    title: "Plataforma de datos personal",
    stack: ["Python", "DuckDB", "Parquet"],
    problem:
      "Exportes del portal del banco, estados de cuenta por correo y PDFs, en formatos distintos, sin una única fuente de verdad y sin forma de saber cuándo un número estaba mal.",
    built:
      "Un pipeline Bronze → Silver → Gold sobre DuckDB y Parquet. Cada ejecución pasa nueve controles de integridad, desde la conciliación al céntimo hasta alertas de caídas de ingresos y de cuentas desactualizadas. Una interfaz de chat responde preguntas mediante consultas SQL fijas, así el modelo nunca hace los cálculos.",
    note: {
      label: "Qué falló",
      text: "Los estados de cuenta que se volvían a descargar se rastreaban por ruta de archivo, así que las copias más completas se saltaban sin aviso y los ingresos de un mes aparecían casi en cero, sin ningún error. Cambié la ingesta para identificar los archivos por hash de contenido y agregué el control que lo habría detectado desde el primer día.",
    },
    proof: [
      { value: "2600+", label: "Transacciones", verified: false },
      { value: "130+", label: "Archivos fuente", verified: false },
      { value: "9", label: "Controles de integridad por ejecución", verified: false },
    ],
    featured: true,
  },
  {
    id: "validation-system",
    title: "Sistema de validación multicliente",
    stack: ["Python", "Polars", "Pandas"],
    problem:
      "Una auditoría de cumplimiento sobre más de 500 000 registros tardaba seis horas por ejecución.",
    built:
      "Un sistema de auditoría en producción con validación automática de calidad de datos, detección de anomalías y un pipeline de reportes de cumplimiento.",
    proof: [
      { value: "6 h → 45 min", label: "Duración de la auditoría", verified: true },
      { value: "500K+", label: "Registros por auditoría", verified: false },
    ],
    featured: true,
  },
  {
    id: "etl-reporting",
    title: "Pipeline ETL de reportes",
    stack: ["Python", "OAuth 2.0", "SharePoint API"],
    proof: [{ value: "80% menos tiempo de procesamiento", label: "Tiempo de procesamiento", verified: true }],
    featured: false,
  },
  {
    id: "parts-normalization",
    title: "Normalización de partes Oracle",
    stack: ["Python", "PyQt6", "Fuzzy matching"],
    proof: [{ value: "4 h/semana ahorradas", label: "Captura manual", verified: true }],
    featured: false,
  },
  {
    id: "workday-conversions",
    title: "Conversiones Workday",
    stack: ["SQL", "EIB", "HCM", "Payroll", "Benefits", "Learning"],
    proof: [{ value: "4 implementaciones", label: "Alcance de entrega", verified: false }],
    featured: false,
  },
] as const;

type EsProjectTitle = (typeof esProjects)[number]["title"];

const esStages = [
  {
    id: "ingest",
    number: "01",
    name: "Ingesta",
    desc: "Sacar datos de sistemas que no fueron hechos para compartirlos.",
    proven: false,
    tools: [
      { name: "SharePoint API · OAuth 2.0", projects: ["Pipeline ETL de reportes"] },
      { name: "Extractos de RR. HH. heredados: ADP, Dayforce, SAP", projects: ["Conversiones Workday"] },
      { name: "Portales bancarios, correo, parsing de PDF y CSV", projects: ["Plataforma de datos personal"] },
    ],
  },
  {
    id: "transform",
    number: "02",
    name: "Transformación",
    desc: "Darles la forma que exige el destino, lo bastante rápido para volver a correrlo.",
    proven: true,
    tools: [
      { name: "Python · Polars · Pandas", projects: ["Sistema de validación multicliente"] },
      { name: "Carga incremental", projects: ["Pipeline ETL de reportes"] },
      { name: "Procedimientos almacenados SQL", projects: ["Conversiones Workday"] },
      { name: "DuckDB · Parquet", projects: ["Plataforma de datos personal"] },
    ],
  },
  {
    id: "validate",
    number: "03",
    name: "Validación",
    desc: "Comprobar que cada carga es correcta antes de que alguien dependa de ella.",
    proven: true,
    tools: [
      {
        name: "Controles automáticos de calidad de datos, detección de anomalías",
        projects: ["Sistema de validación multicliente"],
      },
      {
        name: "Controles de integridad, conciliación al céntimo",
        projects: ["Plataforma de datos personal"],
      },
      { name: "Fuzzy matching", projects: ["Normalización de partes Oracle"] },
    ],
  },
  {
    id: "serve",
    number: "04",
    name: "Entrega",
    desc: "Dejarlos donde la gente ya trabaja.",
    proven: false,
    tools: [
      { name: "Power BI", projects: ["Pipeline ETL de reportes"] },
      { name: "Cargas en Workday: EIB, iLoad", projects: ["Conversiones Workday"] },
      {
        name: "Reportes de cumplimiento, herramientas de escritorio PyQt6",
        projects: ["Sistema de validación multicliente", "Normalización de partes Oracle"],
      },
    ],
  },
] as const satisfies readonly Stage<EsProjectTitle>[];

const esCareer: readonly CareerItem[] = [
  {
    when: "Ene 2026 – Actualidad",
    role: "Consultor técnico, conversión de datos",
    org: "Workday",
    note: "Ciclo completo de conversión en varias implementaciones de clientes en paralelo.",
    muted: false,
  },
  {
    when: "Jul 2024 – Ene 2026",
    role: "Analista de datos de producto",
    org: "World Wide Technology",
    note: "Pipelines en Python, herramientas de auditoría e integraciones OAuth 2.0 para más de 350 flujos de datos.",
    muted: false,
  },
  {
    when: "Jul 2023 – Jul 2024",
    role: "Analista EDI",
    org: "DXC Technology",
    note: "Monitoreo de flujos de datos en producción con más de 200K registros diarios.",
    muted: false,
  },
  {
    when: "2021 – 2023",
    role: "Pruebas de QA y ventas técnicas",
    org: "Amazon · Emerson",
    muted: true,
  },
  {
    when: "Previsto 2027",
    role: "Bachillerato en Ingeniería del Software",
    org: "Universidad Cenfotec",
    muted: true,
  },
];

export const es = {
  nav: {
    skipLink: "Saltar al contenido",
    wordmark: "José Picado",
    wordmarkHref: "#top",
    navLabel: "Principal",
    links: [
      { label: "Proyectos", href: "#projects" },
      { label: "Habilidades", href: "#skills" },
      { label: "Sobre mí", href: "#about" },
      { label: "Contacto", href: "#contact" },
    ],
    languages: [
      { code: "EN", label: "English" },
      { code: "ES", label: "Español" },
    ],
    langGroupLabel: "Idioma",
    cv: "CV",
    cvDownload: "Descargar CV",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
  },
  hero: {
    id: "top",
    ariaLabel: "Introducción",
    label: "Ingeniero de datos y consultor",
    title: "Pipelines comprobados.",
    sub: "Construyo pipelines de datos y los sistemas de validación que comprueban que cada carga es correcta antes de que alguien dependa de ella.",
    ctaPrimary: "Agenda una llamada de 30 minutos",
    ctaSecondary: "Ver el trabajo",
  },
  urls: {
    calendar: "https://cal.com/jose-picado-uieppc/30min",
    cv: "/cv/CV_Jose_Picado_2026.pdf",
    email: "jpicado011@gmail.com",
    whatsapp: "https://wa.me/50684756191",
    linkedin: "https://www.linkedin.com/in/josé-andrés-picado-corrales-a10a28173",
    github: "https://github.com/josepicado07",
  },
  projectsSection: {
    label: "Proyectos",
    heading: "Pipelines que revisan su propio trabajo.",
    nextLinkText: "Conversemos sobre un problema parecido →",
    nextLinkHref: "#contact",
  },
  projects: esProjects as readonly Project[],
  skillsSection: {
    label: "Habilidades",
    heading: "De la fuente cruda a una respuesta confiable.",
    legend: "Etapa medida por un resultado verificado en Proyectos",
    provenSrText: "(medida por un resultado verificado)",
  },
  stages: esStages as readonly Stage[],
  aboutSection: {
    label: "Sobre mí",
    heading: "Soy José.",
    careerLabel: "Trayectoria",
    bio: [
      "Soy ingeniero de datos y vivo en Costa Rica. Hoy trabajo en Workday haciendo conversiones de datos: tomo los datos de RR. HH. y planilla de una empresa desde sistemas como ADP, Dayforce o SAP y los cargo en Workday sin perder nada en el camino.",
      "Siempre quise trabajar con datos. Confío más en los números que en las corazonadas, y me gusta llevar un proyecto hasta el final, hasta que los datos están bien y el cliente queda contento.",
      "Aunque no empecé ahí. Probé funciones de Alexa en Amazon e hice ventas técnicas en Emerson, y luego pasé a soporte EDI en DXC, que es donde empecé a trabajar con datos todos los días. Después entré a World Wide Technology como analista de datos y escribí la mayoría de las herramientas en Python que ves en Proyectos.",
      "También estoy terminando la carrera de Ingeniería del Software en la Universidad Cenfotec mientras trabajo, y construí un pipeline de datos para mis propias finanzas porque quería saber que los números estaban bien. Y sí, eso es un pingüino en el ícono de la pestaña. Me encantan los pingüinos.",
    ],
  },
  career: esCareer,
  contactSection: {
    label: "Contacto",
    heading: "Hablemos de tus datos.",
    lead: "Lo más rápido es una llamada de 30 minutos. Si prefieres escribir, envía un mensaje aquí o por WhatsApp.",
    cta: "Agenda una llamada de 30 minutos",
    channels: [
      { label: "Correo", link: "jpicado011@gmail.com", href: "mailto:jpicado011@gmail.com" },
      { label: "WhatsApp", link: "+506 8475 6191", href: "https://wa.me/50684756191" },
      { label: "CV", link: "Descargar CV (PDF)", href: "/cv/CV_Jose_Picado_2026.pdf", download: true },
    ],
  },
  contactForm: {
    title: "Envía un mensaje",
    labels: { name: "Tu nombre", email: "Tu correo", message: "¿En qué estás trabajando?" },
    submit: "Enviar mensaje",
    submitting: "Enviando…",
    success: "Mensaje enviado. En breve recibirás un correo de confirmación.",
    sendError: "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por WhatsApp.",
    counter: "{n} / 1000",
    errors: {
      nameRequired: "Escribe tu nombre.",
      nameShort: "El nombre debe tener al menos 2 caracteres.",
      nameLong: "El nombre debe tener 80 caracteres o menos.",
      emailRequired: "Escribe tu correo.",
      emailInvalid: "Ese correo no parece correcto. Revisa si hay errores.",
      messageRequired: "Escribe un mensaje corto.",
      messageShort: "El mensaje debe tener al menos 10 caracteres.",
      messageLong: "El mensaje debe tener 1000 caracteres o menos.",
    },
  },
  footer: {
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/josé-andrés-picado-corrales-a10a28173", external: true },
      { label: "GitHub", href: "https://github.com/josepicado07", external: true },
      { label: "Correo", href: "mailto:jpicado011@gmail.com" },
    ],
    meta: "© 2026 José Picado · Costa Rica",
  },
  whatsAppFloat: {
    ariaLabel: "Escríbele a José por WhatsApp",
  },
  aria: {
    stack: "Tecnologías",
    proof: "Resultados",
    compactProjects: "Otros proyectos",
    skillsPipeline: "Pipeline de habilidades",
    contactChannels: "Canales de contacto",
    footerLinks: "Enlaces del pie de página",
  },
} satisfies Dictionary;
