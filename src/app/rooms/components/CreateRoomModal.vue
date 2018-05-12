<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :item="{ icon: 'add', title: 'New Room' }"/>
    <v-card class="pa-3">
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-card-title class="headline">New Room</v-card-title>
        <v-card-text>
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
import createRoomMutation from '../graphql/createRoom.gql'
import profileQuery from '@/app/root/graphql/profile.gql'
import { append, assoc } from 'ramda'
import FormModalActions from '@/components/FormModalActions'

export default {
  name: 'CreateRoomModal',
  components: {
    FormModalActions
  },
  mixins: [
    modal,
    rules(['name', 'description']),
    handleErrors
  ],
  data: () => ({
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
    handleSubmit () {
      return this
        .$apollo
        .mutate({
          mutation: createRoomMutation,
          variables: { input: this.input },
          update: this.updateStore
        })
        .then(this.closeDialog)
        .catch(this.handleErrors)
    },
    updateStore (store, { data: { createRoom } }) {
      const { profile } = store.readQuery({ query: profileQuery })
      const newRooms = append(createRoom, profile.rooms)
      store.writeQuery({
        query: profileQuery,
        data: { profile: assoc('rooms', newRooms, profile) }
      })
    }
  }
}
</script>
