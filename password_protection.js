// Password protection for Brooklyn Bike Stress Map
const CORRECT_PASSWORD = "brooklyn2025"; // Change this to your desired password
const TARGET_URL = "Articles/test_bike_map.html";

function showPasswordForm() {
  const passwordForm = document.getElementById('password-form');
  const overlay = document.getElementById('brooklyn-overlay');
  const img = document.getElementById('brooklyn-img');
  const errorMessage = document.getElementById('error-message');

  // Hide the hover overlay and image
  overlay.style.display = 'none';
  img.style.opacity = '0.3';

  // Show the password form with animation
  passwordForm.style.display = 'flex';

  // Focus on the password input
  setTimeout(() => {
    document.getElementById('brooklyn-password').focus();
  }, 100);

  // Hide any previous error message
  errorMessage.classList.add('hidden');
}

function hidePasswordForm(event) {
  if (event) {
    event.stopPropagation();
  }

  const passwordForm = document.getElementById('password-form');
  const overlay = document.getElementById('brooklyn-overlay');
  const img = document.getElementById('brooklyn-img');
  const passwordInput = document.getElementById('brooklyn-password');
  const errorMessage = document.getElementById('error-message');

  // Hide the password form
  passwordForm.style.display = 'none';

  // Show the overlay and image again
  overlay.style.display = 'flex';
  img.style.opacity = '1';

  // Clear the password input
  passwordInput.value = '';

  // Hide error message
  errorMessage.classList.add('hidden');
}

function checkPassword() {
  const passwordInput = document.getElementById('brooklyn-password');
  const errorMessage = document.getElementById('error-message');
  const enteredPassword = passwordInput.value;

  if (enteredPassword === CORRECT_PASSWORD) {
    // Correct password - navigate to the page
    window.open(TARGET_URL, '_blank');

    // Reset the form after a short delay
    setTimeout(() => {
      hidePasswordForm();
    }, 500);
  } else {
    // Incorrect password - show error
    errorMessage.classList.remove('hidden');

    // Shake animation
    passwordInput.classList.add('animate-shake');
    passwordInput.value = '';

    setTimeout(() => {
      passwordInput.classList.remove('animate-shake');
    }, 500);
  }
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }

  .animate-shake {
    animation: shake 0.3s ease-in-out;
  }
`;
document.head.appendChild(style);
