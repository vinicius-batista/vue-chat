<script>
export default {
  name: 'UserAvatar',
  functional: true,
  props: {
    profilePic: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  },
  render (h, { props, data }) {
    const { name, profilePic } = props
    return (
      <v-avatar class='cyan' {...data}>
        { profilePic
          ? <img src={'http://0.0.0.0:4000/download' + profilePic} />
          : <span> { name.charAt(0).toUpperCase() } </span> }
      </v-avatar>
    )
  }
}
</script>
