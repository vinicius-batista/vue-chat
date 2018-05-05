<template>
 <FormLayout>
    <FormBox :title="'Register'">
      <v-form v-model="valid">
        <v-text-field v-for="{ label, model, icon} in fields"
          :key="model"
          :label="label"
          v-model="input[model]"
          :prepend-icon="icon"
        />
      </v-form>
      <FormActions
        :buttonText="'Register'"
        :buttonDisable="!valid"
        :subText="`Already have an account? Login!`"
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
  name: 'Register',
  components: {
    FormBox,
    FormLayout,
    FormActions
  },
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
        icon: 'lock'
      }
    ]
  }),
  methods: {
    handleSubmit (e) {
      console.log(e)
    },
    handleSubClick (e) {
      this.$router.push({ name: 'auth.login' })
    }
  }
}
</script>
