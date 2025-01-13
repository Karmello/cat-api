import { faker } from '@faker-js/faker'
import times from 'lodash/times'

import {
  MIN_NUM_OF_QUESTION_OPTIONS,
  MAX_NUM_OF_QUESTION_OPTIONS,
  QUESTION_INPUT_MAX_LENGTH,
  ANSWER_INPUT_MAX_LENGTH,
  IUser,
  IQuestion,
  QuestionType,
} from 'cat-shared/utils'

import { getRandNum, getRandNums } from 'cat-shared/helpers'
import { msInDay } from '../constants'
import questionCategories from './questionCategoryMocks'

const QUESTION_TYPES = [QuestionType.SingleChoice, QuestionType.MultiChoice]

const getQuestionMocks = (users: IUser[]) => {
  const questionMocks = [] as IQuestion[]

  times(2000, () => {
    const user = users[getRandNum(0, users.length - 1)]

    const type = QUESTION_TYPES[getRandNum(0, QUESTION_TYPES.length - 1)]

    const categoryIndex = getRandNum(0, questionCategories.length - 1)

    const numOfAnswers = getRandNum(
      MIN_NUM_OF_QUESTION_OPTIONS,
      MAX_NUM_OF_QUESTION_OPTIONS
    )

    const question = {
      creatorId: user._id,
      createdAt: new Date(
        faker.date.between({
          from: new Date(Date.now() - 1000 * msInDay),
          to: new Date(Date.now() - 10 * msInDay),
        })
      ).getTime(),
      type,
      category: questionCategories[categoryIndex]._id.toString(),
      text: faker.lorem
        .sentence(30)
        .substring(0, getRandNum(15, QUESTION_INPUT_MAX_LENGTH / 3)),
      options: (() => {
        const arr = []
        times(numOfAnswers, (i: number) => {
          const option = faker.lorem.sentence(30).substring(0, ANSWER_INPUT_MAX_LENGTH)
          arr.push(option)
        })
        return arr
      })(),
    } as IQuestion

    questionMocks.push(question as IQuestion)
  })

  return questionMocks
}

export default getQuestionMocks
