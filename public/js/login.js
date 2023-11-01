// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the login form and its input fields
    const loginForm = document.querySelector('#login-form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
  
    // Add an event listener to the login form
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Get the values entered by the user
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (email && password) {
        // Send a POST request to the server to log in
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          // Redirect to a dashboard page or perform some action upon successful login
          document.location.replace('/dashboard');
        } else {
          alert('Login failed. Please check your email and password.');
        }
      }
    });
  });
  