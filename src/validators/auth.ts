import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { validate } from '../utils/validateException'

export const validateAuth = [
  check('username')
    .exists()
    .isString()
    .notEmpty(),
  check('password')
    .exists()
    .isLength({ min: 3 })
    .notEmpty(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
]