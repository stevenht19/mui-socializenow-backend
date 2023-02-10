import { Router } from 'express';
import { verifyToken } from '../utils/verifyToken';
import { 
  create, 
  findAll, 
  findAllByUserId, 
  likePost 
} from '../controller/posts.controller';

const router = Router()

router.get('/', findAll)
router.get('/:id', findAllByUserId)
router.post('/create', create)
router.put('/like/:id', verifyToken, likePost)

export { router as postRoute }