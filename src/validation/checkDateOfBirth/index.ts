import { ValidationErrorCode } from 'cat-shared/utils'

import {
  isDateLowerOrEqualMax,
  isDateGreaterOrEqualMin,
} from 'cat-shared/validation/index'

export default (minDate: string, maxDate: string) => ({
  type: 'checkDateOfBirth',
  message: ValidationErrorCode.Incorrect,
  validator: (value: string) => {
    return (
      isDateGreaterOrEqualMin(value, minDate) && isDateLowerOrEqualMax(value, maxDate)
    )
  },
})
