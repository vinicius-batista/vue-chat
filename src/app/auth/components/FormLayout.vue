<template functional>
  <v-layout
    justify-center
    align-content-center
    class="my-5"
  >
    <v-flex
      xs10
      md6
      class="my-5"
    >
      <slot></slot>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'FormLayout'
}
</script>
