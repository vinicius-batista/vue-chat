import jwtdecode from 'jwt-decode'
import { isExpired } from './isExpired'
import { pipe, prop } from 'ramda'

export const checkTokenExpired = pipe(
  jwtdecode,
  prop('exp'),
  isExpired
)
