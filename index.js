import express from 'express';
const app = express();
import { config } from 'dotenv';
import db from './connect.js';

// middlewares
config();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server listenning on port ${port}`);
});

app.use('/', express.static('public'));

app.use('/news', (req, res) => {
  const q = `SELECT * FROM news`;
  db.execute(q, (err, result) => {
    console.log(result);
  });
});
