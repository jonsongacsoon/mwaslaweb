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

    // Rider App Custom Timing Slideshow (Hero Section)
    const riderSlides = document.querySelectorAll('.rider-slide');
    if (riderSlides.length > 0) {
        // Durations sequence: 2s -> 2.5s -> 3s
        const riderDurations = [2000, 2500, 3000];

        let currentRiderIndex = 0; // Slide 0 is active on load

        function showNextRiderSlide() {
            let nextRiderIndex = (currentRiderIndex + 1) % riderSlides.length;

            // Clear 'prev' from all slides
            riderSlides.forEach(slide => slide.classList.remove('prev'));

            // The old slide falls back to 'prev'
            riderSlides[currentRiderIndex].classList.remove('active');
            riderSlides[currentRiderIndex].classList.add('prev');

            // The new slide becomes 'active'
            riderSlides[nextRiderIndex].classList.add('active');

            // Wait time for the NEW slide
            const waitTimeInfo = riderDurations[nextRiderIndex] || 2000;

            currentRiderIndex = nextRiderIndex;
            setTimeout(showNextRiderSlide, waitTimeInfo);
        }

        // Start sequence by waiting for the first slide's duration
        setTimeout(showNextRiderSlide, riderDurations[0]);
    }

    // Driver App Custom Timing Slideshow
    const driverSlides = document.querySelectorAll('.driver-slide');
    if (driverSlides.length > 0) {
        // Durations sequence: 1.5s first, 3s last, 0.6s for all in between
        const durations = Array(driverSlides.length).fill(600);
        if (durations.length > 0) durations[0] = 1500;
        if (durations.length > 1) durations[durations.length - 1] = 3000;

        let currentIndex = 0; // Slide 0 is active on load

        function showNextDriverSlide() {
            let nextIndex = (currentIndex + 1) % driverSlides.length;

            // Clear 'prev' from all slides
            driverSlides.forEach(slide => slide.classList.remove('prev'));

            // The old slide falls back to 'prev'
            driverSlides[currentIndex].classList.remove('active');
            driverSlides[currentIndex].classList.add('prev');

            // The new slide becomes 'active'
            driverSlides[nextIndex].classList.add('active');

            // Wait time for the NEW slide
            const waitTime = durations[nextIndex] || 400;

            currentIndex = nextIndex;
            setTimeout(showNextDriverSlide, waitTime);
        }

        // Start sequence by waiting for the first slide's duration
        setTimeout(showNextDriverSlide, durations[0]);
    }
});
