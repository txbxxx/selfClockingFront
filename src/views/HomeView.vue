<template>
  <nav>
<!--    <router-link to="/logout">logout</router-link> |-->
    <router-link to="/logout" >logout</router-link>|
    <router-link to="/login">login</router-link>
  </nav>
  <router-view/>
</template>

<script setup>
// @ is an alias to /src
import Logout from "../components/logout/Logout.vue";



</script>

<style lang="scss">


nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>