import { modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Comment } from './Comment.model';
import { User } from './User.model';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Post extends TimeStamps {
  @prop({ required: true })
  text: string

  @prop({ ref: () => User })
  author: Ref<User>

  @prop()
  feeling: string

  @prop()
  image?: Image

  @prop()
  likes: string[]

  @prop()
  totalComments: number

  @prop({ ref: () => Comment })
  comments: Ref<Comment>[]
}


type Image = {
  public_id: string
  secure_url: string
}