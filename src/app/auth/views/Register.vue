<template>
 <FormLayout>
    <FormBox :title="'Register'">
      <ApolloMutation
        :mutation="registerUserMutation"
        @done="pushToLogin()"
        @error="handleError"
      >
        <template slot-scope="{ mutate }">
          <v-form
            v-model="valid"
            @submit.prevent="mutate({ variables: { input } })"
          >
            <FormErrorMessage ref="formErrorMessage" />
            <ProfileUpload v-model="input.profilePicFile"/>
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
              :buttonText="'Register'"
              :buttonDisable="!valid"
              :subText="`Already have an account? Login!`"
              @subClick="pushToLogin"
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
import { registerUserMutation } from '@/domains/auth/graphql'
import { FormErrorMessage, ValidationRules } from '@/components'
import ProfileUpload from '@/app/user/components/ProfileUpload'
import { register as fields } from '@/domains/forms'

export default {
  name: 'Register',
  components: {
    FormBox,
    FormLayout,
    FormActions,
    FormErrorMessage,
    ValidationRules,
    ProfileUpload
  },
  data: () => ({
    registerUserMutation,
    input: {
      email: '',
      password: '',
      name: '',
      username: '',
      profilePicFile: null
    },
    valid: false,
    fields
  }),
  methods: {
    handleError (error) {
      this.$refs.formErrorMessage.handleError(error)
    },
    pushToLogin () {
      return this.$router.push({ name: 'auth.login' })
    }
  }
}
</script>
