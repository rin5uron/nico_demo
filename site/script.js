document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu --- //
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.global-nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
            const isOpen = nav.classList.contains('is-open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.classList.toggle('is-open'); 
            if(isOpen) {
                menuToggle.setAttribute('aria-label', 'メニューを閉じる');
            } else {
                menuToggle.setAttribute('aria-label', 'メニューを開く');
            }
        });

        // Close mobile menu when a nav link is clicked (UX improvement, no visual change)
        const navLinks = document.querySelectorAll('.global-nav a');
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-open')) {
                    nav.classList.remove('is-open');
                    menuToggle.classList.remove('is-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'メニューを開く');
                }
            });
        });
    }

    // --- Fade In Animation on Scroll --- //
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // --- Event Swiper Initialization --- //
    const eventSwiper = new Swiper('.event-swiper', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        speed: 1500, // <--- アニメーション速度を調整
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            }
        }
    });

});