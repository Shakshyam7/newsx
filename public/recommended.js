'useStrict';

(() => {
  window.addEventListener('load', () => {
    let news = document.getElementById('news');
    let btn = document.querySelector('.btn-custom');

    async function getNews() {
      try {
        const response = await fetch(`http://localhost:8000/api/news`, {
          method: 'GET',
          body: JSON.stringify({
            topic: news.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res = await response.json();
        const data = res.results;
        console.log(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    btn.addEventListener('click', getNews);
  });
})();
