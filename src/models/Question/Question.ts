import mongoose from 'mongoose'

import { QUESTION_INPUT_MAX_LENGTH, QuestionType } from 'cat-shared/utils/index'
import { ModelName, IQuestionDoc } from 'utils/index'

import {
  checkMaxLength,
  checkOptions,
  checkQuestionCategories,
} from 'validation/index'

const { model, Schema } = mongoose

const questionSchema = new Schema(
  {
    creatorId: {
      ref: ModelName.User,
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      required: true,
      enum: QuestionType,
    },
    categories: [
      {
        ref: ModelName.QuestionCategory,
        type: String,
        required: true,
      },
    ],
    text: {
      type: String,
      required: true,
      validate: [checkMaxLength(QUESTION_INPUT_MAX_LENGTH)],
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
)

questionSchema.index({ options: 'text', text: 'text' })

questionSchema
  .path('categories')
  .validate(
    checkQuestionCategories.validator,
    checkQuestionCategories.message,
    checkQuestionCategories.type
  )

questionSchema
  .path('options')
  .validate(checkOptions.validator, checkOptions.message, checkOptions.type)

export default model<IQuestionDoc>(ModelName.Question, questionSchema)
