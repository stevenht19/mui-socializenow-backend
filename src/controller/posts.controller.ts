import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../cloudinary';
import { Post } from '../models';

export async function findAll(_req: Request, res: Response) {
  const posts = await Post.find().populate('author')
  return res.json({ posts })
}

export async function create(req: Request, res: Response) {
  const { author, text, feeling } = req.body
  
  const post = new Post({
    author,
    text,
    feeling
  })

  if (req.files?.picture) {
    const file = req.files.picture as UploadedFile
    const { public_id, secure_url } = await uploadImage(file.tempFilePath)
    post.image = {
      public_id,
      secure_url
    }
  }
  await post.save()
  return res.json(post)
}

export async function likePost(req: Request, res: Request) {
}
