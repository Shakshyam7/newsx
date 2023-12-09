import { Router } from 'express';
import { login, logout, signUp } from '../controllers/user.js';

const router = Router();

router.post('/login', login);
router.post('/signup', signUp);
router.get('/logout', logout);

export default router;
