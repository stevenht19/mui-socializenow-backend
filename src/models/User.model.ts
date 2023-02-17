import { prop } from '@typegoose/typegoose';
import { hashPassword } from '../utils/bcrypt';

export class User {
  @prop({ required: true })
  username: string

  @prop({ required: true })
  color: string

  @prop({ required: true, select: false })
  password: string

  @prop()
  firstname: string

  @prop()
  lastname: string

  @prop()
  picture?: string

  static hashPassword(password: string) {
    return hashPassword(password)
  }
}