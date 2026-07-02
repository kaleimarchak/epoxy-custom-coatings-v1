(function () {
    var reviews = [
        {
            text: 'Very professional and answered all my questions. I love my new floors and was super impressed with what they could do!',
            author: 'Melanie H.'
        },
        {
            text: 'Great customer service,  and communication. They were quick and efficient in the install and the floor looks great. Nice assortments of product options . Would recommend this company.',
            author: 'Clark S.'
        },
        {
            text: 'I\u2019ve been watching these men work their flooring magic for a while now, and I recently saw their craftsmanship at my sister-in-law\u2019s house. The work was absolutely incredible, high quality and impressively time-efficient. Keep an eye out for these amazing guys whenever you need something done right!',
            author: 'Nicole'
        }
    ];

    var quote = document.getElementById('testimonialQuote');
    var textEl = document.getElementById('testimonialText');
    var authorEl = document.getElementById('testimonialAuthor');
    var dots = document.querySelectorAll('.testimonial-dots .dot');
    var activeIndex = 0;

    if (!quote || !textEl || !authorEl || !dots.length) {
        return;
    }

    function renderReview(index) {
        activeIndex = index;
        textEl.textContent = '\u201C' + reviews[index].text + '\u201D';
        authorEl.textContent = reviews[index].author;

        dots.forEach(function (dot, i) {
            var isActive = i === index;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    function showReview(index) {
        if (index === activeIndex || index < 0 || index >= reviews.length) {
            return;
        }

        quote.classList.add('is-changing');

        window.setTimeout(function () {
            renderReview(index);
            quote.classList.remove('is-changing');
        }, 200);
    }

    renderReview(0);

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            showReview(parseInt(dot.getAttribute('data-index'), 10));
        });
    });
})();
