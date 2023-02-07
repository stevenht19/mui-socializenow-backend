import { modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './User.model';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Post extends TimeStamps {
  @prop({ required: true })
  text: string

  @prop({ required: false })
  feeling: string

  @prop({ ref: () => User })
  author: Ref<User>

  @prop({ required: false })
  image: Image

  @prop()
  likes: Like
}

type Like = {
  [key: string]: string
}

type Image = {
  public_id: string
  secure_url: string
}