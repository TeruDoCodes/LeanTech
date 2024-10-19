document.addEventListener("DOMContentLoaded", function() {
    const sortSelect = document.getElementById('sort-select');
    const productGrid = document.querySelector('.product-grid');

    // Function to sort products based on price
    function sortProducts(order) {
        const products = Array.from(productGrid.querySelectorAll('.product-card'));

        // Filter out products that are "OUT OF STOCK"
        const inStockProducts = products.filter(product => {
            const outOfStockLabel = product.querySelector('.product-label');
            return !outOfStockLabel || outOfStockLabel.textContent !== "OUT OF STOCK";
        });

        // Sort products based on price
        inStockProducts.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.discounted').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.discounted').textContent.replace('$', ''));

            if (isNaN(priceA) || isNaN(priceB)) {
                console.error('Invalid price found in product cards.');
                return 0; // Prevent sorting errors
            }

            return order === 'low-to-high' ? priceA - priceB : priceB - priceA;
        });

        // Clear the grid and append sorted products
        productGrid.innerHTML = '';
        inStockProducts.forEach(product => productGrid.appendChild(product));

        // Re-append "OUT OF STOCK" products at the end
        products.filter(product => {
            const outOfStockLabel = product.querySelector('.product-label');
            return outOfStockLabel && outOfStockLabel.textContent === "OUT OF STOCK";
        }).forEach(product => productGrid.appendChild(product));
    }

    // Event listener for when the dropdown changes
    sortSelect.addEventListener('change', function() {
        const selectedOption = this.value;

        if (selectedOption === 'Price: Low to High') {
            sortProducts('low-to-high');
        } else if (selectedOption === 'Price: High to Low') {
            sortProducts('high-to-low');
        } else {
            // Default behavior: just refresh the grid with the current order
            const products = Array.from(productGrid.querySelectorAll('.product-card'));
            productGrid.innerHTML = '';
            products.forEach(product => productGrid.appendChild(product));
        }
    });
});