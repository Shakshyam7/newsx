'use strict';
(() => {
  window.addEventListener('load', () => {
    let lname = document.getElementById('fname');
    let fname = document.getElementById('lname');
    let phone = document.getElementById('number');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let form = document.querySelector('.form');
    let error = document.querySelector('.error');

    form.addEventListener('submit', async (event) => {
      let name = fname.value + ' ' + lname.value;
      event.preventDefault();
      error.textContent = '';
      console.log(email.value, password.value);
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify({
            name,
            phone: phone.value,
            email: email.value,
            password: password.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
        if (data.user) {
          alert(data.user);
          location.assign('/login');
        } else {
          error.textContent = data.error;
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
})();
