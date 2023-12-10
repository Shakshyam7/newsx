import axios from 'axios';
import { config } from 'dotenv';

config();

export const getNews = async (req, res) => {
  let topic = req.query.topic || 'home';
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${process.env.API_KEY}`
    );

    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const saveNews = async (req, res) => {
  const news = req.body;
  console.log(req.body);
};
