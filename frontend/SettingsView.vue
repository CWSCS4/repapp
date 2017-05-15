<template>
  <md-layout>
    <md-layout>Admin settings</md-layout>
    <md-layout>
    <md-card>
      <md-card-header>
        <div class="md-title">Email preferences</div>
      </md-card-header>
      <md-card-content>
        <div v-if="emailSettings">
          <email-setting v-for="(on, setting) in emailSettings"
          :setting="setting"
          :on="on"
          :label="EMAIL_SETTING_NAMES[setting]">
          </email-setting>
        </div>
      </md-card-content>
    </md-layout>
  </md-layout>
</template>

<script>
  import adminFetch from './admin-fetch'
  import EmailSetting from './EmailSetting.vue'

  export default {
    name: 'settings-view',
    data() {
      return {
        EMAIL_SETTING_NAMES: {
          emailOnPeriodChoice: 'E-mail when rep chooses period',
          emailOnCancellation: 'E-mail when rep cancels',
          emailOnNoteChange: 'E-mail when notes from college change',
          emailDailyDigest: 'E-mail a summary each day of notifications'
        },
        emailSettings: null
      }
    },
    mounted() {
      adminFetch({
        url: '/api/admin/settings/all',
        handler: ({settings}) => this.emailSettings = settings,
        router: this.$router
      })
    },
    components: {EmailSetting}
  }
</script>