    document.addEventListener("DOMContentLoaded", function() {
        const priceRange = document.getElementById('priceRange');
        const priceValue = document.getElementById('priceValue');
        const productGrid = document.getElementById('product-grid');
        const productCount = document.getElementById('product-count');

        // Update the displayed price value when the range input changes
        priceRange.addEventListener('input', function() {
            priceValue.textContent = `$${this.value}`;
            filterProducts(this.value); // Call filter function on input change
        });

        // Function to filter products based on the selected price range
        function filterProducts(maxPrice) {
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
            productCount.textContent = `${visibleCount} Products found`;
        }

        // Initial call to count products when the page loads
        filterProducts(priceRange.value);
    });