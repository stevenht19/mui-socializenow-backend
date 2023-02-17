import { Router } from 'express';
import { getAccount, signUp, login } from '../controller/auth.controller'
import { verifyToken } from '../utils/verifyToken';
import { validateAuth } from '../validators/auth';

const router = Router()

router.get('/', verifyToken, getAccount)
router.post('/signup', validateAuth, signUp)
router.post('/login', validateAuth, login)

export { router as authRoute }