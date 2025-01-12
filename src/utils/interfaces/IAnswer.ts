import { Document } from 'mongoose'
import { IAnswer } from 'cat-shared/utils/index'

export interface IAnswerDoc extends IAnswer, Document {
  _id: string
}
