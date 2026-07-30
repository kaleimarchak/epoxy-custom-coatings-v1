(function () {
    var nav = document.getElementById('navbarNav');
    var toggler = document.querySelector('.site-nav .navbar-toggler');
    if (!nav || !toggler) {
        return;
    }

    function isMobileNav() {
        return window.innerWidth < 992;
    }

    function setNavOpen(open) {
        nav.classList.toggle('show', open);
        toggler.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function closeNav() {
        setNavOpen(false);
    }

    function closeDropdowns(exceptMenu) {
        document.querySelectorAll('.site-nav .dropdown-menu.show').forEach(function (menu) {
            if (menu !== exceptMenu) {
                menu.classList.remove('show');
                var toggle = menu.parentElement && menu.parentElement.querySelector('.dropdown-toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    toggler.addEventListener('click', function () {
        var willOpen = !nav.classList.contains('show');
        if (!willOpen) {
            closeDropdowns();
        }
        setNavOpen(willOpen);
    });

    document.querySelectorAll('.site-nav .dropdown').forEach(function (dropdown) {
        var toggle = dropdown.querySelector('.dropdown-toggle');
        var menu = dropdown.querySelector('.dropdown-menu');
        if (!toggle || !menu) {
            return;
        }

        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            var willOpen = !menu.classList.contains('show');
            closeDropdowns(willOpen ? menu : null);
            menu.classList.toggle('show', willOpen);
            toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });
    });

    nav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(function (link) {
        link.addEventListener('click', function () {
            closeDropdowns();
            if (isMobileNav()) {
                closeNav();
            }
        });
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.site-nav')) {
            closeDropdowns();
            if (isMobileNav()) {
                closeNav();
            }
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeDropdowns();
            closeNav();
        }
    });

    window.addEventListener('resize', function () {
        if (!isMobileNav()) {
            closeNav();
            closeDropdowns();
        }
    });
})();
