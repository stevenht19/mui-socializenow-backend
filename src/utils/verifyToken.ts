import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import { UnauthorizedException } from '../exceptions'
import { User } from '../models'
import dotenv from 'dotenv'

dotenv.config()

interface JwtResponse extends JwtPayload {
  id: string
}

export async function verifyToken(req: Request, _res: Response, next: NextFunction) {
  try {

    if (req?.user_id || req?.body?.user_id) {
      throw new UnauthorizedException()
    }

    const authorization = req.headers.authorization

    if (!authorization?.startsWith('Bearer') || !authorization) {
      throw new UnauthorizedException()
    }

    const token = authorization.substring(7)
    const payload = verify(token, process.env.JWT_SECRET) as JwtResponse
    
    if (!payload) {
      throw new UnauthorizedException()
    }

    const user = await User.findOne({ _id: payload.id })

    if (!user) {
      throw new UnauthorizedException()
    }

    req.user_id = payload.id

    return next()

  } catch (error) {
    throw new UnauthorizedException()
  }
}