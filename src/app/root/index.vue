<template>
  <div>
    <NavBar />
    <SideBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

export default {
  name: 'Root',
  components: {
    NavBar,
    SideBar
  }
}
</script>
