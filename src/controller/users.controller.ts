import { Request, Response } from 'express';
import { User } from '../models';

export async function findUsers(req: Request, res: Response) {
  const { skip, limit } = req.query
  
  const users = await User
    .find()
    .skip(Number(skip))
    .limit(Number(limit))
  return res.json(users)
}

export async function getSingleUser(req: Request, res: Response) {
  const { id } = req.params
  const user = await User.findOne({ _id: id })
  res.json(user)
}
