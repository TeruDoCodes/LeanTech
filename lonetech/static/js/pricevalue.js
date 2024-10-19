document.addEventListener("DOMContentLoaded", function() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const productGridMobiles = document.getElementById('product-grid-mobiles');
    const productGridLaptops = document.getElementById('product-grid-laptops');
    const productCountMobiles = document.getElementById('product-count-mobiles');
    const productCountLaptops = document.getElementById('product-count-laptops');

    // Update the displayed price value when the range input changes
    priceRange.addEventListener('input', function() {
        priceValue.textContent = `$${this.value}`;
        filterProducts(this.value); // Call filter function on input change
    });

    // Function to filter products based on the selected price range
    function filterProducts(maxPrice) {
        // This function will be called for the currently active tab
        const activeTab = document.querySelector('.product-container.active');
        const productGrid = activeTab.querySelector('.product-grid');
        const products = Array.from(productGrid.querySelectorAll('.product-card'));
        let visibleCount = 0;

        products.forEach(product => {
            const priceText = product.querySelector('.discounted').textContent; // Get price text
            const price = parseFloat(priceText.replace('$', '').replace(',', '')); // Parse price, removing $ and commas

            // Show product if its price is within the range, otherwise hide it
            if (price <= maxPrice) {
                product.style.display = 'block'; // Show product
                visibleCount++; // Increment visible product count
            } else {
                product.style.display = 'none'; // Hide product
            }
        });

        // Update the product count display
        const productCount = activeTab.querySelector('.header-left'); // Get the product count display element
        productCount.textContent = `${visibleCount} Products found`;
    }

    // Function to change tabs and update the product count
    window.changeTab = function(activeTabId) {
        const containers = document.querySelectorAll('.product-container');

        // Hide all containers and reset counts
        containers.forEach(container => {
            container.classList.remove('active');
        });

        // Show the active container
        const activeContainer = document.getElementById(activeTabId);
        activeContainer.classList.add('active');

        // Filter products in the newly activated tab based on the current price range
        filterProducts(priceRange.value);
    };

    // Initial call to count products when the page loads
    filterProducts(priceRange.value);
});
