<template>
  <FormLayout>
    <FormBox :title="'Login'">
      <v-form v-model="valid" @submit.prevent="handleSubmit">
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
import { rules } from '@/support/mixins/rules'
import { handleErrors } from '@/support/mixins/handleErrors'
import { getData } from '@/helpers/getData'
import { setTokens } from '@/helpers/setTokens'
import LoginUserMutation from '../graphql/loginUser.gql'

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
        mutation: LoginUserMutation,
        variables: {
          input: this.input
        }
      })
        .then(getData('loginUser'))
        .then(setTokens)
        .then(this.pushToRoot)
        .catch(this.handleError)
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
