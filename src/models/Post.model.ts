import { prop, Ref } from '@typegoose/typegoose';
import { User } from './User.model';

export class Post {
  @prop({ required: true })
  text: string

  @prop({ required: true })
  date: Date

  @prop({ ref: () => User })
  author: Ref<User>
}