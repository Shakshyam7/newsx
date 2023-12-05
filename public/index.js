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

    // Adds the image carousel
    function updateCarousel(news) {
      const carousel = document.querySelector('.carousel-inner');

      carousel.innerHTML = '';

      // Loops through the first 3 items
      news.splice(0, 3).forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        // adds the active class to the carousel item
        if (index === 0) {
          carouselItem.classList.add('active');
        }

        carouselItem.innerHTML = `
        <img
              src="${item.multimedia[0].url}"
              class="d-block w-100"
              alt="..."
            />`;

        // creates a new div for the caption
        const caption = document.createElement('div');
        caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
        caption.innerHTML = ` <h5>${item.title}</h5>
        <p>
        ${item.abstract}
        </p>`;

        carouselItem.appendChild(caption);
        carousel.appendChild(carouselItem);
      });
    }

    // Function to create a cards for latest news

    function updateLatestNews(news) {
      const newsElement = document.querySelector('.latest-news');
      newsElement.innerHTML = '';

      // loops through all the news from third element
      news.splice(3).forEach((item) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'px-0');
      });
    }

    getNews();
  });
})();
