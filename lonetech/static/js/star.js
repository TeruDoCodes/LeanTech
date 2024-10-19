document.addEventListener("DOMContentLoaded", () => {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card) => {
        const stars = card.querySelectorAll('.star'); // Get stars for this specific card

        // Initialize the rating to 1 star filled
        stars[0].innerHTML = '&#9733'; // Fill the first star
        for (let j = 1; j < stars.length; j++) {
            stars[j].innerHTML = '&#9734;'; // Empty stars
        }

        stars.forEach((star, i) => {
            star.onclick = function () {
                let currentStarLevel = i + 1; // Current star level based on index (1-based)

                stars.forEach((star, j) => {
                    // If the star index is less than the current star level, fill it
                    if (j < currentStarLevel) {
                        star.innerHTML = '&#9733'; // Filled star
                    } else {
                        star.innerHTML = '&#9734'; // Empty star
                    }
                });
            };
        });
    });
});
