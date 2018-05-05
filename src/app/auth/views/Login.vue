<template>
  <FormLayout>
    <FormBox :title="'Login'">
      <v-form v-model="valid">
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
import { email, password } from '@/support/mixins/rules'

export default {
  name: 'Login',
  components: {
    FormBox,
    FormLayout,
    FormActions
  },
  mixins: [email, password],
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
    handleSubmit (e) {
      console.log(e)
    },
    handleSubClick (e) {
      this.$router.push({ name: 'auth.register' })
    }
  }
}
</script>
