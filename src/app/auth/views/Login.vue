<template>
  <FormLayout>
    <FormBox :title="'Login'">
      <v-form v-model="valid">
        <v-alert type="error" v-model="hasError">
          {{ errorMessage }}
        </v-alert>
        <v-text-field v-for="{ label, model, icon, type } in fields"
          :type="type"
          :key="model"
          :label="label"
          v-model="input[model]"
          :prepend-icon="icon"
          :rules="rules[model]"
        />
      </v-form>
      <FormActions
        :buttonText="'Login'"
        :buttonDisable="!valid"
        :subText="`Don't have an account yet? Register now!`"
        @buttonClick="handleSubmit"
        @subClick="handleSubClick"
      />
    </FormBox>
  </FormLayout>
</template>

<script>
import FormBox from '../components/FormBox'
import FormLayout from '../components/FormLayout'
import FormActions from '../components/FormActions'
import { rules } from '@/support/mixins/rules'
import { handleErrors } from '@/support/mixins/handleErrors'
import { getData } from '@/helpers/getData'
import localForage from 'localforage'

export default {
  name: 'Login',
  components: {
    FormBox,
    FormLayout,
    FormActions
  },
  mixins: [
    rules(['email', 'password']),
    handleErrors
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
        mutation: require('../graphql/LoginUser.gql'),
        variables: {
          input: this.input
        }
      })
        .then(getData('loginUser'))
        .then(this.setTokens)
        .then(this.pushToDashboard)
        .catch(this.handleError)
    },
    handleSubClick (e) {
      return this.$router.push({ name: 'auth.register' })
    },
    pushToDashboard () {
      return this.$router.push({ name: 'dashboard' })
    },
    setTokens ({ accessToken, refreshToken }) {
      return Promise.all([
        localForage.setItem('accessToken', accessToken),
        localForage.setItem('refreshToken', refreshToken)
      ])
    }
  }
}
</script>
