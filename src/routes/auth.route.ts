import { Router } from 'express';
import { getAccount, signUp } from '../controller/auth.controller'
import { verifyToken } from '../utils/verifyToken';

const router = Router()

router.get('/', verifyToken, getAccount)
router.post('/signup', signUp)

export { router as authRoute }