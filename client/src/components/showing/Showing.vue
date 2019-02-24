<template>
  <v-container>
    <v-layout justify-center column>
      <!-- <v-card> -->
      <v-flex text-xs-center>
        <v-avatar size="250">
          <v-img :src="event.avaUrl"></v-img>
        </v-avatar>
      </v-flex>
      <v-tabs slot="extension" v-model="model" centered slider-color="yellow">
        <v-tab v-for="i in 3" :key="i" :href="`#tab-${i}`">Item {{ i }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="model">
        <v-tab-item v-for="i in 3" :key="i" :value="`tab-${i}`">
          <v-card flat>
            <v-card-text v-text="text"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <!-- </v-card> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "showing",
  props: {
    event: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      model: "tab-2",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style lang="css">
</style>