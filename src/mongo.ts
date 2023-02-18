import mongoose from 'mongoose';

export const initialize = async () => {
  mongoose.set('strictQuery', false)
  mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.zsrpvu5.mongodb.net/${process.env.MONGODB_DB_NAME}`)
}