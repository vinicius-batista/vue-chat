<template functional>
  <v-container justify-center>
    <v-btn
      v-if="props.hasMore"
      @click="listeners.showMore"
      flat
      block
      color="teal lighten-2"
    >
      Show More
    </v-btn>
    <p v-else class="body-2 text-xs-center teal--text lighten-2">
      No more results
    </p>
  </v-container>
</template>

<script>
export default {
  name: 'PaginationAction',
  props: {
    hasMore: {
      type: Boolean,
      required: true
    }
  }
}
</script>
