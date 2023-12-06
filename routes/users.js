import { Router } from 'express';
import { login, signUp } from '../controllers/user.js';

const router = Router();

router.get('/', login);
router.post('/signup', signUp);

export default router;
