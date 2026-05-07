/* ========================================
   MAIN JAVASCRIPT FILE
   José Picado Portfolio
   All interactive functionality
   ======================================== */

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme on load
    initTheme();

    // Initialize AOS (Animate On Scroll) library
    initAOS();

    // Setup skip link functionality
    setupSkipLink();

    // Setup scroll-to-top button functionality
    setupScrollToTop();

    // Setup navbar scroll effect
    setupNavbarScroll();

    // Setup contact form
    setupContactForm();

    // Close mobile menu when clicking on a link
    setupMobileMenuClose();

    // Project accordion removed — descriptions always visible per design intent

    // Initialize GSAP Animations
    initGSAPAnimations();
});

// ========== WINDOW LOAD INITIALIZATION ==========
/**
 * Initialize smooth scroll after ALL resources are fully loaded
 * This ensures accurate calculations for scroll positions
 * (fonts, images, Swiper carousel, etc. are fully rendered)
 */
window.addEventListener('load', function() {
    // CRITICAL: Force all AOS elements to animate immediately
    // This prevents layout shifts during navigation
    forceAnimateAllAOS();

    // Wait for animations to settle, then enable smooth scroll
    setTimeout(() => {
        setupSmoothScroll();
    }, 1000); // 1000ms allows AOS animations (800ms) to complete
});

// ========== AOS INITIALIZATION ==========
/**
 * Initialize AOS (Animate On Scroll) library with custom settings
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,          // Animation duration in milliseconds
            easing: 'ease-out-cubic', // Easing function
            once: true,             // Animation happens only once
            offset: 100,            // Offset from original trigger point
            delay: 0,               // Delay before animation starts
            anchorPlacement: 'top-bottom', // Defines which position triggers animation
            startEvent: 'DOMContentLoaded' // Start calculating positions
        });
    }
}

/**
 * Force all AOS elements to animate immediately on page load
 * This prevents layout shifts during navigation caused by lazy AOS animations
 */
function forceAnimateAllAOS() {
    if (typeof AOS === 'undefined') return;

    // Find ALL elements with data-aos attribute
    const allAosElements = document.querySelectorAll('[data-aos]');

    // Force them all to animate by adding the aos-animate class
    allAosElements.forEach(el => {
        el.classList.add('aos-animate');
    });
}

// ========== SKIP LINK (Accessibility) ==========
/**
 * Setup skip link to jump to main content
 * Properly handles fixed navbar offset
 */
function setupSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    const navbar = document.querySelector('.navbar');

    if (!skipLink) return;

    skipLink.addEventListener('click', function(e) {
        e.preventDefault();

        // Get target from href attribute (e.g., #about)
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        // Calculate navbar height
        const navbarHeight = navbar ? navbar.offsetHeight : 80;

        // Scroll to target with offset for fixed navbar
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const scrollPosition = targetPosition - navbarHeight - 20; // Extra 20px padding

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });

        // Set focus to target element for screen readers
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();

        // Remove tabindex after focus to prevent tab traps
        setTimeout(() => {
            targetElement.removeAttribute('tabindex');
        }, 1000);
    });
}

// ========== DARK/LIGHT MODE TOGGLE ==========
/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

/**
 * Update theme toggle button icon
 * @param {string} theme - Current theme ('dark' or 'light')
 */
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// ========== SMOOTH SCROLL ==========
/**
 * Setup clean smooth scrolling - all AOS elements are pre-animated on load
 * This ensures stable, accurate positioning from the first click
 */
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            // Close mobile menu if open
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const toggle = document.querySelector('.navbar-toggler');
                if (toggle) toggle.click();
            }

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Use native scrollIntoView() which respects CSS scroll-padding-top
                // This ensures proper offset on all screen sizes
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========== SCROLL TO TOP BUTTON ==========
/**
 * Setup scroll-to-top button functionality
 * Button appears after scrolling 300px down
 */
function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 150) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== NAVBAR SCROLL EFFECT ==========
/**
 * Add 'scrolled' class to navbar when user scrolls down
 * Creates a visual effect on the navigation bar
 */
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== MOBILE MENU ==========
/**
 * Close mobile menu when a navigation link is clicked
 */
function setupMobileMenuClose() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Check if menu is open (Bootstrap collapse)
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });
}

// ========== CONTACT FORM ==========
/**
 * Setup contact form with validation and submission
 * EmailJS integration (commented out - needs configuration)
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const retryBtn = document.getElementById('retryBtn');
    const formLoading = document.getElementById('formLoading');

    if (!contactForm) return;

    // Draft persistence — survives page refresh, clears on successful send
    const DRAFT_KEY = 'contact_draft';

    function saveDraft() {
        try {
            sessionStorage.setItem(DRAFT_KEY, JSON.stringify({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            }));
        } catch (e) { /* storage unavailable — degrade silently */ }
    }

    function clearDraft() {
        try { sessionStorage.removeItem(DRAFT_KEY); } catch (e) {}
    }

    function restoreDraft() {
        try {
            const raw = sessionStorage.getItem(DRAFT_KEY);
            if (!raw) return;
            const draft = JSON.parse(raw);
            if (draft.name)    document.getElementById('name').value    = draft.name;
            if (draft.email)   document.getElementById('email').value   = draft.email;
            if (draft.message) document.getElementById('message').value = draft.message;
        } catch (e) {
            clearDraft();
        }
    }

    restoreDraft();
    ['name', 'email', 'message'].forEach(id => {
        document.getElementById(id).addEventListener('input', saveDraft);
    });

    // Helper: Show loading state
    function showLoadingState() {
        submitBtn.style.display = 'none';
        retryBtn.style.display = 'none';
        formLoading.style.display = 'flex';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        ['name', 'email', 'message'].forEach(id => {
            document.getElementById(id).disabled = true;
        });
    }

    // Helper: Show normal state
    function hideLoadingState() {
        formLoading.style.display = 'none';
        submitBtn.style.display = 'block';
        submitBtn.disabled = false;
        ['name', 'email', 'message'].forEach(id => {
            document.getElementById(id).disabled = false;
        });
    }

    // Helper: Show retry button
    function showRetry() {
        formLoading.style.display = 'none';
        retryBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }

    const submitHandler = function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Enhanced validation with specific error messages
        const validationResult = validateForm(formData);
        if (!validationResult.isValid) {
            showFormStatus('error', validationResult.message);
            return;
        }

        // Show loading state
        showLoadingState();

        // ========== EMAILJS INTEGRATION ==========
        const PUBLIC_KEY = 'c1v4HjVi2uotL4KP0';
        const SERVICE_ID = 'service_wrz9qj4';
        const TEMPLATE_CONTACT = 'template_z5lima8';
        const TEMPLATE_AUTOREPLY = 'template_zjzcuqt';

        emailjs.init(PUBLIC_KEY);

        emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
        })
        .then(function(response) {
            return emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY, {
                email: formData.email,
                from_name: formData.name,
                message: formData.message
            });
        })
        .then(function(response) {
            hideLoadingState();
            showFormStatus('success', getSuccessMessage());
            contactForm.reset();
            clearDraft();
            submitBtn.style.display = 'block';

            // Auto-clear success after 3s
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 3000);
        })
        .catch(function(error) {
            const errorMsg = error.status === 422
                ? (typeof currentLanguage !== 'undefined' && currentLanguage === 'es'
                    ? 'Error 422: Las variables del template no coinciden. Verifica tu configuración en EmailJS.'
                    : 'Error 422: Template variables mismatch. Check your EmailJS configuration.')
                : getErrorMessage();

            showFormStatus('error', errorMsg);
            showRetry();
        });
    };

    // Attach submit handler to both submit button and retry button
    contactForm.addEventListener('submit', submitHandler);
    retryBtn.addEventListener('click', submitHandler);
}

/**
 * Validate contact form data with specific error messages
 * @param {Object} data - Form data object
 * @returns {Object} - Object with isValid boolean and message string
 */
function validateForm(data) {
    const lang = typeof currentLanguage !== 'undefined' ? currentLanguage : 'es';

    // Validation error messages
    const errorMessages = {
        es: {
            emptyName: '¿Cuál es tu nombre? Lo necesito para responder.',
            emptyEmail: '¿Tu email? Aquí es donde te contactaré.',
            emptyMessage: 'Cuéntame qué necesitas — sin mensaje no puedo ayudarte.',
            invalidEmail: 'Ese email no se ve correcto. ¿Falta el @ o algo?',
            shortMessage: 'Dile un poco más — al menos 10 caracteres para que entienda.',
            longName: 'Ese nombre es muy largo (máx 100 caracteres).',
            longMessage: 'Tu mensaje es muy largo (máx 1000 caracteres).'
        },
        en: {
            emptyName: 'What\'s your name? I need it to respond.',
            emptyEmail: 'Your email? That\'s where I\'ll reply.',
            emptyMessage: 'Tell me what you need — without a message I can\'t help.',
            invalidEmail: 'That doesn\'t look like an email. Missing @ or something?',
            shortMessage: 'Tell me more — at least 10 characters so I understand.',
            longName: 'That name is too long (max 100 characters).',
            longMessage: 'Your message is too long (max 1000 characters).'
        }
    };

    const messages = errorMessages[lang];

    // Check if name is filled
    if (!data.name) {
        return { isValid: false, message: messages.emptyName };
    }

    // Check name length
    if (data.name.length > 100) {
        return { isValid: false, message: messages.longName };
    }

    // Check if email is filled
    if (!data.email) {
        return { isValid: false, message: messages.emptyEmail };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return { isValid: false, message: messages.invalidEmail };
    }

    // Check if message is filled
    if (!data.message) {
        return { isValid: false, message: messages.emptyMessage };
    }

    // Check minimum message length
    if (data.message.length < 10) {
        return { isValid: false, message: messages.shortMessage };
    }

    // Check maximum message length
    if (data.message.length > 1000) {
        return { isValid: false, message: messages.longMessage };
    }

    return { isValid: true, message: '' };
}

/**
 * Display form status message
 * @param {string} type - 'success' or 'error'
 * @param {string} message - Message to display
 */
function showFormStatus(type, message) {
    const formStatus = document.getElementById('formStatus');

    if (!formStatus) return;

    // Remove existing classes
    formStatus.classList.remove('success', 'error');

    // Add appropriate class and message
    formStatus.classList.add(type);

    if (type === 'error') {
        const waLabel = (typeof currentLanguage !== 'undefined' && currentLanguage === 'en')
            ? 'Message via WhatsApp'
            : 'Escribir por WhatsApp';
        formStatus.innerHTML = `${message} <a href="https://wa.me/50684756191" target="_blank" rel="noopener noreferrer" class="form-error-wa"><i class="fab fa-whatsapp"></i> ${waLabel}</a>`;
    } else {
        formStatus.textContent = message;
    }

    formStatus.style.display = 'block';

    // Auto-hide after 10 seconds (gives users time to read the message)
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 10000);
}

/**
 * Get success message based on current language
 * @returns {string} Success message
 */
function getSuccessMessage() {
    // Use translations object if available (from language.js)
    if (typeof translations !== 'undefined' && typeof currentLanguage !== 'undefined') {
        return translations[currentLanguage]['form-success'] ||
               (currentLanguage === 'es'
                   ? '¡Mensaje enviado exitosamente! Te contactaré pronto.'
                   : 'Message sent successfully! I will contact you soon.');
    }
    // Fallback
    return currentLanguage === 'es'
        ? '¡Mensaje enviado exitosamente! Te contactaré pronto.'
        : 'Message sent successfully! I will contact you soon.';
}

/**
 * Get error message based on current language
 * @returns {string} Error message
 */
function getErrorMessage() {
    // Use translations object if available (from language.js)
    if (typeof translations !== 'undefined' && typeof currentLanguage !== 'undefined') {
        return translations[currentLanguage]['form-error'] ||
               (currentLanguage === 'es'
                   ? 'Error al enviar mensaje. Por favor intenta de nuevo o contáctame directamente.'
                   : 'Error sending message. Please try again or contact me directly.');
    }
    // Fallback
    return currentLanguage === 'es'
        ? 'Error al enviar mensaje. Por favor intenta de nuevo o contáctame directamente.'
        : 'Error sending message. Please try again or contact me directly.';
}

// ========== PERFORMANCE OPTIMIZATION ==========
/**
 * Lazy load images when they come into viewport
 * (Optional enhancement - can be added later)
 */
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ========== UTILITY FUNCTIONS ==========
/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== GSAP ANIMATIONS ==========
/**
 * Initialize GSAP Premium Animations
 */
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.hero-tag', {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero-heading', {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-tagline', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.btn-cta', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        delay: 0.7,
        ease: 'power3.out'
    });

    gsap.from('.hero-stats .hero-stat-item', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Lottie player animation is handled by the HTML autoplay attribute

    // Section Title Animations with ScrollTrigger
    gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Skills Cards Animation
    gsap.from('.skills-index .skill-row', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 75%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
        }
    });

    // Project Cards Scroll Reveal Animation
    gsap.utils.toArray('.project-row').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'bottom 60%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Floating Buttons Animation
    gsap.from('.btn-floating', {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        delay: 1.5,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Mouse follower effect for hero section (optional premium effect)
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            gsap.to('.hero-image-wrapper, .image-wrapper', {
                x: x,
                y: y,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
}
