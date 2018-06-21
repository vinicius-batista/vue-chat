<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :icon="'settings'" :title="'Settings'"/>
    <v-card class="pa-3">
      <v-form v-model="valid" @submit.prevent="handleSubmit" ref="form">
        <v-card-title class="headline">Change password</v-card-title>
        <v-card-text>
          <FormErrorMessage ref="formErrorMessage" />
          <v-text-field v-for="{ label, model } in fields"
            type="password"
            :key="model"
            :label="label"
            v-model="input[model]"
            :rules="rules[model]"
          />
        </v-card-text>
        <FormModalActions
          :sendDisabled="!valid"
          @cancelClick="closeDialog"
        />
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { modal, rules } from '@/support/mixins'
import FormModalActions from '@/components/FormModalActions'
import { changePasswordMutation } from '@/domains/user/graphql'
import { FormErrorMessage } from '@/components'

export default {
  name: 'SettingsModal',
  components: {
    FormModalActions,
    FormErrorMessage
  },
  mixins: [
    modal,
    rules(['newPassword', 'oldPassword'])
  ],
  data: () => ({
    valid: '',
    input: {
      newPassword: '',
      oldPassword: ''
    },
    fields: [
      {
        label: 'Old Password',
        model: 'oldPassword'
      },
      {
        label: 'New Password',
        model: 'newPassword'
      }
    ]
  }),
  methods: {
    handleSubmit () {
      return this
        .$apollo
        .mutate({
          mutation: changePasswordMutation,
          variables: { input: this.input }
        })
        .then(this.resetForm)
        .then(this.closeDialog)
        .catch(this.$refs.formErrorMessage.handleError)
    },
    resetForm () {
      this.$refs.form.reset()
      this.hasError = false
    }
  }
}
</script>
