import { Application, Request, Response } from 'express'

import { ApiUrlPath, IQuestion } from 'cat-shared/utils/index'
import { QuestionModel } from 'models/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.post(
    ApiUrlPath.CreateQuestion,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const creatorId = req.decoded._id
      const { type, categories, text, options } =
        req.body as IQuestion

      const newQuestion = new QuestionModel({
        creatorId,
        type,
        categories,
        text,
        options,
      })

      newQuestion
        .save()
        .then(savedQuestion =>
          res.status(201).send({
            question: savedQuestion.toObject(),
            msg: msgs.QUESTION_CREATED,
          })
        )
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
