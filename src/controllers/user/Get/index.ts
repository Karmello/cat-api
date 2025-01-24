import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath, IUser } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel, QuestionModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetUser,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const _id = req.query._id as string

      Promise.all([
        UserModel.findOne({ _id }),
        QuestionModel.countDocuments({ creatorId: _id }),
        QuestionModel.aggregate([
          {
            $lookup: {
              from: 'answers',
              localField: '_id',
              foreignField: 'questionId',
              as: 'answers',
            },
          },
          { $unwind: '$answers' },
          { $match: { 'answers.answererId': new ObjectId(_id) } },
          {
            $group: {
              _id: '$_id',
              correctOptions: { $first: '$correctOptions' },
              selectedIndexes: { $first: '$answers.selectedIndexes' },
            },
          },
        ]),
      ])
        .then(results => {
          const user = results[0].toJSON() as IUser

          const correctAnswers = results[2].filter(
            ({ correctOptions, selectedIndexes }) => {
              return (
                correctOptions.sort((a: number, b: number) => a - b).toString() ===
                selectedIndexes.sort((a: number, b: number) => a - b).toString()
              )
            }
          )

          const count = {
            questions: results[1],
            answers: results[2].length,
            correctAnswers: correctAnswers.length,
          }

          if (
            !user ||
            (user._id.toString() !== req.decoded._id.toString() && !user.config.confirmed)
          ) {
            sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER })
          } else {
            res.status(200).send({
              data: { count, user },
            })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER }, err)
        })
    }
  )
}
