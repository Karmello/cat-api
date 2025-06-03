import { Application, Request, Response } from 'express'

import { ApiUrlPath, Lang, X_AUTH_TOKEN } from 'cat-shared/utils/index'
import { IUserDoc } from 'utils/index'
import { sendMail, getFreshAuthToken } from 'helpers/index'
import { UserModel } from 'models/index'

import dict from 'src/dictionary'

const { NODE_ENV, FE_URL } = process.env

export default (app: Application) => {
  app.post(ApiUrlPath.GetRecoveryLink, (req: Request, res: Response) => {
    const lang = Lang.EN

    const { email } = req.body

    UserModel.findOne({ email })
      .then((doc: IUserDoc) => {
        if (!doc) {
          return res.status(400).send({
            errors: {
              email: dict.errors.notFound,
            },
          })
        }

        if (doc) {
          const token = getFreshAuthToken(doc, false, true)

          const link =
            (FE_URL || `${req.protocol}${req.hostname}`) +
            '/api' +
            ApiUrlPath.EnablePasswordRecovery +
            `?${X_AUTH_TOKEN}=` +
            token +
            `&lang=${lang}`

          if (NODE_ENV === 'test') {
            res.setHeader(X_AUTH_TOKEN, token)
            return res.status(200).send({ info: dict.successes.recoveryLinkSent })
          }

          sendMail({
            lang,
            to: doc.email,
            subject: dict[lang].passwordRecovery.subject,
            text: dict[lang].passwordRecovery.text + ' ' + doc.username.toUpperCase(),
            btnText: dict[lang].passwordRecovery.btnText,
            link,
          }).then(
            () => {
              if (NODE_ENV === 'development') {
                res.setHeader(X_AUTH_TOKEN, token)
              }
              return res.status(200).send({ info: dict.successes.recoveryLinkSent })
            },
            () => {
              res.status(400).send({ error: dict.errors.somethingWentWrong })
            }
          )
        }
      })
      .catch(err => {
        console.log(err)
        res.status(400).send({ error: dict.errors.somethingWentWrong })
      })
  })
}
