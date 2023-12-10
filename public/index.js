'use strict';

(() => {
  window.addEventListener('load', () => {
    //variables
    let hamMenu = document.querySelector('.hamburger');
    let profileName = document.querySelector('.profile-name');
    let profileBg = document.querySelector('.profile-bg');
    let heading = document.querySelector('.heading');

    // toggles the sidebar in small device
    hamMenu.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';
      } else {
        sidebar.style.display = 'none';
      }
    });

    function getUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);

      if (user && user !== null) {
        const login = document.querySelector('.login');
        login.style.display = 'none';
        const initial = user.name.split(' ');
        profileName.textContent = user.name;
        profileBg.textContent = initial[0][0] + initial[1][0];
      } else {
        const logout = document.querySelector('.logout');
        logout.style.display = 'none';
        profileName.textContent = 'Guest';
        profileBg.textContent = 'G';
      }
    }

    // calls to get the news for home page
    async function getNews() {
      try {
        const response = await fetch(`http://localhost:8000/api/news`);
        const res = await response.json();
        const data = res.results;
        console.log(data);
        updateCarousel(data);
        heading.textContent = 'Latest';
        updateLatestNews(data);
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
        caption.innerHTML = ` <h5 class="fw-bold">${item.title}</h5>
        <p class="my-2">
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
        console.log(item, item.multimedia);
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'px-0', 'my-3', 'my-md-0');

        // Appds the image to the card
        cardElement.innerHTML = `
        <img
        src="${item.multimedia[1].url}"
        class="card-img-top card-img"
        alt="..."
        />`;
        // Adds the save icon to the card
        const saveIcon = document.createElement('div');
        saveIcon.innerHTML = ' <i class="bi bi-bookmark mx-2 icon"></i>';
        saveIcon.classList.add('card-icon');

        // creates a new div for the card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `
        <h5 class="card-title fw-bold">${item.title}</h5>
        <p class="card-text mt-2">${item.abstract}</p>`;

        cardElement.appendChild(saveIcon);
        cardElement.appendChild(cardBody);
        newsElement.appendChild(cardElement);
      });
      // Save Functionality
      let iconContainer = document.querySelectorAll('.card-icon');
      const handleSave = async (event) => {
        // Get data from the card element
        const cardElement = event.currentTarget.parentElement;
        const title = cardElement.querySelector('.card-title').textContent;
        const description = cardElement.querySelector('.card-text').textContent;
        const imgUrl = cardElement.querySelector('.card-img-top').src;
        let icon = event.currentTarget.querySelector('.icon');

        try {
          const res = await fetch('/api/news/save', {
            method: 'POST',
            body: JSON.stringify({
              title,
              description,
              imgUrl,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          console.log(data);
          if (data.message) {
            if (icon) {
              icon.classList.replace('bi-bookmark', 'bi-bookmark-check-fill');
            } else {
              console.error('Icon element not found');
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      iconContainer.forEach((iconSave) => {
        iconSave.addEventListener('click', handleSave);
      });
    }
    getNews();

    // Handle Logout
    //variables
    let logout = document.querySelector('.logout');

    const handleLogout = async () => {
      console.log('Logout button clicked');
      localStorage.removeItem('user');
      try {
        const res = await fetch('/api/auth/logout');
        console.log(res);
        location.assign('/');
      } catch (error) {
        console.log(error);
      }
    };

    logout.addEventListener('click', handleLogout);
    getUser();
  });
})();
