import { Router } from 'express';
import { getSingleUser } from '../controller/users.controller';
//import { verifyToken } from '../utils/verifyToken';

const router = Router()

router.get('/:id', getSingleUser)

export { router as usersRoute }