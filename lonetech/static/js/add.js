function addProduct(tabId, productHTML) {
    const carousel = document.querySelector(`#${tabId} .product-carousel`);
    carousel.insertAdjacentHTML('beforeend', productHTML);
    
    // Update the total number of slides
    const slides = carousel.querySelectorAll('.product-card');
    const totalSlides = slides.length;

    // If needed, reset currentIndex if it's out of bounds
    let currentIndex = parseInt(carousel.getAttribute('data-index')) || 0;
    if (currentIndex >= totalSlides) {
        currentIndex = totalSlides - 1;
    }
    carousel.setAttribute('data-index', currentIndex);
    
    // Optionally re-adjust the position if you want to show the newly added product
    changeSlide(tabId, 0); // Move to the new current position
}
