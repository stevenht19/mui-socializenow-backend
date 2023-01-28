import { prop } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  username: string

  @prop({ required: true })
  color: string

  @prop({ required: true, select: false })
  password: string
}