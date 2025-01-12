import { ValidationErrorCode, ReportReason } from 'cat-shared/utils'

export default {
  type: 'checkReportReasons',
  message: ValidationErrorCode.Incorrect,
  validator: (value: ReportReason[]) => {
    const reasons = Object.values(ReportReason)
    return !value.some(v => !reasons.includes(v))
  },
}
