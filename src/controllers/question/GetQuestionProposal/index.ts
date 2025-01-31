import { Application, Request, Response } from 'express'
import OpenAI from 'openai'

import { ApiUrlPath } from 'cat-shared/utils'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { QuestionProposalModel, QuestionCategoryModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

const getChatMessage = (categoryName: string, subject = 'free') => `
  please,
  generate an example quiz question for me,
  the question difficulty level should be chosen randomly (easy, normal, hard),
  category is ${categoryName},
  subject is ${subject},
  please return just JSON as below:

  {
    "type": "SINGLE_CHOICE" or "MULTI_CHOICE", // pick value randomly
    "category": ${categoryName},
    "text": "", // content of question
    "options": [], // randomized array of possible answers as strings
    "correctOptions: [] // indexes of correct answers in "options" array
    "explanation": "" // information explaining correct answers
  }
`

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetQuestionProposal,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { category, subject } = req.query

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

      QuestionCategoryModel.find()
        .then(async categories => {
          const categoryObj = categories.find(c => c._id.toString() === category)
          console.log(categoryObj)
          const categoryName = categoryObj.name.en
          const chatMsg = getChatMessage(categoryName, String(subject))

          await openai.chat.completions
            .create({
              model: 'gpt-4o-mini',
              store: true,
              messages: [{ role: 'user', content: chatMsg }],
            })
            .then(completion => {
              let content = ''

              try {
                content = completion.choices[0].message.content
                content = content.substring(7, content.length - 3)
                content = content.replace(categoryName, categoryObj._id)

                const question = new QuestionProposalModel({
                  creatorId: req.decoded._id,
                  ...JSON.parse(content),
                })

                question
                  .save()
                  .then(newQuestion => {
                    res.status(200).send(newQuestion)
                  })
                  .catch(err => {
                    sendBadResponse(
                      req,
                      res,
                      400,
                      { msg: msgs.SOMETHING_WENT_WRONG, valErr: err },
                      err
                    )
                  })
              } catch {
                sendBadResponse(
                  req,
                  res,
                  400,
                  { msg: msgs.SOMETHING_WENT_WRONG, valErr: completion },
                  completion
                )
              }
            })
            .catch(err => {
              sendBadResponse(
                req,
                res,
                400,
                { msg: msgs.COULD_NOT_GET_DATA, valErr: err },
                err
              )
            })
        })
        .catch(err => {
          sendBadResponse(
            req,
            res,
            400,
            { msg: msgs.SOMETHING_WENT_WRONG, valErr: err },
            err
          )
        })
    }
  )
}
