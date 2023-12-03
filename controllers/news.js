import axios from 'axios';
import { config } from 'dotenv';

config();

export const getNews = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=${process.env.API_KEY}`
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
