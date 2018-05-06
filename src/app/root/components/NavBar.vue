<template>
  <v-toolbar fixed app clipped-left>
    <v-toolbar-side-icon
      @click.native="changeSideBarVisibility"
    >
    </v-toolbar-side-icon>
    <v-toolbar-title>Chat</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    changeSideBarVisibility () {
      return this.$emit('changeSideBarVisibility')
    }
  }
}
</script>
