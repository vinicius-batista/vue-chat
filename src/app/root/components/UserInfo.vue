<template functional>
  <v-container fluid class="teal ligthen-4">
    <v-layout align-center wrap mt-3>
      <v-flex xs3>
        <v-avatar class="cyan">
          <span>{{ props.user.name.charAt(0).toUpperCase() }}</span>
        </v-avatar>
      </v-flex>
    </v-layout>
    <v-layout align-center wrap mt-4>
      <v-flex xs9>
        <strong>{{ props.user.name }}</strong>
      </v-flex>
      <v-flex xs9>
         <strong>{{ props.user.email }}</strong>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
