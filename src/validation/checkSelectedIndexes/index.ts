import { IQuestion } from 'cat-shared/utils'

export default (selectedIndexes: number[], question: IQuestion): boolean => {
  const { options } = question

  if (!selectedIndexes?.length) {
    return false
  }

  if (new Set(selectedIndexes).size !== selectedIndexes.length) {
    return false
  }

  if (
    selectedIndexes.some(n => {
      return n < 0 || n > options.length - 1
    })
  ) {
    return false
  }

  return true
}
