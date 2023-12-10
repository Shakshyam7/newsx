import { Router } from 'express';
import { getNews, saveNews, getSavedNews } from '../controllers/news.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getNews);
router.post('/save', saveNews);
router.get('/saved_news', getSavedNews);

export default router;
