<template>
 <FormLayout>
    <FormBox :title="'Register'">
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
        :buttonText="'Register'"
        :buttonDisable="!valid"
        :subText="`Already have an account? Login!`"
        @buttonClick="handleSubmit"
        @subClick="pushToLogin"
      />
    </FormBox>
 </FormLayout>
</template>

<script>
import FormBox from '../components/FormBox'
import FormLayout from '../components/FormLayout'
import FormActions from '../components/FormActions'
import { email, password, name, username } from '@/support/mixins/rules'

export default {
  name: 'Register',
  components: {
    FormBox,
    FormLayout,
    FormActions
  },
  mixins: [email, password, name, username],
  data: () => ({
    input: {
      email: '',
      password: '',
      name: '',
      username: ''
    },
    valid: false,
    hasError: false,
    errorMessage: '',
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
        this.$apollo.mutate({
          mutation: require('../graphql/RegisterUser.gql'),
          variables: {
            input: this.input
          }
        })
          .then(this.pushToLogin)
          .catch(error => {
            this.errorMessage = error.graphQLErrors[0].message
            this.hasError = true
          })
      }
    },
    pushToLogin () {
      this.$router.push({ name: 'auth.login' })
    }
  }
}
</script>
