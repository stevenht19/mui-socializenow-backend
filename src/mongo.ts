import mongoose from 'mongoose';

export const initialize = async () => {
  mongoose.set('strictQuery', false)
  mongoose.connect('mongodb+srv://mstv_19:SJSqooNztq9VKzsF@cluster0.zsrpvu5.mongodb.net/test')
}