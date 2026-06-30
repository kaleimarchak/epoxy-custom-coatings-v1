(function () {
    var PROJECT_TYPES = ['Commercial', 'Industrial', 'Residential', 'ESD / Specialty', 'Other'];
    var LIMITS = { name: 100, email: 254, phone: 30, message: 5000 };

    function sanitizeText(value, maxLength) {
        if (typeof value !== 'string') {
            return '';
        }
        return value
            .replace(/\0/g, '')
            .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
            .replace(/<[^>]*>/g, '')
            .trim()
            .slice(0, maxLength);
    }

    function isValidName(value) {
        return /^[\p{L}\p{M}'.\-\s]{1,100}$/u.test(value);
    }

    function isValidEmail(value) {
        return /^[^\s@<>()[\]\\,;:\/"']+@[^\s@<>()[\]\\,;:\/"']+\.[^\s@<>()[\]\\,;:\/"']+$/.test(value);
    }

    function isValidPhone(value) {
        return value === '' || /^[\d\s().+\-]{7,30}$/.test(value);
    }

    function isValidProjectType(value) {
        return PROJECT_TYPES.indexOf(value) !== -1;
    }

    function showError(form, message) {
        var existing = form.querySelector('.contact-form-alert--error');
        if (existing) {
            existing.remove();
        }

        var alert = document.createElement('div');
        alert.className = 'contact-form-alert contact-form-alert--error';
        alert.setAttribute('role', 'alert');
        alert.textContent = message;
        form.insertBefore(alert, form.firstChild);
        alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function resetSubmitButton(button) {
        if (!button) {
            return;
        }
        button.disabled = false;
        button.innerHTML = 'Send Message<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    if (window.location.search.indexOf('sent=1') !== -1) {
        var successAlert = document.getElementById('formSuccessAlert');
        if (successAlert) {
            successAlert.hidden = false;
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    var form = document.getElementById('contactForm');
    if (!form) {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var nameInput = form.querySelector('#contactName');
        var emailInput = form.querySelector('#contactEmail');
        var phoneInput = form.querySelector('#contactPhone');
        var projectInput = form.querySelector('#contactProjectType');
        var messageInput = form.querySelector('#contactMessage');
        var honeyInput = form.querySelector('input[name="_honey"]');
        var button = form.querySelector('button[type="submit"]');

        if (honeyInput && honeyInput.value.trim() !== '') {
            return;
        }

        var name = sanitizeText(nameInput.value, LIMITS.name);
        var email = sanitizeText(emailInput.value, LIMITS.email);
        var phone = sanitizeText(phoneInput.value, LIMITS.phone);
        var projectType = sanitizeText(projectInput.value, 50);
        var message = sanitizeText(messageInput.value, LIMITS.message);

        nameInput.value = name;
        emailInput.value = email;
        phoneInput.value = phone;
        projectInput.value = projectType;
        messageInput.value = message;

        if (!isValidName(name)) {
            showError(form, 'Please enter a valid name using letters only.');
            resetSubmitButton(button);
            nameInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showError(form, 'Please enter a valid email address.');
            resetSubmitButton(button);
            emailInput.focus();
            return;
        }

        if (!isValidPhone(phone)) {
            showError(form, 'Please enter a valid phone number, or leave the field blank.');
            resetSubmitButton(button);
            phoneInput.focus();
            return;
        }

        if (!isValidProjectType(projectType)) {
            showError(form, 'Please select a project type from the list.');
            resetSubmitButton(button);
            projectInput.focus();
            return;
        }

        if (message.length < 10) {
            showError(form, 'Please provide at least 10 characters of project details.');
            resetSubmitButton(button);
            messageInput.focus();
            return;
        }

        var errorAlert = form.querySelector('.contact-form-alert--error');
        if (errorAlert) {
            errorAlert.remove();
        }

        if (button) {
            button.disabled = true;
            button.textContent = 'Sending...';
        }

        form.submit();
    });
})();
