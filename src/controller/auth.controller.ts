import { Request, Response } from 'express'
import { User } from '../models';
import jwt from 'jsonwebtoken'

export async function signUp(req: Request, res: Response) {
  const { username, color, password } = req.body

  const userToFind = await User.findOne({ username })

  if (userToFind) {
    return res.status(400).send('User already exists')
  }

  const user = await User.create({
    username,
    color,
    password
  })

  const token = jwt.sign({ id: user._id }, 'secret123', {
    expiresIn: 2000
  })

  return res.json({ token })
}

export async function login(_req: Request, _res: Response) {
  console.log('login')
}

export async function getAccount(req: Request, res: Response) {
  const user = await User.findOne({ _id: req.user_id })
  return res.json(user)
}