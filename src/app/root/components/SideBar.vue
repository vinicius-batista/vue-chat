<template>
  <v-navigation-drawer
    clipped
    fixed
    app
    disable-resize-watcher
    :value="visibility"
  >
    <UserInfo :user="user"/>
  </v-navigation-drawer>
</template>

<script>
import UserInfo from './UserInfo'

export default {
  name: 'SideBar',
  components: {
    UserInfo
  },
  props: {
    visibility: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
