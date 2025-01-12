import { Document } from 'mongoose'
import { ICountry } from 'cat-shared/utils/index'

export interface ICountryDoc extends ICountry, Document {
  _id: string
}
