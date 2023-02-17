import { modelOptions, plugin, prop, Ref, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Comment } from './Comment.model';
import { User } from './User.model';
import { PaginateMethod } from './types';
import paginator from 'mongoose-paginate-v2'

@plugin(paginator)
@modelOptions({
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Post extends TimeStamps {
  @prop({ required: true })
  text: string;

  @prop({ ref: () => User })
  author: Ref<User>;

  @prop()
  feeling: string;

  @prop()
  image?: Image;

  @prop()
  likes: string[];

  @prop()
  totalComments: number;

  @prop({ ref: () => Comment })
  comments: Ref<Comment>[];

  static paginate: PaginateMethod<Post>;
}


type Image = {
  public_id: string
  secure_url: string
}