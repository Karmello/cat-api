import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'cat-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'

const { NODE_ENV, FE_URL } = process.env

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetActivationLink,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      const lang = req.get('language')

      UserModel.findOne({ _id: req.decoded._id })
        .then((doc: IUserDoc) => {
          if (doc) {
            const token = getFreshAuthToken(doc, true)

            const link =
              (FE_URL || `${req.protocol}${req.hostname}`) +
              '/api' +
              ApiUrlPath.ActivateAccount +
              `?${X_AUTH_TOKEN}=` +
              token +
              `&lang=${lang}`

            if (NODE_ENV === 'test') {
              res.setHeader(X_AUTH_TOKEN, token)
              return res.status(200).send({ info: dict.infos.activationLinkSent })
            }

            sendMail({
              to: doc.email,
              subject: dict.email.activation.subject,
              text: dict.email.activation.text + ' ' + doc.username.toUpperCase(),
              btnText: dict.email.activation.btnText,
              link,
            }).then(
              () => {
                if (NODE_ENV === 'development') res.setHeader(X_AUTH_TOKEN, token)
                res.status(200).send({ info: dict.infos.activationLinkSent })
              },
              () => {
                res.status(400).send({ error: dict.errors.somethingWentWrong })
              }
            )
          } else {
            res.status(400).send({ error: dict.errors.noSuchUser })
          }
        })
        .catch(() => {
          res.status(400).send({ error: dict.errors.somethingWentWrong })
        })
    }
  )
}
