<template functional>
  <v-card class="elevation-3">
    <v-card-title class="teal justify-center elevation-2">
      <span class="white--text headline">{{ props.title }}</span>
    </v-card-title>
    <div class="py-4 px-5">
      <slot></slot>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'FormBox',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
