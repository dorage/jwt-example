import { Router } from 'express';
import { postRegister, getLogin, getCheck } from '../controller/authController';
import { verifyToken } from '../middlewares';

const router = new Router();

router.get('/', (req, res) => res.send('hello, boilerplate'));

router.get('/login', getLogin);
router.post('/register', postRegister);
router.get('/check', verifyToken, getCheck);

export default router;
