<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :icon="'account_circle'" :title="'Profile'"/>
    <v-card class="pa-3">
      <ApolloMutation
        :mutation="updateProfileMutation"
        :update="updateStore"
        @done="submitSuccess()"
        @error="handleError"
      >
        <template slot-scope="{ mutate }">
          <v-form
            v-model="valid"
            @submit.prevent="mutate({ variables: { input }})"
            ref="form"
          >
            <v-card-title class="headline">Update Profile</v-card-title>
            <v-card-text>
              <FormErrorMessage ref="formErrorMessage" />
              <ProfileUpload v-model="input.profilePicFile"/>
              <ValidationRules :fields="Object.keys(input)">
                <template slot-scope="{ rules }">
                  <v-text-field v-for="{ label, model } in fields"
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
import {
  FormModalActions,
  FormErrorMessage,
  ValidationRules
} from '@/components'
import { updateProfileMutation, profileQuery } from '@/domains/user/graphql'
import { merge } from 'ramda'
import ProfileUpload from './ProfileUpload'
import { profileModal as fields } from '@/domains/forms'

export default {
  name: 'ProfileModal',
  components: {
    FormModalActions,
    FormErrorMessage,
    ValidationRules,
    ProfileUpload
  },
  mixins: [modal],
  data: () => ({
    updateProfileMutation,
    valid: false,
    input: {
      name: '',
      username: '',
      email: '',
      profilePicFile: null
    },
    fields
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
    },
    updateStore (store, { data: updateProfile }) {
      const { profile } = store.readQuery({ query: profileQuery })
      store.writeQuery({
        query: profileQuery,
        data: { profile: merge(profile, updateProfile) }
      })
    }
  },
  apollo: {
    profile: {
      query: profileQuery,
      manual: true,
      result ({ data: { profile } }) {
        const { name, email, username } = profile
        this.input = merge(
          this.input,
          { name, email, username }
        )
      }
    }
  }
}
</script>
