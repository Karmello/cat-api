import mongoose from 'mongoose'

import {
  QUESTION_EXPLANATION_MAX_LENGTH,
  QUESTION_EXPLANATION_MIN_LENGTH,
  QUESTION_INPUT_MAX_LENGTH,
  QuestionType,
} from 'cat-shared/utils/index'
import { ModelName, IQuestionDoc } from 'utils/index'
import { checkMinLength, checkMaxLength, checkOptions } from 'validation/index'

const { model, Schema } = mongoose

export const questionSchema = new Schema(
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
    category: {
      ref: ModelName.QuestionCategory,
      type: Schema.Types.ObjectId,
      required: true,
    },
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
    correctOptions: [
      {
        type: Number,
        required: true,
      },
    ],
    explanation: {
      type: String,
      required: true,
      validate: [
        checkMinLength(QUESTION_EXPLANATION_MIN_LENGTH),
        checkMaxLength(QUESTION_EXPLANATION_MAX_LENGTH),
      ],
    },
  },
  {
    versionKey: false,
  }
)

questionSchema.index({ options: 'text', text: 'text' })

questionSchema
  .path('options')
  .validate(checkOptions.validator, checkOptions.message, checkOptions.type)

export default model<IQuestionDoc>(ModelName.Question, questionSchema)
