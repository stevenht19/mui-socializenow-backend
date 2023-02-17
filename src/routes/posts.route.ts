import { Router } from 'express';
import { verifyToken } from '../utils/verifyToken';
import { validatePost } from '../validators/post';
import * as c from '../controller/posts.controller';

const router = Router()

router.get('/', c.findAll)
router.get('/:id', c.findAllByUserId)
router.get('/comments/:id', c.getCommentsByPostId)
router.post('/create', validatePost, verifyToken, c.create)
router.post('/comments/:id', validatePost, verifyToken, c.createComment)
router.put('/like/:id', verifyToken, c.likePost)
router.put('/comments/like/:id', verifyToken, c.likeComment)

export { router as postRoute }