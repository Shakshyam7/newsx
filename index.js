import express from 'express';
const app = express();
import { config } from 'dotenv';
import newsRoutes from './routes/news.js';
import authRoutes from './routes/users.js';
import cors from 'cors';

// middlewares
config();
app.use(express.json());
app.use(cors());

app.listen(8000, () => {
  console.log(`server listenning on port 8000`);
});

app.use('/', express.static('public'));

app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
