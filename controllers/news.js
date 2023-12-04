import axios from 'axios';
import { config } from 'dotenv';

config();

export const getNews = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.API_KEY}`
    );

    res.send(data);
  } catch (error) {
    console.log(error);
  }
};
