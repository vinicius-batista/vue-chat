import { pipe, length, equals, modulo, __ } from 'ramda'

export const isArraySizeDivisor = (array, size) =>
  pipe(
    length,
    modulo(__, size),
    equals(0)
  )(array)
