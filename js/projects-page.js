(function () {
    var filterButtons = document.querySelectorAll('[data-gallery-filter]');
    var galleryItems = document.querySelectorAll('[data-gallery-item]');
    var lightbox = document.getElementById('galleryLightbox');
    var lightboxImage = document.getElementById('galleryLightboxImage');
    var lightboxCaption = document.getElementById('galleryLightboxCaption');
    var lightboxClose = document.getElementById('galleryLightboxClose');

    function setGalleryFilter(filter) {
        filterButtons.forEach(function (button) {
            var isActive = button.getAttribute('data-gallery-filter') === filter;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        galleryItems.forEach(function (item) {
            var category = item.getAttribute('data-category');
            var visible = filter === 'all' || category === filter;
            item.classList.toggle('is-hidden', !visible);
            item.setAttribute('aria-hidden', visible ? 'false' : 'true');
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            setGalleryFilter(button.getAttribute('data-gallery-filter'));
        });
    });

    function openLightbox(imageSrc, caption) {
        if (!lightbox || !lightboxImage) {
            return;
        }

        lightboxImage.src = imageSrc;
        lightboxImage.alt = caption;
        if (lightboxCaption) {
            lightboxCaption.textContent = caption;
        }
        lightbox.hidden = false;
        document.body.classList.add('gallery-lightbox-open');
        if (lightboxClose) {
            lightboxClose.focus();
        }
    }

    function closeLightbox() {
        if (!lightbox) {
            return;
        }

        lightbox.hidden = true;
        document.body.classList.remove('gallery-lightbox-open');
        if (lightboxImage) {
            lightboxImage.removeAttribute('src');
        }
    }

    galleryItems.forEach(function (item) {
        var trigger = item.querySelector('[data-gallery-open]');
        if (!trigger) {
            return;
        }

        trigger.addEventListener('click', function () {
            if (item.classList.contains('is-hidden')) {
                return;
            }
            openLightbox(trigger.getAttribute('data-full-src'), trigger.getAttribute('data-caption'));
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && lightbox && !lightbox.hidden) {
            closeLightbox();
        }
    });

    setGalleryFilter('all');
})();
