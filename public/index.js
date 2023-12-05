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
        updateCarousel(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    getNews();

    function updateCarousel(news) {
      const carousel = document.querySelector('.carousel-inner');

      carousel.innerHTML = '';

      news.splice(0, 3).forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        if (index === 0) {
          carouselItem.classList.add('active');
        }
        
        carouselItem.innerHTML = `
        <img
              src="${item.multimedia[0].url}"
              class="d-block w-100"
              alt="..."
            />`;
        carousel.appendChild(carouselItem);
      });
    }
  });
})();
