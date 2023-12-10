import axios from 'axios';
import { config } from 'dotenv';
import db from '../connect.js';

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
  console.log(news);
  const q = `INSERT INTO news (title, description, imgUrl, userId) VALUE(?)`;
  const values = [
    req.body.title,
    req.body.description,
    req.body.imgUrl,
    req.body.userId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json('Error saving news');
    }
    return res.status(200).json('News saved successfully');
  });
};
