import { ValidationErrorCode } from 'cat-shared/utils'
import { hasCredentialAllCharsValid } from 'cat-shared/validation/index'

export default (isPassword?: boolean) => ({
  type: 'checkCredentialChars',
  message: ValidationErrorCode.InvalidChar,
  validator: (value: string) => hasCredentialAllCharsValid(value, isPassword),
})
