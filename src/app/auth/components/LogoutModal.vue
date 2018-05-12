<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="300">
    <SideBarListItem slot="activator" :item="{ title: 'Logout', icon: 'exit_to_app'}"/>
    <v-card class="pa-3">
      <v-card-title class="headline">Are you sure?</v-card-title>
      <v-card-text>Do you really want to logout?</v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat="flat" @click.native="closeDialog">No</v-btn>
        <v-btn color="red darken-1" flat="flat" @click.native="logout">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LogoutMutation from '../graphql/logout.gql'
import { setTokens } from '@/helpers/setTokens'
import store from '@/services/store'
import modal from '@/support/mixins/modal'

export default {
  name: 'LogoutModal',
  mixins: [modal],
  methods: {
    logout () {
      return store
        .refreshToken()
        .then(this.sendLogout)
        .then(() => setTokens({ accessToken: null, refreshToken: null }))
        .then(this.redirectsUser)
    },
    sendLogout (refreshToken) {
      return this.$apollo.mutate({
        mutation: LogoutMutation,
        variables: { refreshToken }
      })
    },
    redirectsUser () {
      this.closeDialog()
      this.$router.push({ name: 'auth.login' })
    }
  }
}
</script>
