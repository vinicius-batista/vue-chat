<template>
 <FormLayout>
    <FormBox :title="'Register'">
      <v-form v-model="valid">
        <v-text-field
          label="Name"
          v-model="name"
          prepend-icon="person"
        />
        <v-text-field
          label="Username"
          v-model="username"
          prepend-icon="perm_identity"
        />
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
    email: '',
    password: '',
    name: '',
    username: '',
    valid: false
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
