(function() {
    'use strict';

    function initParallaxAnimations() {
        const parallaxElements = document.querySelectorAll('[class*="parallax-"]');

        if (parallaxElements.length === 0) {
            return;
        }

        parallaxElements.forEach(function(element) {
            const isScrollInOut = element.classList.contains('parallax-trigger-scroll-in-out');

            // Apply custom timing values from data attributes
            const duration = element.getAttribute('data-parallax-duration') || '800';
            const delay = element.getAttribute('data-parallax-delay') || '0';

            element.style.setProperty('--parallax-duration', duration + 'ms');
            element.style.setProperty('--parallax-delay', delay + 'ms');

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('parallax-visible');
                    } else if (isScrollInOut) {
                        entry.target.classList.remove('parallax-visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px 300px 0px'
            });

            observer.observe(element);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParallaxAnimations);
    } else {
        initParallaxAnimations();
    }

})();