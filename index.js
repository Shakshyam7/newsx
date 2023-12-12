import express from 'express';
const app = express();
import { config } from 'dotenv';
import newsRoutes from './routes/news.js';
import authRoutes from './routes/users.js';
import cors from 'cors';
import { verifyToken } from './middlewares/authMiddleware.js';
import cookieParser from 'cookie-parser';

// middlewares
config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server listenning on port 8000`);
});

app.use('/', express.static('public'));
app.use('/search', verifyToken, express.static('public/search.html'));
app.use('/saved', verifyToken, express.static('public/saved.html'));
app.use('/login', express.static('public/login.html'));
app.use('/signup', express.static('public/signup.html'));
app.use('/api/news', newsRoutes);
app.use('/api/auth', authRoutes);
