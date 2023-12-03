import express from 'express';
const app = express();
import { config } from 'dotenv';
import newsRoutes from './routes/news.js';

// middlewares
config();
app.use(express.json());

app.listen(8000, () => {
  console.log(`server listenning on port 8000`);
});

app.use('/', express.static('public'));

app.use('/api/news', newsRoutes);
