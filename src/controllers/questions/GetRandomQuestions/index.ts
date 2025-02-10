import { Application, Request, Response } from 'express'
import mongoose, { PipelineStage } from 'mongoose'
import times from 'lodash/times'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { getRandNums } from 'cat-shared/helpers/index'
import { QuestionModel } from 'models/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

const ObjectId = mongoose.Types.ObjectId

const MAX_INDEXES_TO_RETURN = 100

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetRandomQuestions,
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

      QuestionModel.aggregate(pipeline)
        .then(results => {
          const ids = results[0]?.ids || []
          const randomIndexes = getRandNums(
            0,
            ids.length - 1,
            ids.length < MAX_INDEXES_TO_RETURN ? ids.length : MAX_INDEXES_TO_RETURN
          )
          const data = []
          times(randomIndexes.length, i => {
            data.push(ids[randomIndexes[i]])
          })
          res.status(200).send({ data })
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.COULD_NOT_GET_DATA }, err)
        })
    }
  )
}
