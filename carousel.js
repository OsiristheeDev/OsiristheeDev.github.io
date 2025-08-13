document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dot");
  let currentIndex = 0;

  function showSlide(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle("opacity-80", i === index);
      dot.classList.toggle("opacity-50", i !== index);
    });
    currentIndex = index;
  }

  // Simple touch handling
  let startX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // If swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showSlide(currentIndex + 1); // Swipe left - next slide
      } else {
        showSlide(currentIndex - 1); // Swipe right - previous slide
      }
    }
  });

  // Existing dot functionality
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  showSlide(0);
});