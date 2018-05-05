<template functional>
  <v-layout justify-center align-center row wrap>
    <v-flex xs8 md6 class="mt-4">
      <v-btn
        block
        color="teal"
        large
        :disabled="props.buttonDisable"
        @click.prevent="listeners.buttonClick"
      >
        <span class="mx-2">{{ props.buttonText }}</span>
        <v-icon small >send</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs8 md8 class="mt-4">
      <v-subheader
        class="justify-center sub-text"
        @click.prevent="listeners.subClick"
      >
        {{ props.subText }}
      </v-subheader>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'FormActions',
  props: {
    buttonText: {
      type: String,
      required: true
    },
    buttonDisable: {
      type: Boolean,
      default: true
    },
    subText: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-text {
  cursor: pointer;
  &:hover {
    color: white;
  }
}
</style>
