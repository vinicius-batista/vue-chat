import { test, length, pickAll } from 'ramda'
import { isNotEmpty } from '@/helpers/isNotEmpty'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const rulesObject = {
  email: [
    v => isNotEmpty(v) || 'Email is required',
    v => test(emailRegex, v) || 'Invalid email format'
  ],
  name: [v => isNotEmpty(v) || 'Name is required'],
  username: [v => isNotEmpty(v) || 'Username is required'],
  password: [
    v => isNotEmpty(v) || 'Password is required',
    v => length(v) >= 6 || 'Password must have at least 6 caracters.'
  ]
}

export const rules = (rules) => ({
  data: () => ({
    rules: pickAll(rules, rulesObject)
  })
})
