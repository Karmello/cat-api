import { Application, Request, Response } from 'express'
import OpenAI from 'openai'

import { ApiUrlPath } from 'cat-shared/utils/index'
import { readAuthToken, checkAuthToken } from 'middleware/index'

const { OPENAI_API_KEY } = process.env

export default (app: Application) => {
  app.get(
    ApiUrlPath.GetQuestionProposal,
    readAuthToken,
    checkAuthToken,
    async (req: Request, res: Response) => {
      const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        store: true,
        messages: [{ role: 'user', content: 'write a haiku about ai' }],
      })
    }
  )
}
