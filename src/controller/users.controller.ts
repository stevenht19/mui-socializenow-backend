import { Request, Response } from 'express';
import { BadRequestException } from '../exceptions';
import { User } from '../models';

export async function findUsers(req: Request, res: Response) {
  const { skip, limit } = req.query
  
  if (!skip || !limit) throw new BadRequestException()

  const users = await User
    .paginate({}, { offset: Number(skip), limit: Number(limit) })
  return res.json(users.docs)
}

export async function getSingleUser(req: Request, res: Response) {
  const { id } = req.params
  const user = await User.findOne({ _id: id })
  res.json(user)
}
