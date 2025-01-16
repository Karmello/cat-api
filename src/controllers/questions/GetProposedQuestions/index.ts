import { Application, Request, Response } from 'express'
import get from 'lodash/get'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { QuestionProposalModel } from 'models/index'
import { sendBadResponse } from 'helpers/index'
import msgs from 'utils/msgs'

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetProposedQuestions,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionProposalModel.aggregate([
        {
          $facet: {
            meta: [{ $count: 'count' }],
            docs: [{ $sort: { createdAt: -1 } }],
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
