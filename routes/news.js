import { Router } from 'express';
import { getNews, saveNews } from '../controllers/news.js';

const router = Router();

router.get('/', getNews);
router.post('/save', saveNews);

export default router;
