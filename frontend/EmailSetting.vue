<template>
  <div>
    <md-checkbox v-model="checked">{{ label }}</md-checkbox>
  </div>
</template>

<script>
  import adminFetch from './admin-fetch'

  export default {
    name: 'email-setting',
    props: ['setting', 'on', 'label'],
    data() {
      return {
        checked: this.on
      }
    },
    watch: {
      checked() {
        adminFetch({
          url: '/api/admin/settings/set',
          data: {
            setting: this.setting,
            on: this.checked
          },
          handler() {

          },
          router: this.$router
        })
      }
    }
  }
</script>