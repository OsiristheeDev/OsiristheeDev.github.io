const html = document.documentElement;

// Load saved theme preference on page load
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
}

// Function to toggle dark mode
function toggleDarkMode() {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
