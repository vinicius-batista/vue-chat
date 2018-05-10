<template functional>
  <v-list-tile @click="">
    <v-list-tile-action>
      <v-icon>{{ props.item.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ props.item.title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'SideBarItemsList',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
