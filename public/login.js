'use strict';
(() => {
  window.addEventListener('load', () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let form = document.querySelector('.form');
    let error = document.querySelector('.error');

    //variables
    let hamMenu = document.querySelector('.hamburger');

    // toggles the sidebar in small device
    hamMenu.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';
      } else {
        sidebar.style.display = 'none';
      }
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      error.textContent = '';
      console.log(email.value, password.value);
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data.userData) {
          console.log(data.userData);
          localStorage.setItem('user', JSON.stringify(data.userData));
          location.assign('/');
        } else {
          error.textContent = data;
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
})();
