<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :icon="'add'" :title="'New Room'" />
    <v-card class="pa-3">
      <ApolloMutation
        :mutation="createRoomMutation"
        :update="updateStore"
        @done="submitSuccess()"
        @error="handleError"
      >
        <template slot-scope="{ mutate }">
          <v-form
            v-model="valid"
            @submit.prevent="mutate({ variables: { input } })"
            ref="form"
           >
            <v-card-title class="headline">New Room</v-card-title>
            <v-card-text>
              <FormErrorMessage ref="formErrorMessage" />
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
import { createRoomMutation } from '@/domains/rooms/graphql'
import { profileQuery } from '@/domains/user/graphql'
import { append, assoc } from 'ramda'
import { FormModalActions, FormErrorMessage, ValidationRules } from '@/components'

export default {
  name: 'CreateRoomModal',
  components: {
    FormModalActions,
    FormErrorMessage,
    ValidationRules
  },
  mixins: [
    modal
  ],
  data: () => ({
    createRoomMutation,
    valid: false,
    input: {
      name: '',
      description: ''
    },
    fields: [
      {
        label: 'Name',
        model: 'name'
      },
      {
        label: 'Description',
        model: 'description'
      }
    ]
  }),
  methods: {
    updateStore (store, { data: { createRoom } }) {
      const { profile } = store.readQuery({ query: profileQuery })
      const newRooms = append(createRoom, profile.rooms)
      store.writeQuery({
        query: profileQuery,
        data: { profile: assoc('rooms', newRooms, profile) }
      })
    },
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
