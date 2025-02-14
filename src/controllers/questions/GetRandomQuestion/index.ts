import { Application, Request, Response } from 'express'
import mongoose, { PipelineStage } from 'mongoose'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { getRandNum } from 'cat-shared/helpers/index'
import { QuestionModel } from 'models/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetRandomQuestion,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const categoryId = req.query.category as string

      const pipeline = [
        {
          $lookup: {
            from: 'answers',
            localField: '_id',
            foreignField: 'questionId',
            as: 'votes',
          },
        },
        {
          $match: {
            votes: {
              $not: {
                $elemMatch: { answererId: new ObjectId(req.decoded?._id) },
              },
            },
          },
        },
        {
          $group: { _id: null, ids: { $push: '$_id' } },
        },
        {
          $project: { ids: true, _id: false },
        },
      ] as PipelineStage[]

      if (categoryId) {
        pipeline.unshift({
          $match: {
            category: new ObjectId(categoryId),
          },
        })
      }

      Promise.all([
        categoryId
          ? QuestionModel.countDocuments({ category: new ObjectId(categoryId) })
          : QuestionModel.countDocuments(),
        QuestionModel.aggregate(pipeline),
      ])
        .then(results => {
          const ids = results[1][0]?.ids || []
          const randomIndex = getRandNum(0, ids.length - 1)

          if (ids.length) {
            QuestionModel.findOne(
              { _id: ids[randomIndex] },
              { correctOptions: 0, explanation: 0 }
            )
              .then(doc => {
                res.status(200).send({
                  count: { total: results[0], notAnsweredTotal: ids.length },
                  data: [doc],
                })
              })
              .catch(err => {
                console.log(err)
                sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
              })
          } else {
            res.status(200).send({
              count: { total: results[0], notAnsweredTotal: 0 },
              data: [],
            })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
        })
    }
  )
}
