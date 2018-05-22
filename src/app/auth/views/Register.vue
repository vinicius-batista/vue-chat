<template>
 <FormLayout>
    <FormBox :title="'Register'">
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
          :buttonText="'Register'"
          :buttonDisable="!valid"
          :subText="`Already have an account? Login!`"
          @subClick="pushToLogin"
        />
      </v-form>
    </FormBox>
 </FormLayout>
</template>

<script>
import FormBox from '../components/FormBox'
import FormLayout from '../components/FormLayout'
import FormActions from '../components/FormActions'
import { rules, handleErrors } from '@/support/mixins/'
import { registerUserMutation } from '@/domains/auth/graphql'

export default {
  name: 'Register',
  components: {
    FormBox,
    FormLayout,
    FormActions
  },
  mixins: [
    rules(['email', 'password', 'name', 'username']),
    handleErrors
  ],
  data: () => ({
    input: {
      email: '',
      password: '',
      name: '',
      username: ''
    },
    valid: false,
    fields: [
      {
        label: 'Name',
        model: 'name',
        icon: 'person'
      },
      {
        label: 'Username',
        model: 'username',
        icon: 'perm_identity'
      },
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
      if (this.valid) {
        return this.$apollo.mutate({
          mutation: registerUserMutation,
          variables: {
            input: this.input
          }
        })
          .then(this.pushToLogin)
          .catch(this.handleError)
      }
    },
    pushToLogin () {
      return this.$router.push({ name: 'auth.login' })
    }
  }
}
</script>
