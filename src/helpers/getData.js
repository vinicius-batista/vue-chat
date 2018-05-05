import { prop, pipe, curry } from 'ramda'

export const getData = curry(
  (path, response) => pipe(
    prop('data'),
    prop(path)
  )(response)
)
