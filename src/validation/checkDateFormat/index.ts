import { ValidationErrorCode } from 'cat-shared/utils'
import { isDateFormatValid } from 'cat-shared/validation/index'

export default {
  type: 'checkDateFormat',
  message: ValidationErrorCode.Invalid,
  validator: (value: string) => isDateFormatValid(value),
}
