<template>
  <v-container fluid class="teal ligthen-4">
    <v-layout align-center wrap mt-3>
      <v-flex xs3>
        <UserAvatar v-bind="user"/>
      </v-flex>
    </v-layout>
    <v-layout align-center wrap mt-4>
      <v-flex xs9>
        <strong>{{ user.name }}</strong>
      </v-flex>
      <v-flex xs9>
         <strong>{{ user.email }}</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserAvatar from '@/app/user/components/UserAvatar'

export default {
  name: 'UserInfo',
  components: { UserAvatar },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
