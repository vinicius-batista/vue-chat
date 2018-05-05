<template>
  <FormLayout>
    <FormBox :title="'Login'">
      <v-form v-model="valid">
        <v-text-field
          label="Email"
          v-model="email"
          prepend-icon="email"
        />
         <v-text-field
          type="password"
          label="Password"
          v-model="password"
          prepend-icon="lock"
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

export default {
  name: 'Login',
  components: {
    FormBox,
    FormLayout,
    FormActions
  },
  data: () => ({
    valid: false,
    email: '',
    password: ''
  }),
  methods: {
    handleSubmit (e) {
      console.log(e)
    },
    handleSubClick (e) {
      console.log(e)
    }
  }
}
</script>
