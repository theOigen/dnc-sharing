<template>
  <v-toolbar app clipped-right>
    <v-menu class="hidden-md-and-up">
      <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn flat to="/events">
              <span class="mr-2">События</span>
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-btn flat to="/about">
              <span class="mr-2">О проекте</span>
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
      <v-btn flat to="/events">
        <span class="mr-2">Показы</span>
      </v-btn>
      <v-btn flat to="/about">
        <span class="mr-2">О проекте</span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style lang="css">
.toolbar-title {
  text-decoration: none;
  color: inherit;
}
</style>