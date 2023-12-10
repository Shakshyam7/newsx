'useStrict';

(() => {
  window.addEventListener('load', () => {
    let news = document.getElementById('news');
    let btn = document.querySelector('.btn-custom');
    let heading = document.querySelector('.heading');
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
    getUser();

    async function getSavedNews() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/news/saved_news`
        );
        const data = await response.json();
        console.log(data);
        updateCardNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
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
        const deleteIcon = document.createElement('div');
        deleteIcon.innerHTML = `<button type="button" class="btn btn-outline-danger"><i class="bi bi-file-x-fill"></i></button>`;
        deleteIcon.classList.add('deleteContainer');

        // creates a new div for the card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = `
              <h5 class="card-title fw-bold">${item.title}</h5>
              <p class="card-text mt-2">${item.description}</p>`;

        cardElement.appendChild(deleteIcon);
        cardElement.appendChild(cardBody);
        newsElement.appendChild(cardElement);
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
        console.log(error);
      }
    };
    getSavedNews();
    logout.addEventListener('click', handleLogout);
  });
})();
