import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { uploadImage } from '../cloudinary';
import { Comment, Post } from '../models';

export async function findAll(_req: Request, res: Response) {
  const posts = await Post.find().populate('author')
  return res.json(posts)
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
    totalComments: 0
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

export async function getCommentsByPostId(req: Request, res: Response) {
  const { id } = req.params

  const post = await Post.findById(id).populate([{
    path: 'comments',
    populate: {
      path: 'author',
      model: 'User'
    }
  }])

  const comments = post.comments
  return res.json(comments)
}

export async function createComment(req: Request, res: Response) {
  const userId = req.user_id
  const { id } = req.params
  const { text, author } = req.body

  if (userId !== author) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const post = await Post.findById(id)

  const comment = await Comment.create({
    text,
    author: userId
  })

  post.comments = post.comments.concat(comment.id)
  post.totalComments = post.totalComments + 1
  
  await post.save()
  return res.json(comment)
}

export async function likeComment(req: Request, res: Response) {
  const userId = req.user_id
  const { id } = req.params
  const commentToLike = await Comment.findById(id)
  
  if (commentToLike.likes.some((commentUserId) => userId === commentUserId)) {
    commentToLike.likes = commentToLike.likes.filter(id => id !== userId)
  } else {
    commentToLike.likes = commentToLike.likes.concat(userId)
  }

  const comment = await commentToLike.save()
  res.json(comment)
}