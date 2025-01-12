import { Document } from 'mongoose'
import { IQuestionCategory } from 'cat-shared/utils/index'

export interface IQuestionCategoryDoc extends IQuestionCategory, Document {
  _id: string
}
