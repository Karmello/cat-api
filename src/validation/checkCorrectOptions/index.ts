import { IQuestion, QuestionType } from 'cat-shared/utils'

export default (question: IQuestion): boolean => {
  const { type, options, correctOptions } = question

  if (!correctOptions?.length) {
    return false
  }

  if (new Set(correctOptions).size !== correctOptions.length) {
    return false
  }

  if (type === QuestionType.SingleChoice && correctOptions.length > 1) {
    return false
  }

  if (type === QuestionType.MultiChoice && correctOptions.length > options.length) {
    return false
  }

  return true
}
