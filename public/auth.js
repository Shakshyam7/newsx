'use strict';
(() => {
  window.addEventListener('load', () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let form = document.querySelector('.form');
    let error = document.querySelector('.error');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
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
          location.assign('/recommended.html');
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
})();
