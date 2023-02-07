import { Router } from 'express';
import { getAccount, signUp, login } from '../controller/auth.controller'
import { verifyToken } from '../utils/verifyToken';

const router = Router()

router.get('/', verifyToken, getAccount)
router.post('/signup', signUp)
router.post('/login', login)

export { router as authRoute }