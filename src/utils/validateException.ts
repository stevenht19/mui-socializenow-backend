import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { BadRequestException } from '../exceptions'

export const validate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    throw new BadRequestException()
  }
}