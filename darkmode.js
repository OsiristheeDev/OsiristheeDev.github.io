const toggleButton = document.getElementById('dark');
  const html = document.documentElement;

  // Optional: persist user choice
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
  }

  toggleButton.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });