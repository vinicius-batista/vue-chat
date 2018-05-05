<template>
  <FormLayout>
    <FormBox :title="'Login'">
      <v-form v-model="valid">
        <v-text-field v-for="{ label, model, icon} in fields"
          :key="model"
          :label="label"
          v-model="input[model]"
          :prepend-icon="icon"
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
        icon: 'lock'
      }
    ]
  }),
  methods: {
    handleSubmit (e) {
      console.log(e)
    },
    handleSubClick (e) {
      this.$router.push({ name: 'auth.register' })
    }
  }
}
</script>
