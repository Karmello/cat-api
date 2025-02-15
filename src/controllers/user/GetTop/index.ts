import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'

import { ApiUrlPath } from 'cat-shared/utils/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel, QuestionModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetTopUsers,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      Promise.all([
        QuestionModel.countDocuments(),
        UserModel.aggregate([
          {
            $match: {
              _id: {
                $not: {
                  $in: [new ObjectId('678806d4274e9d0b993be702')],
                },
              },
              'config.confirmed': true,
            },
          },
          {
            $project: {
              _id: '$_id',
              username: '$username',
            },
          },
          {
            $lookup: {
              from: 'answers',
              localField: '_id',
              foreignField: 'answererId',
              as: 'user_answers',
            },
          },
          {
            $match: {
              'user_answers.0': {
                $exists: true,
              },
            },
          },
          {
            $unwind: {
              path: '$user_answers',
            },
          },
          {
            $lookup: {
              from: 'questions',
              localField: 'user_answers.questionId',
              foreignField: '_id',
              as: 'question',
            },
          },
          {
            $unwind: {
              path: '$question',
            },
          },
          {
            $addFields: {
              correct: {
                $setEquals: ['$user_answers.selectedIndexes', '$question.correctOptions'],
              },
            },
          },
          {
            $group: {
              _id: '$_id',
              username: { $first: '$username' },
              answeredCount: { $sum: 1 },
              answeredCorrectCount: {
                $sum: { $cond: [{ $eq: ['$correct', true] }, 1, 0] },
              },
            },
          },
        ]),
      ])
        .then(results => {
          res.status(200).send({
            questionsCount: results[0],
            data: results[1],
          })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
        })
    }
  )
}
