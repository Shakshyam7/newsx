'useStrict';

(() => {
  window.addEventListener('load', () => {
    //variables
    let hamMenu = document.querySelector('.hamburger');
    let profileName = document.querySelector('.profile-name');
    let profileBg = document.querySelector('.profile-bg');

    // toggles the sidebar in small device
    hamMenu.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';
      } else {
        sidebar.style.display = 'none';
      }
    });

    async function getSavedNews() {
      const message = document.querySelector('.message');
      try {
        const response = await fetch(`/api/news/saved_news`);
        const savedNews = await response.json();
        console.log(savedNews);
        if (savedNews.empty) {
          message.textContent = savedNews.empty;
          return;
        }
        updateCardNews(savedNews);
      } catch (error) {
        console.log('Error fetching news:', error);
      }
    }

    function getUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);

      if (user && user !== null) {
        const login = document.querySelector('.login');
        login.style.display = 'none';
        const initial = user.name.split(' ');
        profileName.textContent = user.name;
        profileBg.textContent = initial[0][0] + initial[1][0];
        getSavedNews();
      } else {
        const logout = document.querySelector('.logout');
        logout.style.display = 'none';
        profileName.textContent = 'Guest';
        profileBg.textContent = 'G';
        location.assign('/login');
      }
    }
    function updateCardNews(news) {
      const newsElement = document.querySelector('.latest-news');
      newsElement.innerHTML = '';

      // loops through all the news
      news.forEach((item) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'px-0', 'my-3', 'my-md-0');

        // Adds the image to the card
        cardElement.innerHTML = `
        <img
                src="${item.imgUrl}"
                class="card-img-top card-img"
                alt="..."
              />`;

        // Adds the delete icon to the card
        const deleteBtnContainer = document.createElement('div');

        deleteBtnContainer.innerHTML = `<button type="button" class="btn btn-outline-danger" ><i class="bi bi-file-x-fill"></i></button>`;
        deleteBtnContainer.classList.add('deleteContainer');
        deleteBtnContainer.setAttribute('data-news-item-id', item.id);

        // creates a new div for the card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `
              <h5 class="card-title fw-bold">${item.title}</h5>
              <p class="card-text mt-2">${item.description}</p>`;

        cardElement.appendChild(deleteBtnContainer);
        cardElement.appendChild(cardBody);
        newsElement.appendChild(cardElement);
      });

      // Deletes the news
      let deleteBtn = document.querySelectorAll('.deleteContainer');

      const handleDelete = async (event) => {
        const newsId = event.currentTarget.getAttribute('data-news-item-Id');
        console.log(newsId);
        try {
          const response = await fetch(`/api/news/saved_news/${newsId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (data.message) {
            return window.location.reload();
          } else {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      };
      deleteBtn.forEach((newsItem) => {
        newsItem.addEventListener('click', handleDelete);
      });
    }

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
        xxxx;
        console.log(error);
      }
    };
    getUser();
    logout.addEventListener('click', handleLogout);
  });
})();
