<template>
  <div>
    <slot :rules="pickRules()"></slot>
  </div>
</template>

<script>
import { test, length, pickAll } from 'ramda'
import { isNotEmpty } from '@/helpers/isNotEmpty'

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRules = [
  v => isNotEmpty(v) || 'Password is required',
  v => length(v) >= 6 || 'Password must have at least 6 caracters.'
]

export default {
  name: 'ValidationRules',
  props: {
    fields: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    rules: {
      email: [
        v => isNotEmpty(v) || 'Email is required',
        v => test(emailRegex, v) || 'Invalid email format'
      ],
      name: [v => isNotEmpty(v) || 'Name is required'],
      description: [v => isNotEmpty(v) || 'Description is required'],
      username: [v => isNotEmpty(v) || 'Username is required'],
      password: passwordRules,
      oldPassword: passwordRules,
      newPassword: passwordRules
    }
  }),
  methods: {
    pickRules () {
      return pickAll(this.fields, this.rules)
    }
  }
}
</script>
