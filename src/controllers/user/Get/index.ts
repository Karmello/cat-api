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

      try {
        Promise.all([
          UserModel.findOne({ _id }),
          QuestionModel.countDocuments(),
          QuestionModel.countDocuments({ creatorId: _id }),
          QuestionModel.aggregate([
            {
              $lookup: {
                from: 'answers',
                localField: '_id',
                foreignField: 'questionId',
                as: 'question_answers',
              },
            },
            {
              $match: {
                'question_answers.0': {
                  $exists: true,
                },
              },
            },
            { $unwind: '$question_answers' },
            {
              $match: {
                'question_answers.answererId': new ObjectId(_id),
              },
            },
            {
              $group: {
                _id: '$_id',
                category: {
                  $first: '$category',
                },
                correctOptions: {
                  $first: '$correctOptions',
                },
                selectedIndexes: {
                  $first: '$question_answers.selectedIndexes',
                },
              },
            },
            {
              $addFields: {
                correct: {
                  $setEquals: ['$selectedIndexes', '$correctOptions'],
                },
              },
            },
            {
              $group: {
                _id: '$category',
                category: {
                  $first: '$category',
                },
                count: {
                  $sum: 1,
                },
                correctCount: {
                  $sum: {
                    $cond: [{ $eq: ['$correct', true] }, 1, 0],
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                category: 1,
                count: 1,
                correctCount: 1,
              },
            },
          ]),
        ])
          .then(results => {
            const user = results[0].toJSON() as IUser

            if (
              !user ||
              (user._id.toString() !== req.decoded._id.toString() &&
                !user.config.confirmed)
            ) {
              sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER })
            } else {
              const count = {
                questionsTotal: results[1],
                questionsByUser: results[2],
                answersStats: results[3],
              }

              res.status(200).send({
                data: { count, user },
              })
            }
          })
          .catch(err => {
            sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER }, err)
          })
      } catch {
        sendBadResponse(req, res, 404, { msg: msgs.NO_SUCH_USER })
      }
    }
  )
}
