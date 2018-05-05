import { isEmpty, not, pipe } from 'ramda'

export const isNotEmpty = pipe(
  isEmpty,
  not
)
