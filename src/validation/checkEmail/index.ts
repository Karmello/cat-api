import { ValidationErrorCode } from 'cat-shared/utils'
import { isEmailValid } from 'cat-shared/validation/index'

export default {
  type: 'checkEmail',
  message: ValidationErrorCode.Invalid,
  validator: (value: string) => isEmailValid(value),
}
