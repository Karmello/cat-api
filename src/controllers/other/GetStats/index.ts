import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { UserModel, QuestionModel, AnswerModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(ApiUrlPath.GetStats, (req: Request, res: Response) => {
    Promise.all([
      UserModel.countDocuments({
        'config.confirmed': true,
        _id: { $not: { $in: [new ObjectId(process.env.ADMIN_USER_ID)] } },
      }),
      QuestionModel.countDocuments(),
      AnswerModel.countDocuments(),
    ]).then(
      results => {
        res.status(200).send({
          count: {
            users: results[0],
            questions: results[1],
            answers: results[2],
          },
        })
      },
      err => {
        sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
      }
    )
  })
}
