import { pipe, length, equals } from 'ramda'

export const isArraySize = (array, size) =>
  pipe(
    length,
    equals(size)
  )(array)
