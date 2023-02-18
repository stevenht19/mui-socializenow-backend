import { modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './User.model';

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Comment extends TimeStamps {
  @prop({ ref: () => User })
  author: Ref<User>

  @prop({ required: true })
  text: string

  @prop()
  likes: string[]
}