`useStrict`;

(() => {
  window.addEventListener('load', (e) => {
    //variables
    let logout = document.querySelector('.logout');

    const handleLogout = async () => {
      const res = await fetch('/api/auth/logout');
      const mesg = await res.json();
      localStorage.removeItem('user');
      console.log(mesg);
    };
    logout.addEventListener('click', handleLogout());
  });
})();
