import { Request, Response, NextFunction } from 'express'
import { Exception } from './Exception'

export function handler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof Exception) {
    return res.status(err.status).json({ error: err.message, type: 'error' })
  }
  res.status(500).json({ error: err.message || 'Internal Server Error', type: 'error' }) 
}
