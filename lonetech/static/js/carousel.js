function changeSlide(tabId, direction) {
    const carousel = document.querySelector(`#${tabId} .product-carousel`);
    const slides = carousel.querySelectorAll('.product-card');
    const totalSlides = slides.length;

    // Width of each slide including margins (assume a 20px margin between slides)
    const slideWidth = slides[0].offsetWidth + 20;

    // Calculate how many slides are visible at one time in the container
    const visibleSlides = Math.floor(carousel.parentElement.offsetWidth / slideWidth);

    // Get the current index from the data attribute, default to 0 if not set
    let currentIndex = parseInt(carousel.getAttribute('data-index')) || 0;
    currentIndex += direction;

    // Prevent overshooting beyond the last fully visible set of slides
    if (currentIndex > totalSlides - visibleSlides) {
        currentIndex = totalSlides - visibleSlides; // Stay at the last fully visible slide set
    }

    // Prevent going before the first slide
    if (currentIndex < 0) {
        currentIndex = 0; // Stay at the first slide
    }

    // Update the carousel's position based on the current index
    const translateXValue = -currentIndex * slideWidth; // Adjust the margin in calculation if needed
    carousel.style.transform = `translateX(${translateXValue}px)`;

    console.log(`Current index: ${currentIndex}, TranslateX: ${translateXValue}px`);

    // Update the current index in the data attribute
    carousel.setAttribute('data-index', currentIndex);
}
