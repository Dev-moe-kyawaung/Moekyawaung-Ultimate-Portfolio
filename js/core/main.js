/**
 * ═══════════════════════════════════════════════════════════════
 * OMNI-SPHERE ULTIMATE PREMIUM PRO MAX
 * Main Application Controller v4.0.0
 * Complete Enterprise Grade JavaScript
 * ═══════════════════════════════════════════════════════════════
 * Author: Moe Kyaw Aung
 * License: Enterprise All-Rights-Reserved
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

const App = (() => {
    // ── PRIVATE STATE ────────────────────────────────────────
    const state = {
        version: '4.0.0-ultimate',
        isLoaded: false,
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth <= 1024 && window.innerWidth > 768,
        currentPage: 'home',
        scrollPos: 0,
        lastScrollPos: 0,
        scrollDirection: 'down',
        isNavOpen: false,
        activeLanguage: localStorage.getItem('lang') || 'en',
        activeTheme: localStorage.getItem('theme') || 'dark',
        cursorPosition: { x: 0, y: 0 },
        isFirstVisit: !localStorage.getItem('visited'),
        colorScheme: 'dark',
        isAnimating: false,
        pageProgress: 0,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        online: navigator.onLine,
    };

    // ── CONFIGURATION ────────────────────────────────────────
    const CONFIG = {
        name: 'Moe Kyaw Aung',
        title: 'Senior Android Developer',
        baseUrl: 'https://dev-moe-kyawaung.github.io/',
        github: 'https://github.com/Dev-moe-kyawaung',
        linkedin: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1',
        email: 'moekyawaung@technologist.com',
        phone: '+959889000889',
        contact: {
            primaryEmail: 'moekyawaung@technologist.com',
            secondaryEmail: 'moekyawaung@programmer.net',
            whatsapp: '+959889000889',
            telegram: 'moekyawaung',
        },
        social: {
            github: 'https://github.com/Dev-moe-kyawaung',
            linkedin: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1',
            gravatar: 'https://gravatar.com/moekyawaung13721',
            tumblr: 'https://www.tumblr.com/moekyawaung',
            bluesky: 'https://bsky.app/profile/moekyawaung96.bsky.social',
            youtube: 'https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG',
            vimeo: 'https://vimeo.com/user252414232',
            flickr: 'https://www.flickr.com/people/204037451@N06',
        },
        animations: {
            duration: 300,
            stagger: 100,
        },
    };

    // ── CACHE DOM ELEMENTS ────────────────────────────���──────
    let DOM = {};

    // ── MODULE INITIALIZATION ────────────────────────────────
    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        console.log('%c🚀 OMNI-SPHERE ULTIMATE EDITION INITIALIZED',
            'background: linear-gradient(135deg, #00f0ff, #9b5cf6, #ffd700); color: white; padding: 12px 24px; border-radius: 8px; font-size: 16px; font-weight: bold;');
        console.log(`%cVersion: ${state.version}`, 'color: #00f0ff; font-size: 12px;');
        
        try {
            // Cache DOM elements
            cacheElements();
            
            // Apply initial settings
            applyTheme(state.activeTheme);
            applyLanguage(state.activeLanguage);
            
            // Initialize core modules
            await Promise.all([
                initNavigation(),
                initLoader(),
                initThreeBackground(),
                initParticles(),
                initTypewriter(),
                initCounters(),
                initSkillsTabs(),
                initProjectFilters(),
                initScrollEffects(),
                initContactForm(),
                initCustomCursor(),
                initAIAssistant(),
                initServiceWorker(),
                initAnalytics(),
                initSEO(),
                initPerformanceMonitor(),
                initNetworkMonitor(),
                initCookieConsent(),
                initPWAInstall(),
                initAccessibility(),
                initErrorHandling(),
                initSearch(),
                initBlog(),
                initGallery(),
                initTestimonials(),
                initVideoPlayer(),
                initThemeManager(),
                initLanguageManager(),
            ]);
            
            // Set loaded state
            state.isLoaded = true;
            document.body.classList.add('app-loaded');
            
            // Hide loader after delay
            setTimeout(() => {
                hideLoader();
            }, 500);
            
            // Initialize page transitions
            initPageTransitions();
            
            // Trigger initial animations
            initRevealAnimations();
            
            // Set initial states
            checkMobile();
            
            // Bind global events
            bindGlobalEvents();
            
        } catch (error) {
            console.error('Initialization error:', error);
            handleFatalError(error);
        }
    }

    // ── CACHE DOM ELEMENTS ───────────────────────────────────
    function cacheElements() {
        DOM = {
            body: document.body,
            html: document.documentElement,
            loader: document.getElementById('loader'),
            loaderProgress: document.getElementById('loader-progress'),
            loaderPercentage: document.getElementById('loader-percentage'),
            mainNav: document.getElementById('main-nav'),
            mobileNav: document.getElementById('mobile-nav'),
            mobileToggle: document.getElementById('mobile-toggle'),
            navLinks: document.querySelectorAll('.nav-link'),
            mobileLinks: document.querySelectorAll('.mobile-link'),
            themeToggle: document.getElementById('theme-toggle'),
            langBtn: document.getElementById('lang-btn'),
            backToTop: document.getElementById('back-to-top'),
            heroContent: document.querySelector('.hero-content'),
            typewriter: document.getElementById('typewriter'),
            particleContainer: document.getElementById('particles-js'),
            threeContainer: document.body,
            contactForm: document.getElementById('contact-form'),
            cookieConsent: document.getElementById('cookie-consent'),
            chatWidget: document.getElementById('ai-chat-widget'),
            chatMessages: document.getElementById('chat-messages'),
            chatInput: document.getElementById('chat-input'),
            chatSend: document.getElementById('chat-send'),
            pwaInstall: document.getElementById('install-btn'),
            searchModal: document.getElementById('search-modal'),
            searchInput: document.getElementById('search-input'),
        };
    }

    // ── NAVIGATION SYSTEM ────────────────────────────────────
    function initNavigation() {
        // Navigation link clicks
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    scrollToSection(target);
                    closeMobileNav();
                }
            });
        });

        // Smooth scroll function
        function scrollToSection(target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: state.reducedMotion ? 'auto' : 'smooth',
            });
        }

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        window.addEventListener('scroll', debounce(() => {
            const scrollY = window.scrollY + 100;
            let currentSection = 'home';

            sections.forEach(section => {
                if (scrollY >= section.offsetTop) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }, 50));

        // Mobile navigation toggle
        if (DOM.mobileToggle) {
            DOM.mobileToggle.addEventListener('click', toggleMobileNav);
        }

        // Nav scroll state
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.scrollY > 50;
            DOM.mainNav?.classList.toggle('scrolled', scrolled);
            
            // Show/hide back to top
            DOM.backToTop?.classList.toggle('show', window.scrollY > 500);
        }, 16));

        // Back to top
        DOM.backToTop?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function toggleMobileNav() {
        DOM.mobileNav?.classList.toggle('open');
        DOM.mobileToggle?.classList.toggle('active');
        DOM.body.style.overflow = DOM.mobileNav?.classList.contains('open') ? 'hidden' : '';
        state.isNavOpen = !state.isNavOpen;
    }

    function closeMobileNav() {
        DOM.mobileNav?.classList.remove('open');
        DOM.mobileToggle?.classList.remove('active');
        DOM.body.style.overflow = '';
        state.isNavOpen = false;
    }

    // ── LOADER SYSTEM ────────────────────────────────────────
    function initLoader() {
        let progress = 0;
        const fakeProgress = [
            'Loading config...',
            'Compiling styles...',
            'Initializing 3D...',
            'Loading projects...',
            'Preparing AI...',
            'Almost ready...',
        ];
        let statusIndex = 0;

        const loadingText = document.getElementById('loader-status');
        
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Auto hide after complete
                setTimeout(hideLoader, 300);
            }

            // Update UI
            if (DOM.loaderProgress) {
                DOM.loaderProgress.style.width = progress + '%';
            }
            if (DOM.loaderPercentage) {
                DOM.loaderPercentage.textContent = Math.round(progress) + '%';
            }

            // Update status text
            if (loadingText && progress < 100) {
                const idx = Math.floor((progress / 100) * fakeProgress.length);
                if (idx !== statusIndex) {
                    statusIndex = idx;
                    loadingText.textContent = fakeProgress[idx] || 'Loading...';
                }
            }
        }, 100);
    }

    function hideLoader() {
        DOM.loader?.classList.add('hide');
        setTimeout(() => {
            DOM.loader?.style.display = 'none';
        }, 500);
    }

    // ── THREE.JS BACKGROUND ──────────────────────────────────
    function initThreeBackground() {
        if (typeof THREE !== 'undefined') {
            // Initialize 3D sphere background
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            document.body.appendChild(renderer.domElement);

            // Sphere geometry
            const geometry = new THREE.SphereGeometry(5, 50, 50);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00f0ff,
                wireframe: true,
                transparent: true,
                opacity: 0.1,
            });
            const sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);

            // Particles
            const particleGeometry = new THREE.BufferGeometry();
            const particleCount = 1000;
            const positions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 100;
                positions[i + 1] = (Math.random() - 0.5) * 100;
                positions[i + 2] = (Math.random() - 0.5) * 100;
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const particleMaterial = new THREE.PointsMaterial({
                color: 0x9b5cf6,
                size: 0.05,
                transparent: true,
                opacity: 0.6,
            });
            const particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

            camera.position.z = 15;

            // Animation loop
            let frame = 0;
            function animate() {
                requestAnimationFrame(animate);
                
                sphere.rotation.x += 0.001;
                sphere.rotation.y += 0.002;
                particles.rotation.y += 0.0005;
                
                renderer.render(scene, camera);
            }

            animate();

            // Resize
            window.addEventListener('resize', debounce(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, 200));
        }
    }

    // ── PARTICLES SYSTEM ─────────────────────────────────────
    function initParticles() {
        // Initialize particles.js for background
        if (typeof particlesJS !== 'undefined' && DOM.particleContainer) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: ['#00f0ff', '#9b5cf6', '#c9a84c'] },
                    shape: {
                        type: ['circle', 'polygon'],
                        stroke: { width: 0, color: '#000000' },
                        polygon: { nb_sides: 5 },
                    },
                    opacity: {
                        value: 0.5,
                        random: true,
                        anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
                    },
                    size: {
                        value: 4,
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00f0ff',
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        attract: { enable: false, rotateX: 600, rotateY: 1200 },
                    },
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true,
                    },
                    modes: {
                        grab: { distance: 200, line_linked: { opacity: 1 } },
                        bubble: { distance: 400, size: 40, duration: 2 },
                        push: { particles_nb: 4 },
                    },
                },
                retina_detect: true,
            });
        }
    }

    // ── TYPEWRITER SYSTEM ────────────────────────────────────
    function initTypewriter() {
        if (!DOM.typewriter) return;

        const words = [
            'World-Class Apps',
            'Android Applications',
            'AI Powered Solutions',
            'Enterprise Platforms',
            'Digital Experiences',
            'Smart POS Systems',
            'Gaming Creations',
            'Innovative Products',
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const current = words[wordIndex];
            const visible = isDeleting 
                ? current.substring(0, charIndex--)
                : current.substring(0, charIndex++);

            DOM.typewriter.textContent = visible;

            let speed = isDeleting ? 30 : 100;

            if (!isDeleting && charIndex === current.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }

        // Start after delay
        setTimeout(type, 1500);
    }

    // ── COUNTERS SYSTEM ──────────────────────────────────────
    function initCounters() {
        const counters = document.querySelectorAll('.counter-value, [data-counter]');

        counters.forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(counter);
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter') || element.getAttribute('data-target')) || 0;
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easing * target);

            // Format number
            let display = current.toLocaleString();
            
            // Handle money format
            if (element.hasAttribute('data-money')) {
                display = `$${display}K`;
            }
            // Handle percentage
            if (element.hasAttribute('data-percent')) {
                display = `${display}%`;
            }

            element.textContent = display;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(update);
    }

    // ── SKILLS TABS SYSTEM ───────────────────────────────────
    function initSkillsTabs() {
        const tabContainer = document.getElementById('skills-tabs');
        if (!tabContainer) return;

        tabContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;

            // Update tabs
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show corresponding section
            const tabId = btn.getAttribute('data-tab');
            document.querySelectorAll('.skill-group').forEach(group => {
                group.classList.remove('active');
            });

            const targetGroup = document.getElementById(`skill-${tabId}`);
            if (targetGroup) {
                targetGroup.classList.add('active');
                
                // Animate skill bars
                targetGroup.querySelectorAll('.skill-fill').forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                });
            }
        });

        // Trigger initial load
        const firstTab = tabContainer.querySelector('.tab-btn');
        if (firstTab) firstTab.click();
    }

    // ── PROJECT FILTERS ──────────────────────────────────────
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    const shouldShow = filter === 'all' || (categories && categories.includes(filter));
                    
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.classList.toggle('hide', !shouldShow);
                        
                        if (shouldShow) {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }
                    }, 150);
                });
            });
        });
    }

    // ── SCROLL EFFECTS ───────────────────────────────────────
    function initScrollEffects() {
        // Initialize AOS-like system
        const animatedElements = document.querySelectorAll('[data-animate]');

        animatedElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const animationType = element.getAttribute('data-animate');
                        element.classList.add(`animate-${animationType}`, 'animated');
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.1, rootMargin: '50px' });

            observer.observe(element);
        });

        // Skill bar animation on scroll
        const skillBars = document.querySelectorAll('.skill-fill');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));

        // Parallax effect
        if (!state.reducedMotion) {
            const parallaxElements = document.querySelectorAll('[data-parallax]');
            window.addEventListener('scroll', debounce(() => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }, 16));
        }
    }

    // ── REVEAL ANIMATIONS ────────────────────────────────────
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');

        revealElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const direction = element.getAttribute('data-reveal') || 'up';
                        const delay = element.getAttribute('data-delay') || 0;
                        
                        element.style.animation = `reveal-${direction} 0.8s ease forwards`;
                        element.style.animationDelay = `${delay}ms`;
                        
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(element);
        });
    }

    // ── CONTACT FORM ─────────────────────────────────────────
    function initContactForm() {
        if (!DOM.contactForm) return;

        DOM.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(DOM.contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            const errors = validateForm(data);
            if (Object.keys(errors).length > 0) {
                showFormErrors(errors);
                return;
            }

            // Submit button state
            const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Sending...';

            try {
                // Send via email service or API
                const response = await submitForm(data);
                
                if (response.success) {
                    showToast('✅ Message sent successfully!', 'success');
                    DOM.contactForm.reset();
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form',
                        'value': 1,
                    });
                } else {
                    throw new Error(response.error);
                }
            } catch (error) {
                console.error('Form error:', error);
                showToast('❌ Error sending message. Please try again.', 'error');
                showToast(`💡 Or email me directly at ${CONFIG.contact.primaryEmail}`, 'info');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHTML;
            }
        });
    }

    function validateForm(data) {
        const errors = {};

        // Name validation
        if (!data.name || data.name.length < 2) {
            errors.name = 'Please enter your name';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Message validation
        if (!data.message || data.message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }

        return errors;
    }

    function showFormErrors(errors) {
        Object.keys(errors).forEach(field => {
            const input = DOM.contactForm.querySelector(`[name="${field}"]`);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'input-error';
            errorDiv.textContent = errors[field];
            
            input.classList.add('error');
            input.parentElement.appendChild(errorDiv);
            
            // Remove error after 3 seconds
            setTimeout(() => {
                input.classList.remove('error');
                errorDiv.remove();
            }, 3000);
        });
    }

    async function submitForm(data) {
        // FormSubmit.co integration
        const response = await fetch(DOM.contactForm.action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        return response.json();
    }

    // ── TOAST SYSTEM ─────────────────────────────────────────
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ── CUSTOM CURSOR ────────────────────────────────────────
    function initCustomCursor() {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const ring = document.createElement('div');
        ring.className = 'custom-cursor-ring';
        document.body.appendChild(ring);

        // Mouse position tracking
        document.addEventListener('mousemove', (e) => {
            state.cursorPosition = { x: e.clientX, y: e.clientY };

            // Direct cursor movement
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            // Smooth ring movement
            requestAnimationFrame(() => {
                ring.style.left = `${e.clientX}px`;
                ring.style.top = `${e.clientY}px`;
            });

            // Cursor effects on hover
            const target = e.target;
            if (target.matches('a, button, input, textarea, select')) {
                cursor.style.transform = 'scale(2.5)';
                cursor.style.opacity = '0.5';
                ring.style.borderColor = 'var(--primary)';
            } else {
                cursor.style.transform = 'scale(1)';
                cursor.style.opacity = '1';
                ring.style.borderColor = 'rgba(0, 240, 255, 0.5)';
            }
        });

        // Mouse leave
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            ring.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            ring.style.opacity = '1';
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    }

    // ── AI ASSISTANT ─────────────────────────────────────────
    function initAIAssistant() {
        const trigger = document.getElementById('assistant-trigger');
        const close = document.getElementById('chat-close');
        const sendBtn = document.getElementById('chat-send');
        const input = document.getElementById('chat-input');

        if (trigger) {
            trigger.addEventListener('click', toggleChat);
        }

        if (close) {
            close.addEventListener('click', toggleChat);
        }

        if (sendBtn && input) {
            sendBtn.addEventListener('click', () => {
                sendMessage(input.value);
                input.value = '';
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage(input.value);
                    input.value = '';
                }
            });
        }

        // Suggestion chips
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                sendMessage(chip.textContent);
            });
        });

        function toggleChat() {
            DOM.chatWidget?.classList.toggle('open');
        }

        function sendMessage(message) {
            if (!message.trim()) return;

            // Add user message
            addMessage(message, 'user');
            
            // Get AI response
            setTimeout(() => {
                const response = getAIResponse(message);
                addMessage(response, 'assistant');
            }, 1000);
        }

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'assistant-message'}`;
            
            if (sender === 'assistant') {
                messageDiv.innerHTML = `
                    <div class="message-avatar">🤖</div>
                    <div class="message-content"><p>${text}</p></div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="message-avatar">👤</div>
                    <div class="message-content"><p>${text}</p></div>
                `;
            }
            
            DOM.chatMessages.appendChild(messageDiv);
            DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
        }

        function getAIResponse(query) {
            const messages = [
                {
                    pattern: /(hi|hello|hey|greetings)/i,
                    response: "Hello! 👋 I'm MKA's AI assistant. I can tell you about Moe's skills, projects, and availability. What would you like to know?",
                },
                {
                    pattern: /(skills|technolog|stack|expertise)/i,
                    response: `Moe specializes in:\n✅ Kotlin & Jetpack Compose\n✅ MVVM/Architecture\n✅ AI/ML Integration\n✅ Firebase & Cloud Services\n✅ POS Systems\n\nHe has 82+ certifications and 5+ years of experience!`,
                },
                {
                    pattern: /(projects|work|apps|portfolio)/i,
                    response: `Moe has built 50+ projects including:\n🚀 POS Systems (Ultimate Pro Max)\n📱 Android Applications\n🤖 AI-Powered Solutions\n🎮 Game Collections\n\nYou can see them all at github.com/Dev-moe-kyawaung`,
                },
                {
                    pattern: /(hire|contact|freelance|email|phone)/i,
                    response: `Sure! You can reach Moe at:\n📧 ${CONFIG.contact.primaryEmail}\n📱 ${CONFIG.contact.whatsapp}\n\nThe quickest way is to use the contact form above. He responds within 2 hours!`,
                },
                {
                    pattern: /(experience|years|background)/i,
                    response: `Moe has 5+ years of Android development experience. He's worked on:\n📱 50+ Mobile Apps\n💰 POS systems generating $1M+ revenue\n🤖 AI/ML integrated solutions\n🌍 Projects for clients worldwide`,
                },
                {
                    pattern: /(rate|price|cost|charge)/i,
                    response: `Moe's rates depend on the project scope. For a standard app, budgets typically range from $1,000 to $5,000. Enterprise solutions can range higher. Please use the contact form for a detailed quote!`,
                },
                {
                    pattern: /(available|status|time)/i,
                    response: "Moe is currently available for:\n🟢 Freelance projects\n🟢 Full-time opportunities\n🟢 Technical consultation\n\nHe's typically in Bangkok but works with clients worldwide!",
                },
                {
                    pattern: /(thanks|thank you)/i,
                    response: "You're welcome! 😊 Don't hesitate to reach out if you have more questions. Moe would be happy to help with your project!",
                },
                {
                    pattern: /(default)/,
                    response: "Great question! I'd suggest using the contact form for detailed questions. For quick info, you can ask me about:\n💼 Projects\n🛠️ Skills\n💰 Rates\n📞 Contact info",
                },
            ];

            const matched = messages.find(m => m.pattern.test(query)) || messages[messages.length - 1];
            return matched.response;
        }
    }

    // ── SERVICE WORKER ───────────────────────────────────────
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => console.log('Service Worker registered:', reg.scope))
                    .catch(err => console.error('Service Worker error:', err));
            });
        }
    }

    // ── ANALYTICS ────────────────────────────────────────────
    function initAnalytics() {
        // Page view tracking
        gtag('config', 'G-XXXXXXX', {
            'send_page_view': true,
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure',
        });

        // User engagement tracking
        let engagementTime = 0;
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                engagementTime += 1;
                if (engagementTime % 30 === 0) {
                    trackEvent('engagement_minutes', { minutes: engagementTime / 60 });
                }
            }
        }, 1000);

        // Click tracking
        document.addEventListener('click', (e) => {
            const target = e.target;
            if (target.matches('[data-track]')) {
                const eventName = target.getAttribute('data-track');
                trackEvent(eventName);
            }
        });
    }

    function trackEvent(action, params = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'engagement',
                'event_label': 'portfolio',
                ...params,
            });
        }
    }

    // ── SEO OPTIMIZATION ─────────────────────────────────────
    function initSEO() {
        // Update dynamic content for SEO
        const dynamicUpdates = {
            'og:title': `${CONFIG.name} - Premium Android Developer`,
            'og:description': 'Senior Android Developer crafting exceptional mobile experiences with Kotlin, Compose, and AI.',
            'og:image': 'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp',
        };

        Object.entries(dynamicUpdates).forEach(([property, content]) => {
            const tag = document.querySelector(`meta[property="${property}"]`);
            if (tag) tag.setAttribute('content', content);
        });

        // Add JSON-LD for dynamic content
        updateJSONLD();
    }

    function updateJSONLD() {
        const schema = {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": CONFIG.name,
            "description": "Senior Android Developer specializing in enterprise mobile solutions",
            "telephone": CONFIG.phone,
            "email": CONFIG.contact.primaryEmail,
            "url": CONFIG.baseUrl,
            "sameAs": Object.values(CONFIG.social),
        };

        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    // ── PERFORMANCE MONITOR ──────────────────────────────────
    function initPerformanceMonitor() {
        // Web Vitals monitoring
        if ('PerformanceObserver' in window) {
            // LCP
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const lcp = list.getEntries()[list.getEntries().length - 1];
                    console.log('📊 LCP:', Math.round(lcp.startTime), 'ms');
                    trackEvent('performance_lcp', { value: Math.round(lcp.startTime) });
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {}

            // FID
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const fid = list.getEntries()[0];
                    console.log('🎯 FID:', Math.round(fid.processingStart - fid.startTime), 'ms');
                    trackEvent('performance_fid', { value: Math.round(fid.processingStart - fid.startTime) });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {}

            // CLS
            try {
                const clsObserver = new PerformanceObserver((list) => {
                    let clsValue = 0;
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    console.log('📐 CLS:', clsValue.toFixed(4));
                    trackEvent('performance_cls', { value: parseFloat(clsValue.toFixed(4)) });
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {}
        }

        // Load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('⏱️ Page load:', Math.round(loadTime), 'ms');
            trackEvent('performance_load', { value: Math.round(loadTime) });
        });
    }

    // ── NETWORK MONITOR ──────────────────────────────────────
    function initNetworkMonitor() {
        window.addEventListener('online', () => {
            state.online = true;
            showToast('🌐 Back online!', 'success');
        });

        window.addEventListener('offline', () => {
            state.online = false;
            showToast('📡 Offline. Showing cached content', 'info');
        });
    }

    // ── COOKIE CONSENT ───────────────────────────────────────
    function initCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        
        if (!consent) {
            setTimeout(() => {
                DOM.cookieConsent?.classList.add('show');
            }, 3000);
        }

        const acceptBtn = document.getElementById('cookie-accept');
        const essentialBtn = document.getElementById('cookie-essential');

        acceptBtn?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'all');
            DOM.cookieConsent.classList.remove('show');
            trackEvent('cookie_consent', { type: 'accept_all' });
        });

        essentialBtn?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'essential');
            DOM.cookieConsent.classList.remove('show');
        });
    }

    // ── PWA INSTALL ──────────────────────────────────────────
    function initPWAInstall() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            DOM.pwaInstall?.parentElement.classList.add('show');
        });

        DOM.pwaInstall?.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    trackEvent('pwa_installed');
                }
                
                deferredPrompt = null;
                DOM.pwaInstall.parentElement.classList.remove('show');
            }
        });

        // Close notification
        document.getElementById('notif-close')?.addEventListener('click', () => {
            DOM.pwaInstall?.parentElement.classList.remove('show');
        });
    }

    // ── ACCESSIBILITY ───────────────────────────────────────
    function initAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // ESC key closes modals
            if (e.key === 'Escape') {
                closeMobileNav();
                DOM.chatWidget?.classList.remove('open');
            }

            // 'M' key toggles mobile nav
            if (e.key === 'm' && e.ctrlKey) {
                toggleMobileNav();
            }

            // Tab focus visible only
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-user');
            }
        });

        // Mouse click removes keyboard-only class
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-user');
        });

        // Reduced motion
        if (state.reducedMotion) {
            document.documentElement.style.scrollBehavior = 'auto';
        }
    }

    // ── ERROR HANDLING ───────────────────────────────────────
    function initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            trackEvent('error', {
                message: e.message,
                type: 'runtime',
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled rejection:', e.reason);
            trackEvent('error', {
                message: e.reason?.message || 'Unknown error',
                type: 'unhandledrejection',
            });
        });
    }

    function handleFatalError(error) {
        console.error('Fatal error:', error);
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fatal-error';
        errorDiv.innerHTML = `
            <h2>⚠️ Something went wrong</h2>
            <p>Please refresh the page or try again later.</p>
            <button onclick="location.reload()">Reload Page</button>
        `;
        document.body.innerHTML = '';
        document.body.appendChild(errorDiv);
    }

    // ── SEARCH SYSTEM ────────────────────────────────────────
    function initSearch() {
        // Cmd/Ctrl + K to open search
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                DOM.searchModal?.classList.toggle('show');
                DOM.searchInput?.focus();
            }
        });
    }

    // ── BLOG SYSTEM _________________________________________________
    function initBlog() {
        const blogContainer = document.querySelector('.blog-grid');
        if (!blogContainer) return;

        // Lazy load blog posts from JSON
        fetch('/data/blog-posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.slice(0, 6).forEach((post, index) => {
                    const card = createBlogCard(post, index);
                    blogContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Blog loading error:', error));
    }

    function createBlogCard(post, index) {
        const article = document.createElement('article');
        article.className = 'blog-card';
        article.innerHTML = `
            <div class="blog-card-header">
                <span class="blog-date">${post.date}</span>
                <span class="blog-category">${post.category}</span>
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="${post.url}" class="blog-read-more">Read More →</a>
        `;
        
        article.style.animationDelay = `${index * 100}ms`;
        article.classList.add('animate-fade-in-up');
        
        return article;
    }

    // ── GALLERY SYSTEM ───────────────────────────────────────
    function initGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Lightbox functionality
        const lightbox = document.getElementById('lightbox');
        
        galleryGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                openLightbox(item);
            }
        });

        function openLightbox(item) {
            const imageUrl = item.querySelector('img').src;
            const caption = item.querySelector('.gallery-caption')?.textContent;
            
            if (!lightbox) return;

            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">✕</button>
                    <img src="${imageUrl}" alt="${caption || 'Gallery image'}">
                    <p class="lightbox-caption">${caption || ''}</p>
                </div>
            `;
            lightbox.classList.add('show');
        }

        // Close lightbox
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-content') || 
                e.target.classList.contains('lightbox-close')) {
                document.getElementById('lightbox')?.classList.remove('show');
            }
        });
    }

    // ── TESTIMONIALS ─────────────────────────────────────────
    function initTestimonials() {
        let currentSlide = 0;
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.testimonial-card');
        const dotsContainer = slider.querySelector('.slider-dots');

        // Dots
        slides.forEach((_, idx) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            currentSlide = index;
            slider.querySelector('.testimonial-track').style.transform = 
                `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dotsContainer.querySelectorAll('.dot').forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentSlide);
            });
        }

        // Auto-advance
        if (slides.length > 1) {
            setInterval(() => {
                goToSlide((currentSlide + 1) % slides.length);
            }, 5000);
        }
    }

    // ── VIDEO PLAYER ─────────────────────────────────────────
    function initVideoPlayer() {
        document.querySelectorAll('[data-video]').forEach(videoWrapper => {
            const playButton = videoWrapper.querySelector('.play-button');
            if (!playButton) return;

            playButton.addEventListener('click', () => {
                const videoSrc = videoWrapper.getAttribute('data-video');
                const iframe = document.createElement('iframe');
                iframe.src = videoSrc;
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                videoWrapper.innerHTML = '';
                videoWrapper.appendChild(iframe);
            });
        });
    }

    // ── THEME MANAGER ────────────────────────────────────────
    function initThemeManager() {
        DOM.themeToggle?.addEventListener('click', () => {
            const newTheme = state.activeTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });

        // System theme detection
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }

    function applyTheme(theme) {
        state.activeTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle icon
        if (DOM.themeToggle) {
            DOM.themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
        }
        
        trackEvent('theme_changed', { theme });
    }

    // ── LANGUAGE MANAGER ─────────────────────────────────────
    function initLanguageManager() {
        DOM.langBtn?.addEventListener('click', toggleLangDropdown);
        
        // Language options
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                applyLanguage(lang);
                closeLangDropdown();
            });
        });

        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.lang-switch')) {
                closeLangDropdown();
            }
        });
    }

    function toggleLangDropdown() {
        document.getElementById('lang-dropdown')?.classList.toggle('show');
    }

    function closeLangDropdown() {
        document.getElementById('lang-dropdown')?.classList.remove('show');
    }

    function applyLanguage(lang) {
        state.activeLanguage = lang;
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        // Load translations
        loadTranslations(lang);

        // Update dropdown
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });
    }

    async function loadTranslations(lang) {
        try {
            const response = await fetch(`/data/locales/${lang}.json`);
            const translations = await response.json();
            
            // Apply translations
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (translations[key]) {
                    el.textContent = translations[key];
                }
            });
            
            // Single elements
            document.querySelectorAll('[data-translate-html]').forEach(el => {
                const key = el.getAttribute('data-translate-html');
                if (translations[key]) {
                    el.innerHTML = translations[key];
                }
            });
        } catch (error) {
            console.error('Translation loading error:', error);
        }
    }

    // ── PAGE TRANSITIONS ─────────────────────────────────────
    function initPageTransitions() {
        // Handle enhanced navigation
        document.querySelectorAll('[data-page-link]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page-link');
                navigateToPage(page);
            });
        });
    }

    function navigateToPage(page) {
        // Add exit animation
        document.body.classList.add('page-exiting');
        
        setTimeout(() => {
            // Navigate to new page (this would be replaced with actual routing)
            window.location.href = page;
        }, 300);
    }

    // ── GLOBAL EVENTS ────────────────────────────────────────
    function bindGlobalEvents() {
        // Resize handling
        window.addEventListener('resize', debounce(() => {
            checkMobile();
            
            // Update state
            state.isMobile = window.innerWidth <= 768;
            state.isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        }, 200));

        // Scroll direction detection
        window.addEventListener('scroll', debounce(() => {
            const currentScroll = window.scrollY;
            state.scrollDirection = currentScroll > state.lastScrollPos ? 'down' : 'up';
            state.lastScrollPos = currentScroll;
        }, 100));

        // Online/Offline
        window.addEventListener('online', () => {
            state.online = true;
            showToast('🌐 Back online!', 'success');
        });

        window.addEventListener('offline', () => {
            state.online = false;
            showToast('📡 Offline mode enabled', 'info');
        });

        // Before unload
        window.addEventListener('beforeunload', () => {
            // Save state
            sessionStorage.setItem('scroll_position', window.scrollY);
        });

        // Restore scroll position
        const savedScroll = sessionStorage.getItem('scroll_position');
        if (savedScroll) {
            window.scrollTo(0, parseInt(savedScroll));
            sessionStorage.removeItem('scroll_position');
        }
    }

    // ── UTILITY FUNCTIONS ────────────────────────────────────
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

    function checkMobile() {
        // Close mobile nav on desktop
        if (window.innerWidth > 768 && state.isNavOpen) {
            closeMobileNav();
        }
    }

    // ── PUBLIC API ───────────────────────────────────────────
    return {
        // Core
        init,
        state,
        CONFIG,
        
        // Navigation
        toggleMobileNav,
        closeMobileNav,
        
        // Utilities
        debounce,
        throttle,
        showToast,
        trackEvent,
        
        // Theme & Language
        applyTheme,
        applyLanguage,
        
        // Navigation
        navigateToPage,
        
        // Version
        version: state.version,
    };
})();

// UMD Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}

// Global instance
window.App = App;
