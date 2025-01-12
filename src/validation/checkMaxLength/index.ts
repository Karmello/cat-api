import { ValidationErrorCode } from 'cat-shared/utils'
import { isStringTooLong } from 'cat-shared/validation/index'

export default (max: number) => ({
  type: 'checkMaxLength',
  message: ValidationErrorCode.MaxLength,
  validator: (value: string) => !isStringTooLong(value, max),
})
