// ============================================
// NAVIGATION
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function highlightNavigation() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileMenuToggle.textContent = navLinksContainer.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileMenuToggle.textContent = '☰';
    });
});

// ============================================
// TYPING EFFECT
// ============================================

const typingText = document.getElementById('typingText');
const phrases = [
    'Graduate Quality Engineer',
    'Continuous Improvement Engineer',
    'Lean Six Sigma & DMAIC',
    'Mechanical Engineer (BEng)'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars when visible
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.width = progressBar.style.getPropertyValue('--progress-width');
                }
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Observe skill items
document.querySelectorAll('.skill-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('footer p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Likhith Rudresh. All rights reserved.`;
}

// ============================================
// SMOOTH PAGE LOAD
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        highlightNavigation();
    });
});

// Lazy load images (if needed in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey === false) {
        const focusedElement = document.activeElement;
        if (focusedElement.tagName === 'BODY') {
            e.preventDefault();
            document.querySelector('main, section')?.focus();
        }
    }
});

// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.transition = 'none';
    });
}

console.log('Portfolio loaded successfully! 🚀');
