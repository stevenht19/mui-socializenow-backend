import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../cloudinary';
import { Post } from '../models';

export async function findAll(_req: Request, res: Response) {
  const posts = await Post.find().populate('author')
  return res.json({ posts })
}

export async function findAllByUserId(req: Request, res: Response) {
  const { id } = req.params
  const posts = await Post.find({ author: id }).populate('author')

  return res.json(posts)
}

export async function create(req: Request, res: Response) {
  const { author, text, feeling } = req.body
  
  const post = new Post({
    author,
    text,
    feeling,
  })

  if (req.files?.image) {
    const file = req.files.image as UploadedFile
    const { public_id, secure_url } = await uploadImage(file.tempFilePath)
    post.image = {
      public_id,
      secure_url
    }
  }
  await post.save()
  return res.json(post)
}

export async function likePost(req: Request, res: Response) {
  const userId = req.user_id
  const { id } = req.params
  const postToLike = await Post.findById(id)

  if (postToLike.likes.some((id) => userId === id)) {
    postToLike.likes = postToLike.likes.filter(id => id !== userId)
  } else {
    postToLike.likes = postToLike.likes.concat(userId)
  }

  const post = await postToLike.save()

  return res.json(post)
}
