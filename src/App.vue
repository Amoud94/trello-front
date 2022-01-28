<template>
  <div id="app">
    <the-header></the-header>
    <router-view />
    <notifications group="crud" />
  </div>
</template>

<script>
import "../libs/semantic-ui/semantic.min.js";
import "../libs/semantic-ui/semantic.min.css";

import TheHeader from "./components/layout/TheHeader.vue";

export default {
  name: "app",
  components: {
    TheHeader,
  },
};
</script>

<style>
</style>
