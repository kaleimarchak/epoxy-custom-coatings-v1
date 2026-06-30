(function () {
    var nav = document.getElementById('navbarNav');
    if (!nav) {
        return;
    }

    nav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 992 && nav.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }
        });
    });
})();
