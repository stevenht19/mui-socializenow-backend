import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import * as mongo from './mongo'
import { postRoute } from './routes/posts.route'
import { authRoute } from './routes/auth.route'
import { usersRoute } from './routes/users.route'
import { handler } from './exceptions/handler'

dotenv.config()
const app = express()

mongo.initialize()
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}))
app.use(express.json())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))
app.use('/posts', postRoute)
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use(handler)

app.listen(process.env.PORT || 4000)
