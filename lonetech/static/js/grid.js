document.addEventListener("DOMContentLoaded", function () {
    const productContainers = document.querySelectorAll('.product-container'); // Get all product containers
    let currentGridClass = 'grid-2x2'; // Default grid class

    // Function to clear active class from view buttons
    function clearActiveClasses() {
        document.querySelectorAll('.view-options a').forEach(button => button.classList.remove('active'));
    }

    // Function to clear grid classes from all product grids
    function clearGridClasses() {
        productContainers.forEach(container => {
            const productGrid = container.querySelector('.product-grid');
            productGrid.classList.remove('grid-2x2', 'grid-3x3', 'grid-4x4');
        });
    }

    // Function to set the grid class on the active product container
    function setActiveGrid() {
        const activeTab = document.querySelector('.product-container.active');
        const productGrid = activeTab.querySelector('.product-grid');
        productGrid.classList.add(currentGridClass);
    }

    // Event listeners for each grid button
    document.querySelectorAll('.view-options a').forEach(button => {
        button.addEventListener('click', function () {
            clearActiveClasses();
            clearGridClasses();
            this.classList.add('active');
            currentGridClass = this.id; // Set current grid class based on clicked button's ID
            setActiveGrid(); // Apply grid to the currently active tab
        });
    });

    // Tab change function to switch between tabs
    window.changeTab = function (tabId) {
        // Hide all product containers
        productContainers.forEach(container => {
            container.classList.remove('active');
            container.style.display = 'none'; // Hide all
        });

        // Show the selected tab
        const selectedTab = document.getElementById(tabId);
        selectedTab.classList.add('active');
        selectedTab.style.display = 'block'; // Show the active tab

        // Apply the current grid class to the newly active tab
        clearGridClasses(); // Clear grid classes first
        setActiveGrid(); // Set the current grid class for the new active tab
    };

    // Set initial grid class for the default active tab
    clearGridClasses(); // Clear any existing grid classes
    setActiveGrid(); // Set the initial active grid
});
