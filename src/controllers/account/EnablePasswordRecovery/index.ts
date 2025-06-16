import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent, X_AUTH_TOKEN } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { getMailTemplate } from 'helpers/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(
    ApiUrlPath.EnablePasswordRecovery,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      UserModel.findOne({ _id: req.decoded._id })
        .then(doc => {
          if (!doc) {
            return res.status(404).send({ error: dict.errors.noSuchUser })
          }

          const token = (req.headers[X_AUTH_TOKEN] || req.query[X_AUTH_TOKEN]) as string

          const body = getMailTemplate({
            text: dict.email.passwordRecovery.enterNewPassword,
          })

          req.app
            .get('io')
            .sockets.in('email:' + doc.email)
            .emit(SocketEvent.EnablePasswordRecoveryField, { [X_AUTH_TOKEN]: token })

          res.status(200).send(body)
        })
        .catch(() => {
          res.status(400).send({ error: dict.errors.somethingWentWrong })
        })
    }
  )
}
