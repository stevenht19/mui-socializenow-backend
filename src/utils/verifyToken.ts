import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'
import { User } from '../models'

interface JwtResponse extends JwtPayload {
  _id: string
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user_id || req.body.user_id) res.status(400).send('Unathorized')
    
    const authorization = req.headers.authorization

    if (!authorization?.startsWith('Bearer') || !authorization) {
      return res.status(400).send('Unathorized')
    }

    const token = authorization.substring(7)
    const payload = verify(token, 'secret123') as JwtResponse

    if (!payload) return res.status(400).send('Unathorized')

    const user = await User.findOne({ _id: payload._id })

    if (!user) return res.status(400).send('Unathorized')
    req.user_id = payload._id

    return next()

  } catch (error) {
    return res.status(400).send('Unathorized')
  }
}