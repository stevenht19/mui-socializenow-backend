import { getModelForClass } from '@typegoose/typegoose'
import { User } from './User.model';
import { Post } from './Post.model';

const UserModel = getModelForClass(User)
const PostModel = getModelForClass(Post)

export { UserModel as User }
export { PostModel as Post }