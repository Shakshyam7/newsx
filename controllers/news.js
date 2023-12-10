import axios from 'axios';
import { config } from 'dotenv';
import db from '../connect.js';

config();

export const getNewsFromApi = async (req, res) => {
  let topic = req.query.topic || 'home';
  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=${process.env.API_KEY}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const saveNews = async (req, res) => {
  const userId = req.userId;
  const news = req.body;
  console.log(news);
  const q = `INSERT INTO news (title, description, imgUrl, userId) VALUE(?)`;
  const values = [
    req.body.title,
    req.body.description,
    req.body.imgUrl,
    userId,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error saving news' });
    }
    return res.status(200).json({ message: 'News saved successfully' });
  });
};

export const getSavedNews = (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const q = `SELECT * FROM news WHERE userId = ? ORDER BY id DESC`;
  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error('Error fetching saved news:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data.length == 0) {
      return res.status(200).json({ empty: 'You dont have any saved news' });
    }

    return res.status(200).json(data);
  });
};

export const deleteSavedNews = async (req, res) => {
  const userId = req.userId;
  const newsId = req.params.id;
  console.log(userId, newsId);

  const q = `DELETE FROM news WHERE id = ? AND userId = ?`;

  db.query(q, [newsId, userId], (err, data) => {
    if (err) {
      console.error('Error removing saved news:', err);
      return res.status(500).json('Internal Server Error');
    }
    console.log(data);
    if (data.affectedRows === 0) {
      return res.status(200).json({ message: 'No news found' });
    }

    return res.status(200).json({ message: 'News removed successfully' });
  });
};
