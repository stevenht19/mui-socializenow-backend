import { Router } from 'express';
import { findUsers, getSingleUser } from '../controller/users.controller';

const router = Router()

router.get('/', findUsers)
router.get('/:id', getSingleUser)

export { router as usersRoute }