import { Request, Response } from 'express';
import { User } from '../models';

export async function getSingleUser(req: Request, res: Response) {
  const { id } = req.params
  const user = await User.findOne({ _id: id })
  res.json(user)
}
