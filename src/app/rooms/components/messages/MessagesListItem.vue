<template>
  <v-layout class="received pa-4">
    <v-flex xs4>
      <v-card class="message grey darken-3">
        <v-card-title class="pt-2 pb-0 body-1">User name</v-card-title>
        <v-card-text class="py-1">
          <span class="white--text caption">Some message</span>
          <span class="white--text time">20:56</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'MessagesListItem'
}
</script>

<style lang="scss" scoped>
.sent {
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;

  .message {
    order: 1;
    border-radius: 5px 5px 0px 5px;
  }
}

.received {
  align-content: flex-start;
  align-items: flex-start;
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
