<template>
  <v-list class="messages-list grey darken-4">
    <div
      v-for="message in messages"
      :key="message.id"
    >
      <slot :message="message"></slot>
    </div>
  </v-list>
</template>

<script>
export default {
  name: 'MessagesList',
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
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
