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

    async function getNews() {
      try {
        const response = await fetch(`http://localhost:8000/api/news`);
        console.log(response);
        const data = await response.json();
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    getNews();
  });
})();
