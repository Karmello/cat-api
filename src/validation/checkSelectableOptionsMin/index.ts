import { ValidationErrorCode, IQuestion } from 'cat-shared/utils'

export default {
  type: 'checkSelectableOptionsMin',
  message: ValidationErrorCode.Invalid,
  validator() {
    const {
      options,
      selectableOptions: {
        range: { min, max },
      },
    } = this as IQuestion

    if (!max || min < 1 || min >= max || min >= options.length) {
      return false
    }

    return true
  },
}
