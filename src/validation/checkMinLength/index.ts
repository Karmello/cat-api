import { ValidationErrorCode } from 'cat-shared/utils'
import { isStringTooShort } from 'cat-shared/validation/index'

export default (min: number) => ({
  type: 'checkMinLength',
  message: ValidationErrorCode.MinLength,
  validator: (value: string) => !isStringTooShort(value, min),
})
