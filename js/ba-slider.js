(function () {
    var sliders = document.querySelectorAll('.ba-slider');
    if (!sliders.length) {
        return;
    }

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    sliders.forEach(function (slider, sliderIndex) {
        var range = slider.querySelector('.ba-range');
        if (!range) {
            return;
        }

        var engaged = false;
        var demoPlayed = false;
        var demoFrame = null;

        function syncSliderSize() {
            slider.style.setProperty('--ba-slider-width', slider.offsetWidth + 'px');
        }

        function updateSlider(value) {
            slider.style.setProperty('--ba-pos', value + '%');
            range.value = value;
        }

        function easeInOutSine(t) {
            return -(Math.cos(Math.PI * t) - 1) / 2;
        }

        function stopDemo() {
            engaged = true;
            slider.classList.add('ba-slider--engaged');
            slider.classList.remove('ba-slider--demoing');
            if (demoFrame) {
                cancelAnimationFrame(demoFrame);
                demoFrame = null;
            }
        }

        function animateTo(from, to, duration, done) {
            var startTime = null;

            function frame(timestamp) {
                if (engaged) {
                    return;
                }

                if (!startTime) {
                    startTime = timestamp;
                }

                var progress = Math.min((timestamp - startTime) / duration, 1);
                var value = from + (to - from) * easeInOutSine(progress);
                updateSlider(value);

                if (progress < 1) {
                    demoFrame = requestAnimationFrame(frame);
                } else if (done) {
                    done();
                }
            }

            demoFrame = requestAnimationFrame(frame);
        }

        function playAttentionDemo() {
            if (demoPlayed || engaged || prefersReducedMotion) {
                return;
            }

            demoPlayed = true;
            slider.classList.add('ba-slider--demoing');

            animateTo(50, 68, 2200, function () {
                if (engaged) {
                    return;
                }
                animateTo(68, 32, 2800, function () {
                    if (engaged) {
                        return;
                    }
                    animateTo(32, 50, 2000, function () {
                        slider.classList.remove('ba-slider--demoing');
                    });
                });
            });
        }

        range.addEventListener('input', function () {
            stopDemo();
            updateSlider(range.value);
        });

        range.addEventListener('mousedown', stopDemo);
        range.addEventListener('touchstart', stopDemo, { passive: true });

        window.addEventListener('resize', syncSliderSize);

        if (window.ResizeObserver) {
            new ResizeObserver(syncSliderSize).observe(slider);
        }

        if ('IntersectionObserver' in window && !prefersReducedMotion && sliderIndex === 0) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        playAttentionDemo();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.45 });
            observer.observe(slider);
        }

        syncSliderSize();
        updateSlider(range.value);
    });
})();
