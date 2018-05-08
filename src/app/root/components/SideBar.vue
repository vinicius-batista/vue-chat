<template>
  <v-navigation-drawer
    clipped
    fixed
    app
    disable-resize-watcher
    :value="visibility"
  >
    <UserInfo :user="user"/>
    <v-list class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
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
  },
  data: () => ({
    items: [
      { icon: 'add', title: 'New Room' },
      { icon: 'account_circle', title: 'Profile' },
      { icon: 'settings', title: 'Settings' },
      { icon: 'exit_to_app', title: 'Logout' }
    ]
  })
}
</script>
