<template>
  <FormLayout>
    <FormBox :title="'Login'">
      <ApolloMutation
        :mutation="loginUserMutation"
        @done="submitSuccess"
        @error="handleError"
      >
        <template slot-scope="{ mutate }">
          <v-form
            v-model="valid"
            @submit.prevent="mutate({ variables: { input } })"
          >
            <FormErrorMessage ref="formErrorMessage" />
            <ValidationRules :fields="Object.keys(input)">
              <template slot-scope="{ rules }">
                <v-text-field v-for="{ label, model, icon, type } in fields"
                  :type="type"
                  :key="model"
                  :label="label"
                  v-model="input[model]"
                  :prepend-icon="icon"
                  :rules="rules[model]"
                />
              </template>
            </ValidationRules>
            <FormActions
              :buttonText="'Login'"
              :buttonDisable="!valid"
              :subText="`Don't have an account yet? Register now!`"
              @subClick="handleSubClick"
            />
          </v-form>
        </template>
      </ApolloMutation>
    </FormBox>
  </FormLayout>
</template>

<script>
import FormBox from '../components/FormBox'
import FormLayout from '../components/FormLayout'
import FormActions from '../components/FormActions'
import { getData } from '@/helpers/getData'
import { setTokens } from '@/helpers/setTokens'
import { loginUserMutation } from '@/domains/auth/graphql'
import { FormErrorMessage, ValidationRules } from '@/components'
import { login as fields } from '@/domains/forms'

export default {
  name: 'Login',
  components: {
    FormBox,
    FormLayout,
    FormActions,
    FormErrorMessage,
    ValidationRules
  },
  data: () => ({
    loginUserMutation,
    valid: false,
    input: {
      email: '',
      password: ''
    },
    fields
  }),
  methods: {
    handleError (error) {
      this.$refs.formErrorMessage.handleError(error)
    },
    submitSuccess (result) {
      return Promise
        .resolve(result)
        .then(getData('loginUser'))
        .then(setTokens)
        .then(this.pushToRoot)
    },
    handleSubClick () {
      return this.$router.push({ name: 'auth.register' })
    },
    pushToRoot () {
      return this.$router.push({ name: 'root' })
    }
  }
}
</script>
