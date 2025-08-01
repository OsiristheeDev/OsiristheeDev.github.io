document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dot");
  let currentIndex = 0;

  function showSlide(index) {
    const offset = -index * 100;
    document.querySelector(".carousel").style.transform = `translateX(${offset}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("opacity-80", i === index);
      dot.classList.toggle("opacity-50", i !== index);
    });
    currentIndex = index;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });

  showSlide(0);
});