document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = navLinks.querySelectorAll('a');

    // --- Hamburger Menu Toggle ---
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const observerOptionsNav = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if(correspondingLink) {
                   correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptionsNav);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // --- Reveal elements on scroll ---
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptionsReveal = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptionsReveal);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Valores Slider for Mobile ---
    const initValoresSlider = () => {
        const slider = document.getElementById('valores-slider');
        const dotsContainer = document.getElementById('valores-dots');
        if (!slider || !dotsContainer) return;
        const cards = slider.querySelectorAll('.card');
        if (!cards.length) return;

        dotsContainer.innerHTML = '';
        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => cards[index].scrollIntoView());
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');
        if(dots.length > 0) dots[0].classList.add('active');

        slider.addEventListener('scroll', () => {
            const cardWidth = cards[0].offsetWidth;
            const scrollLeft = slider.scrollLeft;
            const currentIndex = Math.round(scrollLeft / cardWidth);
            dots.forEach(d => d.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        });
    };

    if (window.matchMedia("(max-width: 768px)").matches) {
        initValoresSlider();
         // Select the correct dots container for the valores slider
        const valoresDotsContainer = document.getElementById('valores-dots');
        if (valoresDotsContainer) {
            valoresDotsContainer.style.display = 'flex';
        }
    }
    
    // --- Reviews Slider ---
    const initReviewsSlider = () => {
        const slider = document.getElementById('review-slider');
        if (!slider) return;
        const slides = slider.querySelectorAll('.review-slide');
        const prevBtn = document.getElementById('review-prev');
        const nextBtn = document.getElementById('review-next');
        const dotsContainer = document.getElementById('review-dots');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        if (slideCount === 0) return;

        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll('.dot');

        const goToSlide = (slideIndex) => {
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            dots[slideIndex].classList.add('active');
            currentSlide = slideIndex;
        };

        nextBtn.addEventListener('click', () => {
            const nextSlide = (currentSlide + 1) % slideCount;
            goToSlide(nextSlide);
        });

        prevBtn.addEventListener('click', () => {
            const prevSlide = (currentSlide - 1 + slideCount) % slideCount;
            goToSlide(prevSlide);
        });
        
        goToSlide(0);
    };

    initReviewsSlider();

});
