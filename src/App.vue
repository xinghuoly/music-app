<template>
    <div id="app">
        <!-- <my-head></my-head> -->
        <router-view />
        <nav-bar></nav-bar>
    </div>
</template>

<script>
// import myHead from './components/common/myheader'
import navBar from './components/common/navbar'
export default {
    name: 'App',
    components: {
        // myHead,
        navBar
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
