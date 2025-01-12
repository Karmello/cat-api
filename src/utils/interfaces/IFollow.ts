import { Document } from 'mongoose'
import { IFollow } from 'cat-shared/utils/index'

export interface IFollowDoc extends IFollow, Document {
  _id: string
}
