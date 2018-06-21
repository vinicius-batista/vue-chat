<template>
  <v-alert type="error" v-model="hasError">
    {{ errorMessage }}
  </v-alert>
</template>

<script>
export default {
  data: () => ({
    errorMessage: '',
    hasError: false
  }),
  methods: {
    handleError (error) {
      this.errorMessage = error.graphQLErrors[0].message
      this.hasError = true
    }
  }
}
</script>
