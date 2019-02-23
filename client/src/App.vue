<template>
  <v-app>
    <v-toolbar app clipped-right>
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-btn flat to="/">
                <span class="mr-2">Home</span>
              </v-btn>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-btn flat to="/about">
                <span class="mr-2">About</span>
              </v-btn>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">
          <span class="mr-2">Home</span>
        </v-btn>
        <v-btn flat to="/about">
          <span class="mr-2">About</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
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
.v-btn--active {
  background-color: cyan;
}
</style>

