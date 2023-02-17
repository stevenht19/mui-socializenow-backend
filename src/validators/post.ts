import { Request, Response, NextFunction } from 'express';
import { validate } from '../utils/validateException';
import { check } from 'express-validator';

export const validatePost = [
  check('text')
    .isLength({ min: 2 })
    .notEmpty(),
  check('author')
    .isMongoId()
    .notEmpty(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
]