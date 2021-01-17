<template>
<nav class="navbar container" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    
   
  </div>
  <div id="navbar" class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">Home</router-link>
      
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <!-- Check that the SDK client is not currently loading before accessing is methods -->
          <div v-if="!$auth.loading">
          <div v-if="!first_name">
            <!-- show login when not authenticated -->
            <a href="/login" class="button is-dark">Log in</a>
            <a href="/signup" class="button is-light">Sign up</a>
            <!-- <a v-if="!$auth.isAuthenticated" @click="login" class="button is-dark"><strong>Sign in</strong></a> -->
            <!-- show logout when authenticated -->
            </div>
          <div v-if="first_name">
            <a  @click="logout" class="button is-dark"><strong>Log outttt</strong></a>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  name: 'Nav',
  first_name: localStorage.getItem('user-first_name'),
  methods: {
  //alert(localStorage.getItem('user-first_name'));
    
  // Log the user in
  login() { 
    this.$auth.loginWithRedirect();
  },
  // Log the user out
  logout() {
    this.$auth.logout({
      returnTo: window.location.origin
    });
  }
  }
}
</script>
<style lang="scss" scoped>
  nav {
    margin-top: 25px;
    margin-bottom: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #d88d00;
      }
    }  
  } 
</style>