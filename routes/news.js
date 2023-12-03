import { Router } from 'express';
import { getNews }

const router = Router();

router.get('/news', getNews);
