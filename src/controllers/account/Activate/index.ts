import { Application, Request, Response } from 'express'

import { ApiUrlPath, SocketEvent } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { getMailTemplate } from 'helpers/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(
    ApiUrlPath.ActivateAccount,
    readAuthToken,
    checkAuthToken,
    (req: Request, res: Response) => {
      UserModel.findOneAndUpdate(
        { _id: req.decoded._id },
        { 'config.confirmed': true },
        { runValidators: true }
      )
        .then(doc => {
          if (!doc) {
            res.status(404).send(dict.errors.noSuchUser)
          } else if (doc.config.confirmed) {
            res.status(403).send(dict.errors.alreadyConfirmed)
          } else {
            if (process.env.NODE_ENV !== 'test') {
              req.app
                .get('io')
                .sockets.in('user:' + doc._id.toString())
                .emit(SocketEvent.AppReload)
            }

            const body = getMailTemplate({
              text: dict.email.activation.emailConfirmed,
            })

            res.status(200).send(body)
          }
        })
        .catch(() => {
          res.status(400).send(dict.errors.somethingWentWrong)
        })
    }
  )
}
