// Get references to the button and the menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Add a click event listener to the button
  menuBtn.addEventListener('click', () => {
    // Toggle the 'hidden' class on the menu to show/hide it
    mobileMenu.classList.toggle('hidden');
  });