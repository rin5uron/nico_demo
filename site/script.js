document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu --- //
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    if (hamburger && mobileNav && mobileOverlay) {
        const openMenu = () => {
            mobileNav.classList.add('is-open');
            mobileOverlay.classList.add('is-open');
            hamburger.classList.add('is-open');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', 'メニューを閉じる');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            mobileNav.classList.remove('is-open');
            mobileOverlay.classList.remove('is-open');
            hamburger.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'メニューを開く');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', () => {
            if (mobileNav.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when overlay is clicked
        mobileOverlay.addEventListener('click', closeMenu);

        // Close mobile menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.mobile-nav a');
        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
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

    // --- Event Swiper（1枚ずつ表示）--- //
    const eventSwiperEls = document.querySelectorAll('.event-swiper');
    eventSwiperEls.forEach((eventSwiperEl) => {
        new Swiper(eventSwiperEl, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 16,
            speed: 1500,
            grabCursor: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: eventSwiperEl.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 4,
            },
            navigation: {
                nextEl: eventSwiperEl.querySelector('.swiper-button-next'),
                prevEl: eventSwiperEl.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                }
            }
        });
    });

    // --- Product Swiper（スマホ1枚・PCは4枚・矢印は画像に被らない）--- //
    const productSwiperEls = document.querySelectorAll('.product-swiper');
    productSwiperEls.forEach((productSwiperEl) => {
        new Swiper(productSwiperEl, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 16,
            grabCursor: true,
            speed: 1500,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: productSwiperEl.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 4,
            },
            navigation: {
                nextEl: productSwiperEl.querySelector('.swiper-button-next'),
                prevEl: productSwiperEl.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                }
            }
        });
    });

});