<template functional>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" flat @click.native="listeners.cancelClick">Cancel</v-btn>
    <v-btn
      color="primary"
      flat
      type="submit"
      :disabled="props.sendDisabled"
    >
      Send
    </v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: 'FormModalActions',
  props: {
    sendDisabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>
