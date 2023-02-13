import { Request, Response } from 'express'
import { User } from '../models';
import jwt from 'jsonwebtoken'
import { comparePassword } from '../utils/bcrypt';
import { colors } from '../utils/colors';

export async function signUp(req: Request, res: Response) {
  const { username, password } = req.body

  const userToFind = await User.findOne({ username })

  if (userToFind) {
    return res.status(400).send({ type: 'error', error: 'User already exists' })
  }

  const randomColor = colors[parseInt(`${Math.random() * colors.length - 1}`)]

  const user = await User.create({
    username,
    password: User.hashPassword(password),
    color: randomColor
  })

  const token = jwt.sign({ id: user._id }, 'secret123', {
    expiresIn: 2000
  })

  return res.json({ type: 'success', token,  user: {
    _id: user.id,
    username: user.username,
    color: user.color, 
  }})
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body

  const user = await User.findOne({ username }).select('+password')

  if (!user) return res.status(403).send({ type: 'error', error: 'Unauthorized '})

  if (!comparePassword(password, user.password)) {
    return res.status(403).send({ type: 'error', error: 'Unauthorized '})
  }

  const token = jwt.sign({ id: user._id }, 'secret123', {
    expiresIn: 2000
  })

  return res.json({ type: 'sucess', token, user: {
    _id: user.id,
    username: user.username,
    color: user.color, 
  }})
}

export async function getAccount(req: Request, res: Response) {
  const user = await User.findOne({ _id: req.user_id })
  return res.json({ type: 'sucess', user })
}