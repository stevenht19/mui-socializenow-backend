import { Request, Response } from 'express';
import { Post } from '../models';

export async function create(req: Request, res: Response) {
  const { author, text, date, picture } = req.body

  const post = await Post.create({
    author,
    text,
    date,
    picture
  })

  return res.json(post)
}
