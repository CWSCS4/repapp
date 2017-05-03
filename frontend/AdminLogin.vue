<template>
  <md-dialog ref="login" @close="openLogIn">
    <md-dialog-title>Login</md-dialog-title>
    <md-dialog-content>
      <md-input-container>
        <label>E-mail</label>
        <md-input type="email" required v-model="email"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Password</label>
        <md-input type="password" required v-model="password"></md-input>
      </md-input-container>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="logIn">Log in</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: 'admin-login',
    data() {
      return {email: '', password: ''}
    },
    methods: {
      openLogIn() {
        this.$refs.login.open()
      },
      logIn() {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
          credentials: 'include'
        })
          .then(response => response.json())
          .then(({success, message}) => {
            if (success) this.$refs.login.close()
            else alert(message)
          })
      }
    },
    mounted() {
      fetch('/api/logged-in', {credentials: 'include'})
        .then(response => response.json())
        .then(({success, loggedIn}) => {
          if (!(success && loggedIn)) this.openLogIn()
        })
    }
  }
</script>