import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.put(
    ApiUrlPath.RecoverPassword,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { newPassword } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) {
            return res.status(404).send({ error: dict.errors.noSuchUser })
          }

          doc.set({ password: newPassword })
          doc
            .save()
            .then(() => {
              res.status(200).send({ success: dict.successes.passwordUpdated })
            })
            .catch(err => {
              const errors = {}
              Object.keys(err.errors).forEach(fieldName => {
                errors[fieldName] = err.errors[fieldName].message
              })
              res.status(400).send({ errors })
            })
        })
        .catch(() => {
          res.status(400).send({ error: dict.errors.somethingWentWrong })
        })
    }
  )
}
