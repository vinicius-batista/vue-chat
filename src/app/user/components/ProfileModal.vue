<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :icon="'account_circle'" :title="'Profile'"/>
    <v-card class="pa-3">
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-card-title class="headline">Update Profile</v-card-title>
        <v-card-text>
          <v-alert type="error" v-model="hasError">
            {{ errorMessage }}
          </v-alert>
          <v-text-field v-for="{ label, model } in fields"
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
import { rules, modal, handleErrors } from '@/support/mixins'
import FormModalActions from '@/components/FormModalActions'
import updateProfileMutation from '../graphql/updateProfile.gql'
import profileQuery from '@/app/root/graphql/profile.gql'
import { merge } from 'ramda'

export default {
  name: 'ProfileModal',
  components: {
    FormModalActions
  },
  mixins: [
    modal,
    handleErrors,
    rules(['email', 'name', 'username'])
  ],
  data: () => ({
    valid: false,
    input: {
      name: '',
      username: '',
      email: ''
    },
    fields: [
      {
        label: 'Name',
        model: 'name'
      },
      {
        label: 'Username',
        model: 'username'
      },
      {
        label: 'Email',
        model: 'email'
      }
    ]
  }),
  methods: {
    handleSubmit () {
      return this
        .$apollo
        .mutate({
          mutation: updateProfileMutation,
          variables: { input: this.input },
          update: this.updateStore
        })
        .then(this.closeDialog)
        .catch(this.handleError)
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