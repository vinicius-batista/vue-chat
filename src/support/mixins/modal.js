import SideBarListItem from '@/app/root/components/SideBarListItem'

export default {
  components: {
    SideBarListItem
  },
  data: () => ({
    isDialogOpen: false
  }),
  methods: {
    closeDialog () {
      this.isDialogOpen = false
    }
  }
}
