<template>
  <v-dialog v-model="isDialogOpen" full-width max-width="500">
    <SideBarListItem slot="activator" :item="{ icon: 'settings', title: 'Settings' }"/>
  </v-dialog>
</template>

<script>
import { modal } from '@/support/mixins'

export default {
  name: 'SettingsModal',
  mixins: [modal]
}
</script>
