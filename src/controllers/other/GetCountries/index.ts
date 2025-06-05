import { Application, Request, Response } from 'express'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { CountryModel } from 'models/index'
import dict from 'src/dictionary'

export default (app: Application) => {
  app.get(ApiUrlPath.GetCountries, (req: Request, res: Response) => {
    CountryModel.find()
      .then(docs => {
        res.status(200).send({ countries: docs })
      })
      .catch(() => {
        res.status(400).send({ error: dict.errors.couldNotGetData })
      })
  })
}
