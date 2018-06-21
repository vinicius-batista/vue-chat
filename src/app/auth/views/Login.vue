<template>
  <FormLayout>
    <FormBox :title="'Login'">
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <FormErrorMessage ref="formErrorMessage" />
        <v-text-field v-for="{ label, model, icon, type } in fields"
          :type="type"
          :key="model"
          :label="label"
          v-model="input[model]"
          :prepend-icon="icon"
          :rules="rules[model]"
        />
        <FormActions
          :buttonText="'Login'"
          :buttonDisable="!valid"
          :subText="`Don't have an account yet? Register now!`"
          @subClick="handleSubClick"
        />
      </v-form>
    </FormBox>
  </FormLayout>
</template>

<script>
import FormBox from '../components/FormBox'
import FormLayout from '../components/FormLayout'
import FormActions from '../components/FormActions'
import { rules } from '@/support/mixins'
import { getData } from '@/helpers/getData'
import { setTokens } from '@/helpers/setTokens'
import { loginUserMutation } from '@/domains/auth/graphql'
import { FormErrorMessage } from '@/components'

export default {
  name: 'Login',
  components: {
    FormBox,
    FormLayout,
    FormActions,
    FormErrorMessage
  },
  mixins: [
    rules(['email', 'password'])
  ],
  data: () => ({
    valid: false,
    input: {
      email: '',
      password: ''
    },
    fields: [
      {
        label: 'Email',
        model: 'email',
        icon: 'email'
      },
      {
        label: 'Password',
        model: 'password',
        icon: 'lock',
        type: 'password'
      }
    ]
  }),
  methods: {
    handleSubmit () {
      return this.$apollo.mutate({
        mutation: loginUserMutation,
        variables: {
          input: this.input
        }
      })
        .then(getData('loginUser'))
        .then(setTokens)
        .then(this.pushToRoot)
        .catch(this.$refs.formErrorMessage.handleError)
    },
    handleSubClick (e) {
      return this.$router.push({ name: 'auth.register' })
    },
    pushToRoot () {
      return this.$router.push({ name: 'root' })
    }
  }
}
</script>
