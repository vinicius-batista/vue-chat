<script>
export default {
  name: 'NavBar',
  functional: true,
  render (h, { listeners }) {
    const { changeSideBarVisibility } = listeners
    return (
      <v-toolbar fixed app clipped-left>
        <v-toolbar-side-icon
          onClick={changeSideBarVisibility}
        />
        <v-toolbar-title>Chat</v-toolbar-title>
      </v-toolbar>
    )
  }
}
</script>
