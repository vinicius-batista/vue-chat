<script>
import UserAvatar from '@/app/user/components/UserAvatar'

export default {
  name: 'UserInfo',
  functional: true,
  props: {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    profilePic: {
      type: String,
      default: null
    }
  },
  render (h, { props }) {
    const { name, email, profilePic } = props
    return (
      <v-container fluid class='teal ligthen-4'>
        <v-layout align-center wrap mt-3>
          <v-flex xs3>
            <UserAvatar name={name} profilePic={profilePic} />
          </v-flex>
        </v-layout>
        <v-layout align-center wrap mt-4>
          <v-flex xs9>
            <strong>{ name }</strong>
          </v-flex>
          <v-flex xs9>
            <strong>{ email }</strong>
          </v-flex>
        </v-layout>
      </v-container>
    )
  }
}
</script>
