import { Application, Request, Response } from 'express'
import OpenAI from 'openai'

import { ApiUrlPath } from 'cat-shared/utils'
import { getRandNum } from 'cat-shared/helpers'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { QuestionProposalModel, QuestionCategoryModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

const getChatMessage = (category: string) => `
  please,
  generate an example quiz question for me,
  the question should be hard to guess,
  please return just JSON

  {
    "type": "SINGLE_CHOICE" or "MULTI_CHOICE", // pick value randomly
    "category": ${category},
    "text": "", // content of question
    "options": [], // randomized array of possible answers as strings
    "correctOptions: [] // indexes of correct answers in "options" array
  }
`

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetQuestionProposal,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

      QuestionCategoryModel.find()
        .then(async categories => {
          const categoryObj = categories[getRandNum(0, categories.length - 1)]
          const category = categoryObj.name.en
          const chatMsg = getChatMessage(category)

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
                content = content.replace(category, categoryObj._id)

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
