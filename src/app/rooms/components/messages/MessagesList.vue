<template>
  <v-container class="messages-list grey darken-4">
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  name: 'MessagesList',
  mounted () {
    this.setScrollMax()
  },
  methods: {
    setScrollMax () {
      this.$el.scrollTop = this.$el.scrollHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.messages-list {
  min-height: calc(100vh - 220px);
  height: calc(100vh - 220px);
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
