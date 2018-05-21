<template>
  <v-layout class="received pa-4">
    <v-flex xs4>
      <v-card class="message grey darken-3">
        <v-card-title class="pt-2 pb-0 body-1">{{ user.username }}</v-card-title>
        <v-card-text class="py-1">
          <span class="white--text caption">{{ text }}</span>
          <span class="white--text time">{{ insertedAt | getTime }}</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'MessagesListItem',
  props: {
    user: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    insertedAt: {
      type: String,
      required: true
    }
  },
  filters: {
    getTime (date) {
      return date
    }
  }
}
</script>

<style lang="scss" scoped>
.sent {
  justify-content: flex-end;
  width: 100%;

  .message {
    order: 1;
    border-radius: 5px 5px 0px 5px;
  }
}

.received {
  align-content: flex-start;
  width: 100%;

  .message {
    order: 1;
    border-radius: 5px 5px 5px 0px;
  }
}

.message {
  min-width: 50px;
  display: block;

  .time {
    font-size: 0.8rem;
    text-align: right;
  }

  span {
    overflow: hidden;
    display: block;
    padding: 0.1em;
  }
}
</style>
