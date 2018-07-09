<template>
  <div>
    <label for="avatar">
      <div class="text-xs-center pa-2">
        <v-avatar :size="100">
          <img :src="imgSrc" alt="avatar">
        </v-avatar>
      </div>
    </label>
    <VueUploadComponent
      v-model="files"
      :drop="true"
      extensions="gif,jpg,jpeg,png,webp"
      accept="image/png,image/gif,image/jpeg,image/webp"
      name="avatar"
      @input-filter="inputFilter"
    />
  </div>
</template>

<script>
import VueUploadComponent from 'vue-upload-component'
import { isEmpty } from 'ramda'

export default {
  name: 'ProfileUpload',
  components: { VueUploadComponent },
  data: () => ({
    files: []
  }),
  computed: {
    imgSrc () {
      return isEmpty(this.files)
        ? 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'
        : this.files[0].url
    }
  },
  methods: {
    inputFilter (newFile, oldFile, prevent) {
      const URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.url = URL.createObjectURL(newFile.file)
      }
      this.$emit('input', newFile.file)
    }
  }
}
</script>
