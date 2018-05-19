<template>
  <v-list class="messages-list grey darken-4">
    <slot></slot>
  </v-list>
</template>

<script>
export default {
  name: 'MessagesList',
  mounted () {
    this.$el.scrollTop = this.$el.scrollHeight
  }
}
</script>

<style lang="scss" scoped>
.messages-list {
  min-height: calc(100vh - 220px);
  height: calc(100vh - 220px);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
