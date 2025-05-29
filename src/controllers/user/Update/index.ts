import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.put(
    ApiUrlPath.UpdateUser,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const { email, username, dateOfBirth, country, sex } = req.body

      UserModel.findOne({ _id: req.decoded._id })
        .select('-password')
        .exec()
        .then((doc: IUserDoc) => {
          if (!doc) {
            return res.status(404).send({ error: dict.errors.noSuchUser })
          }

          const newValues = {
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            dateOfBirth,
            country,
            sex,
          }

          if (doc.email !== newValues.email) {
            newValues['config.confirmed'] = false
          }

          doc.set(newValues)

          doc
            .save()
            .then(updatedDoc => {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(updatedDoc))
              res.status(200).send({
                user: updatedDoc,
                success: dict.successes.userDetailsUpdated,
              })
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
