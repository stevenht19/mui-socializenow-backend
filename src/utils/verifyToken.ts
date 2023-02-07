import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import { User } from '../models'

interface JwtResponse extends JwtPayload {
  id: string
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (req?.user_id || req?.body?.user_id) res.status(403).send(({
      type: 'error',
      error: 'Unauthorized'
    }))

    const authorization = req.headers.authorization

    if (!authorization?.startsWith('Bearer') || !authorization) {
      return res.status(403).send({
        type: 'error',
        error: 'Unauthorized'
      })
    }

    const token = authorization.substring(7)
    const payload = verify(token, 'secret123') as JwtResponse
    
    if (!payload) return res.status(403).send({
      type: 'error',
      error: 'Unauthorized'
    })

    const user = await User.findOne({ _id: payload.id })

    if (!user) return res.status(403).send({
      type: 'error',
      error: 'Unauthorized'
    })

    req.user_id = payload.id

    return next()

  } catch (error) {
    return res.status(401).send({
      type: 'error',
      error: 'Unauthorized'
    })
  }
}