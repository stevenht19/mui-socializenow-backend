import { Router } from 'express';
import { create, findAll } from '../controller/posts.controller';

const router = Router()

router.get('/', findAll)
router.post('/create', create)

export { router as postRoute }