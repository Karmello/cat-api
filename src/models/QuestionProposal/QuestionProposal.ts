import mongoose from 'mongoose'

import { questionSchema } from 'models/Question/Question'
import { ModelName, IQuestionDoc } from 'utils/index'

const { model } = mongoose

export default model<IQuestionDoc>(ModelName.QuestionProposal, questionSchema)
