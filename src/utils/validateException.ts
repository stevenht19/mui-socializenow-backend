import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' })
  }
}