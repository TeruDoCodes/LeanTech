document.addEventListener("DOMContentLoaded", function () {
    const starContainers = document.querySelectorAll('.star-rating');
  
    starContainers.forEach(container => {
      const initialRating = 1; // Default rating starts at 1 star
      container.setAttribute('data-rating', initialRating);
      const stars = container.querySelectorAll('.star');
  
      stars.forEach(star => {
        const starValue = star.getAttribute('data-value');
        if (starValue <= initialRating) {
          star.classList.remove('unfilled');
        } else {
          star.classList.add('unfilled');
        }
  
        star.addEventListener('click', () => {
          container.setAttribute('data-rating', starValue);
          updateStars(container, starValue);
        });
      });
    });
  
    function updateStars(container, rating) {
      const stars = container.querySelectorAll('.star');
      stars.forEach(star => {
        const starValue = star.getAttribute('data-value');
        if (starValue <= rating) {
          star.classList.remove('unfilled');
        } else {
          star.classList.add('unfilled');
        }
      });
    }
  });
  