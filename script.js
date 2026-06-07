document.addEventListener('DOMContentLoaded', () => {
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            const size = (Math.random() * 3 + 1) + 'px';
            particle.style.width = size;
            particle.style.height = size;
            container.appendChild(particle);
        }
    }

    createParticles();

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const bar1 = document.getElementById('bar1');
    const bar2 = document.getElementById('bar2');
    const bar3 = document.getElementById('bar3');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu && bar1 && bar2 && bar3) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('hidden');
            bar1.style.transform = isMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
            bar2.style.opacity = isMenuOpen ? '0' : '1';
            bar3.style.width = isMenuOpen ? '24px' : '';
            bar3.style.transform = isMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
        });
    }

    window.closeMobileMenu = function() {
        if (!mobileMenu || !bar1 || !bar2 || !bar3) return;
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        bar1.style.transform = '';
        bar2.style.opacity = '1';
        bar3.style.width = '';
        bar3.style.transform = '';
    };

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in-left').forEach(el => observer.observe(el));

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const navbar = document.getElementById('navbar');

    function updateScrollState() {
        const scrollPosition = window.scrollY || window.pageYOffset;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });

        if (backToTop) {
            if (scrollPosition > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        }

        if (navbar) {
            if (scrollPosition > 50) {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.8)';
                navbar.style.boxShadow = 'none';
            }
        }
    }

    window.addEventListener('scroll', updateScrollState);
    updateScrollState();

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetSelector = this.getAttribute('href');
            if (!targetSelector || targetSelector === '#') return;
            const target = document.querySelector(targetSelector);
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const position = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('button');
            if (!btn) return;
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.style.background = '';
                this.reset();
            }, 2500);
        });
    }
});
