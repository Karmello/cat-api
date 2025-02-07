import { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import get from 'lodash/get'

import { ApiUrlPath } from 'cat-shared/utils/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetTopUsers,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
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
            'user_answers.1': {
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
          $match: {
            correct: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            username: { $first: '$username' },
            score: { $count: {} },
          },
        },
        { $sort: { score: -1, 'config.registeredAt': -1 } },
        {
          $facet: {
            meta: [{ $count: 'count' }],
            docs: [{ $limit: 10 }],
          },
        },
      ])
        .then(results => {
          res.status(200).send({
            count: get(results[0], 'meta[0].count', 0),
            data: get(results[0], 'docs', []),
          })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
        })
    }
  )
}
