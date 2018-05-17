<template functional>
  <v-list class="messages-list grey darken-4">
    <slot></slot>
  </v-list>
</template>

<script>
export default {
  name: 'MessagesList'
}
</script>

<style lang="scss" scoped>
.messages-list {
  min-height: calc(100vh - 220px);
  height: calc(100vh - 220px);
  overflow: auto;
}
</style>
