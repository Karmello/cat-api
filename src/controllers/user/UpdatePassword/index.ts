import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.put(
    ApiUrlPath.UpdatePassword,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { currentPassword, newPassword } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) {
            return res.status(404).send({ error: dict.errors.noSuchUser })
          }

          doc.comparePasswords(currentPassword, (err, isMatch) => {
            if (err || !isMatch) {
              res.status(400).send({
                errors: {
                  currentPassword: dict.errors.isIncorrect,
                },
              })
            } else {
              doc.set({ password: newPassword })
              doc
                .save()
                .then(savedDoc => {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(savedDoc))
                  res.status(200).send({
                    data: { user: savedDoc },
                    success: dict.successes.passwordUpdated,
                  })
                })
                .catch(err => {
                  const errors = {}
                  Object.keys(err.errors).forEach(fieldName => {
                    errors[fieldName] = err.errors[fieldName].message
                  })
                  res.status(400).send({ errors })
                })
            }
          })
        })
        .catch(() => {
          res.status(400).send({ error: dict.errors.somethingWentWrong })
        })
    }
  )
}
