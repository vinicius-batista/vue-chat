<template>
  <v-avatar class="cyan">
    <img
      v-if="profilePic"
      :src="'http://0.0.0.0:4000/download' + profilePic"
    >
    <span v-else>
      {{ name.charAt(0).toUpperCase() }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    profilePic: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
