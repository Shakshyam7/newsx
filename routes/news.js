import { Router } from 'express';
import {
  saveNews,
  getSavedNews,
  getNewsFromApi,
  deleteSavedNews,
} from '../controllers/news.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getNewsFromApi);
router.post('/save', verifyToken, saveNews);
router.get('/saved_news', verifyToken, getSavedNews);
router.delete('/saved_news/:id', verifyToken, deleteSavedNews);

export default router;
