'use strict';

(() => {
  window.addEventListener('load', () => {
    //variables
    const hamMenu = document.querySelector('.hamburger');

    // toggles the sidebar in small device
    hamMenu.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';
      } else {
        sidebar.style.display = 'none';
      }
    });

    // calls to get the news for home page
    async function getNews() {
      try {
        const response = await fetch(`http://localhost:8000/api/news`);
        const res = await response.json();
        const data = res.results;
        console.log(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    getNews();
  });
})();
