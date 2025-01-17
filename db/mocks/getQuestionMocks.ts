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
import QUESTION_CATEGORY_MOCKS from './questionCategoryMocks'

const QUESTION_TYPES = [QuestionType.SingleChoice, QuestionType.MultiChoice]

const getQuestionMocks = (users: IUser[]) => {
  const questionMocks = [] as IQuestion[]

  times(2000, () => {
    const user = users[getRandNum(0, users.length - 1)]

    const type = QUESTION_TYPES[getRandNum(0, QUESTION_TYPES.length - 1)]

    const categoryIndex = getRandNum(0, QUESTION_CATEGORY_MOCKS.length - 1)

    const numOfAnswers = getRandNum(
      MIN_NUM_OF_QUESTION_OPTIONS,
      MAX_NUM_OF_QUESTION_OPTIONS
    )

    const options = (() => {
      const arr = []
      times(numOfAnswers, (i: number) => {
        const option = faker.lorem.sentence(30).substring(0, ANSWER_INPUT_MAX_LENGTH)
        arr.push(option)
      })
      return arr
    })()

    const question = {
      creatorId: user._id,
      createdAt: new Date(
        faker.date.between({
          from: new Date(Date.now() - 1000 * msInDay),
          to: new Date(Date.now() - 10 * msInDay),
        })
      ).getTime(),
      type,
      category: QUESTION_CATEGORY_MOCKS[categoryIndex]._id.toString(),
      text: faker.lorem
        .sentence(30)
        .substring(0, getRandNum(15, QUESTION_INPUT_MAX_LENGTH / 3)),
      options,
      correctOptions: getRandNums(
        0,
        options.length - 1,
        type === QuestionType.SingleChoice ? 1 : options.length
      ),
    } as IQuestion

    questionMocks.push(question as IQuestion)
  })

  return questionMocks
}

export default getQuestionMocks
