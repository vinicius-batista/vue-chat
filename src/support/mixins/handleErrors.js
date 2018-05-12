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
