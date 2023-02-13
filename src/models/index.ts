import { getModelForClass } from '@typegoose/typegoose'
import { User } from './User.model';
import { Post } from './Post.model';
import { Comment } from './Comment.model';

const UserModel = getModelForClass(User)
const PostModel = getModelForClass(Post)
const CommentModel = getModelForClass(Comment)

export { UserModel as User }
export { PostModel as Post }
export { CommentModel as Comment }