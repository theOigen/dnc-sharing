<template>
  <v-app dark>
    <navigation></navigation>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  name: "App",
  components: {
    Navigation
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
#app {
  font-family: Roboto, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
}
/* .v-btn--active {
  background-color: cyan;
} */
</style>

