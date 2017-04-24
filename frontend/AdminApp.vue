<template>
  <div>
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleSidebar">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">College Rep App > Admin Page</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="sidebar">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Admin Pages</h3>
        </div>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <router-link to="/links" @click.native="toggleSidebar">
            <md-icon>list</md-icon>
            Links
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'admin-app',
    methods: {
      toggleSidebar() {
        this.$refs.sidebar.toggle()
      }
    }
  }
</script>

<style lang="sass">
</style>
