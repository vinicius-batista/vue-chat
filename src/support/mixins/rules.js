import { test, length } from 'ramda'
import { isNotEmpty } from '@/helpers/is-not-empty'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const email = {
  data: () => ({
    rules: {
      email: [
        v => isNotEmpty(v) || 'Email is required',
        v => test(emailRegex, v) || 'Invalid email format'
      ]
    }
  })
}

export const password = {
  data: () => ({
    rules: {
      password: [
        v => isNotEmpty(v) || 'Password is required',
        v => length(v) >= 6 || 'Password must have at least 6 caracters.'
      ]
    }
  })
}

export const name = {
  data: () => ({
    rules: {
      name: [
        v => isNotEmpty(v) || 'Name is required'
      ]
    }
  })
}

export const username = {
  data: () => ({
    rules: {
      username: [
        v => isNotEmpty(v) || 'Username is required'
      ]
    }
  })
}
