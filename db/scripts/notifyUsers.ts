import { Db } from 'mongodb'

import { IUser, Lang } from 'cat-shared/utils'
import { getCollections } from 'db/helpers'
import { sendMail } from 'helpers/index'

const notifyUsers = async (db: Db) => {
  const { users, questions, answers } = getCollections(db)

  const usersData = await users.find().toArray()
  const creatorIds = (await questions.find().toArray()).map(q => q.creatorId.toString())
  const answererIds = (await answers.find().toArray()).map(a => a.answererId.toString())

  const usersToNotify = usersData.filter(u => {
    const userId = u._id.toString()
    return !creatorIds.includes(userId) && !answererIds.includes(userId)
  })

  console.log({
    usersToNotify,
  })

  const sendMailPromises = []

  usersToNotify.forEach(async (u: IUser) => {
    sendMailPromises.push(
      await sendMail({
        to: u.email,
        subject: 'Friendly reminder from the "Can Answer That ?" web application',
        text: `
          Hello ${u.username.toUpperCase()} !
          You are registered in our database, but you haven't made any contribution so far.
          Please, find some time and visit the "Can Answer That ?" web app.
          Thank you in advance :)`,
        btnText: 'Go to App',
        link: 'https://cat-app.com',
      })
    )
  })

  Promise.all(sendMailPromises).then(() => {
    console.log(`Notified ${usersToNotify.length} user(s).`)
  })
}

export default notifyUsers
