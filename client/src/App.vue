<template>
  <v-app light>
    <div v-if="!isFetchingInitialAuth">
      <navigation></navigation>
      <v-content>
        <router-view></router-view>
      </v-content>
    </div>
    <div class="text-xs-center" v-else>
      <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap align-center>
          <v-flex>
            <v-progress-circular :width="7" :size="70" color="black" indeterminate></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";
/* eslint-disable */
export default {
  name: "App",
  components: {
    Navigation
  },
  async created() {
    const result = await this.$store.dispatch("fetchInitialAuth");
    console.log("ON INITIAL AUTH", result);
  },
  computed: {
    isFetchingInitialAuth() {
      return this.$store.state.auth.isFetchingInitialAuth;
    }
  },
  data() {
    return {
      //
    };
  },
  sockets: {
    connect() {
      if (this.$store.state.user._id) {
        this.$socket.emit("loggedUser", this.$store.state.auth.loggedInUser._id);
      }
    }
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

