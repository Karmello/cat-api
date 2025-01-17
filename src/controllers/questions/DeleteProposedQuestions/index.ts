import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { QuestionProposalModel } from 'models/index'
import msgs from 'utils/msgs'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendBadResponse } from 'helpers/index'

export default (app: Application) => {
  app.delete(
    ApiUrlPath.DeleteProposedQuestions,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      QuestionProposalModel.deleteMany({ _id: { $in: req.body } })
        .then(({ deletedCount }) => {
          if (deletedCount > 0) {
            res.status(200).send({ msg: msgs.QUESTION_DELETED, deletedCount })
          } else {
            sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG })
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.SOMETHING_WENT_WRONG }, err)
        })
    }
  )
}
