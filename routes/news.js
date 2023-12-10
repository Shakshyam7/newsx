import { Router } from 'express';
import { getNews, setNews } from '../controllers/news.js';

const router = Router();

router.get('/', getNews);
router.post('/save', setNews);

export default router;
