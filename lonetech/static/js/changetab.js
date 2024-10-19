function changeTab(tab) {
    // Hide all product containers
    const containers = document.querySelectorAll('.product-container');
    containers.forEach(container => {
        container.classList.remove('active'); // Hide all containers
    });

    // Show the selected product container
    const selectedContainer = document.getElementById(tab);
    selectedContainer.classList.add('active'); // Show the selected container

    // Reset the carousel for the active tab
    const activeCarousel = selectedContainer.querySelector('.product-carousel');
    activeCarousel.setAttribute('data-index', '0'); // Reset to the first slide
    changeSlide(tab, 0); // Set to the first slide
}
