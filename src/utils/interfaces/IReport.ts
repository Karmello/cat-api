import { Document } from 'mongoose'
import { IReport } from 'cat-shared/utils/index'

export interface IReportDoc extends IReport, Document {
  _id: string
}
