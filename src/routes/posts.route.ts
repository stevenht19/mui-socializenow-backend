import { Router } from 'express';
import { create } from '../controller/posts.controller';

const router = Router()

router.post('/create', create)

export { router as postRoute }