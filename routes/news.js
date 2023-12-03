import { Router } from 'express';
import { getNews } from '../controllers/news.js';

const router = Router();

router.get('/', getNews);

export default router;
