import { ValidationErrorCode } from 'cat-shared/utils'
import { Sex } from 'cat-shared/utils/index'

export default {
  type: 'checkSex',
  message: ValidationErrorCode.Incorrect,
  validator: (value: Sex) => [Sex.Female, Sex.Male].includes(value),
}
