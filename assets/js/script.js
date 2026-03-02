document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    // Initial load animations elements
    setTimeout(() => {
        document.querySelectorAll('.hero-content.reveal-up, .hero-image.reveal-left').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Observe scroll elements
    document.querySelectorAll('.reveal-up:not(.hero-content), .reveal-left:not(.hero-image), .reveal-right').forEach(el => {
        observer.observe(el);
    });

    // Simulate Payment Flow in Header
    const scanUI = document.querySelector('.scanner-ui');
    const successUI = document.querySelector('.payment-success');

    if (scanUI && successUI) {
        // Toggle simulation randomly to show app in action
        setInterval(() => {
            scanUI.style.opacity = '0';
            setTimeout(() => {
                successUI.classList.add('active');
                
                setTimeout(() => {
                    successUI.classList.remove('active');
                    setTimeout(() => {
                        scanUI.style.opacity = '1';
                    }, 300);
                }, 2000);
                
            }, 300);
        }, 5000);
    }
});
