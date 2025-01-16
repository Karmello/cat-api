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
      const client = new OpenAI({ apiKey: OPENAI_API_KEY })

      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: 'Say this is a test' }],
        model: 'gpt-4o',
      })
    }
  )
}
