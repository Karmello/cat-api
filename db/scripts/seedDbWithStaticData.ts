import { Db } from 'mongodb'

import {
  userMocks,
  getQuestionMocks,
  getAnswerMocks,
  countryMocks,
  questionCategoryMocks,
} from '../mocks'

import { emptyDatabase, checkData } from '../scripts'
import { getCollections } from '../helpers'

const seedDatabase = async (db: Db) => {
  const { countries, questionCategories } = getCollections(db)

  await emptyDatabase(db)

  await countries.insertMany(countryMocks)
  console.log('Countries seeded.')

  await questionCategories.insertMany(questionCategoryMocks)
  console.log('Question categories seeded.')

  await checkData(db)
}

export default seedDatabase
