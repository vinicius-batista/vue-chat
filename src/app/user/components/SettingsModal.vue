<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :icon="'settings'" :title="'Settings'"/>
    <v-card class="pa-3">
      <ApolloMutation
        :mutation="changePasswordMutation"
        @done="submitSuccess()"
        @error="handleError"
      >
        <template slot-scope="{ mutate }">
          <v-form
            v-model="valid"
            @submit.prevent="mutate({ variables: { input } })"
            ref="form"
          >
            <v-card-title class="headline">Change password</v-card-title>
            <v-card-text>
              <FormErrorMessage ref="formErrorMessage" />
              <ValidationRules :fields="Object.keys(input)">
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
        </template>
      </ApolloMutation>
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
    changePasswordMutation,
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
    submitSuccess () {
      this.resetForm()
      this.closeDialog()
    },
    resetForm () {
      this.$refs.form.reset()
      this.$refs.formErrorMessage.reset()
    },
    handleError (error) {
      this.$refs.formErrorMessage.handleError(error)
    }
  }
}
</script>
