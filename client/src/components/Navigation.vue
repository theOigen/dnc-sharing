<template>
  <v-toolbar app clipped-right>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile v-if="!$store.state.auth.loggedInUser">
          <v-list-tile-content>
            <v-btn flat to="/login">
              <span class="mr-2">Вход</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!$store.state.auth.loggedInUser">
          <v-list-tile-content>
            <v-btn flat to="/register">
              <span class="mr-2">Регистрация</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn
              flat
              :to="{ name: 'profile', params: { id: loggedInUser._id, usr: loggedInUser } }"
              v-if="$store.state.auth.loggedInUser"
            >
              <span class="mr-2">Профиль</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile>
          <v-list-tile-content>
            <v-btn flat to="/about">
              <span class="mr-2">О проекте</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile>
          <v-list-tile-content>
            <v-btn flat v-if="$store.state.auth.loggedInUser" to="/logout">
              <span class="mr-2">Выйти</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/" class="toolbar-title">
        <span class="title">ШЕСТНАДЦАТЬ НА ДЕВЯТЬ</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/login" v-if="!$store.state.auth.loggedInUser">
        <span class="mr-2">Вход</span>
      </v-btn>
      <v-btn flat to="/register" v-if="!$store.state.auth.loggedInUser">
        <span class="mr-2">Регистрация</span>
      </v-btn>
      <v-btn
        flat
        :to="{ name: 'profile', params: { id: loggedInUser._id, usr: loggedInUser } }"
        v-if="$store.state.auth.loggedInUser"
      >
        <span class="mr-2">Профиль</span>
      </v-btn>
      <!-- <v-btn flat to="/about">
        <span class="mr-2">О проекте</span>
      </v-btn> -->
      <v-btn flat v-if="$store.state.auth.loggedInUser" to="/logout">
        <span class="mr-2">Выйти</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.state.auth.loggedInUser;
    }
  }
};
</script>


<style lang="css">
.toolbar-title {
  text-decoration: none;
  color: inherit;
}
</style>