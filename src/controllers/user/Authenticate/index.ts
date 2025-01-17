import { Application, Request, Response } from 'express'

import { ApiUrlPath, X_AUTH_TOKEN } from 'cat-shared/utils/index'
import { getFreshAuthToken, sendBadResponse } from 'helpers/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'
import { UserModel } from 'models/index'
import { IUserDoc } from 'utils/index'
import msgs from 'utils/msgs'

import checkRequest from './checkRequest'

type TQuery = {
  _id?: string
  username?: string
}

export default (app: Application) => {
  app.post(
    ApiUrlPath.AuthenticateUser,
    readAuthToken,
    checkAuthToken,
    checkRequest,
    (req: Request, res: Response) => {
      const query = {} as TQuery

      const {
        decoded,
        body: { username, password },
      } = req

      if (decoded) query._id = decoded._id
      if (username) query.username = username.toLowerCase()

      UserModel.findOne(query)
        .then((doc: IUserDoc) => {
          if (username && password) {
            if (doc) {
              doc.comparePasswords(password, (err, isMatch) => {
                if (err || !isMatch) {
                  sendBadResponse(req, res, 401, { msg: msgs.AUTHENTICATION_FAILED }, err)
                } else {
                  res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
                  const body = { user: doc, isAdmin: undefined }
                  if (body.user._id.toString() === process.env.ADMIN_USER_ID) {
                    body.isAdmin = true
                  }
                  res.status(200).send(body)
                }
              })
            } else {
              sendBadResponse(req, res, 401, {
                msg: msgs.AUTHENTICATION_FAILED,
              })
            }
          } else {
            if (doc) {
              res.setHeader(X_AUTH_TOKEN, getFreshAuthToken(doc))
              const body = { user: doc, isAdmin: undefined }
              if (body.user._id.toString() === process.env.ADMIN_USER_ID) {
                body.isAdmin = true
              }
              res.status(200).send(body)
            } else {
              sendBadResponse(req, res, 401, {
                msg: msgs.AUTHENTICATION_FAILED,
              })
            }
          }
        })
        .catch(err => {
          sendBadResponse(req, res, 400, { msg: msgs.AUTHENTICATION_FAILED }, err)
        })
    }
  )
}
