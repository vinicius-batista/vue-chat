<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :icon="'settings'" :title="'Settings'"/>
    <v-card class="pa-3">
      <v-form v-model="valid" @submit.prevent="handleSubmit" ref="form">
        <v-card-title class="headline">Change password</v-card-title>
        <v-card-text>
          <FormErrorMessage ref="formErrorMessage" />
          <ValidationRules :fields="Object.keys(this.input)">
            <template slot-scope="{ rules }">
              <v-text-field v-for="{ label, model } in fields"
                type="password"
                :key="model"
                :label="label"
                v-model="input[model]"
                :rules="rules[model]"
              />
            </template>
          </ValidationRules>
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
import { modal } from '@/support/mixins'
import FormModalActions from '@/components/FormModalActions'
import { changePasswordMutation } from '@/domains/user/graphql'
import { FormErrorMessage, ValidationRules } from '@/components'

export default {
  name: 'SettingsModal',
  components: {
    FormModalActions,
    FormErrorMessage,
    ValidationRules
  },
  mixins: [
    modal
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
