`useStrict`;

(() => {
  window.addEventListener('load', (e) => {
    //variables
    let logout = document.querySelector('.logout');
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

    const handleLogout = async () => {
      const res = await fetch('/api/auth/logout');
      const mesg = await res.json();
      console.log(mesg);
    };
    logout.addEventListener('click', handleLogout());
  });
})();
