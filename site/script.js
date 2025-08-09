document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu --- //
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('#nav-links');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isOpen = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            if(isOpen) {
                menuToggle.setAttribute('aria-label', 'メニューを閉じる');
            } else {
                menuToggle.setAttribute('aria-label', 'メニューを開く');
            }
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

    // --- Swiper Initialization --- //
    const swiper = new Swiper('.mySwiper2', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            }
        }
    });

});