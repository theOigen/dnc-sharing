<template>
  <v-container>
    <v-layout justify-center column>
      <v-flex text-xs-center>
        <v-avatar size="250">
          <v-img :src="eve.avaUrl"></v-img>
        </v-avatar>
      </v-flex>
      <v-tabs slot="extension" v-model="model" centered slider-color="yellow">
        <v-tab :href="`#Описание`">Описание</v-tab>
        <v-tab :href="`#Карта`">Локация</v-tab>
        <v-tab :href="`#Обсуждение`">Обсуждение</v-tab>
      </v-tabs>
      <v-tabs-items v-model="model">
        <v-tab-item :value="`Описание`">
          <v-card flat>
            <v-card-text v-text="'Назвние показа: ' + eve.title"></v-card-text>
            <v-card-text v-text="'Дата показа: ' + eve.data"></v-card-text>
            <v-card-text v-text="eve.description"></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="`Карта`">
          <v-card flat>
            <v-layout row justify-center>
              <mapa
                :markerName="eve.place.name"
                :markerLat="eve.place.location.coordinates[0]"
                :markerLng="eve.place.location.coordinates[1]"
              ></mapa>
            </v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="`Обсуждение`">
          <v-card flat>
            <v-card-text v-text="'In progress...=)))'"></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import Mapa from "./Map";
import Chat from "./Chat";
export default {
  name: "showing",
  components: {
    Mapa,
    Chat
  },
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
      eve: {},
      model: "tab-2"
    };
  },
  methods: {
    async getEve() {
      const id = this.$route.params.id;
      if (id.length) {
        try {
          const event = await this.$store.dispatch("getEvent", id);
          this.eve = event;
        } catch (error) {
          console.log(error);
          this.error = error;
        }
      }
    }
  },
  mounted() {
    if (this.event) this.eve = this.event;
    else this.getEve();
  },
  whatch: {
    $route(to, from) {
      this.getEve();
    }
  }
};
</script>

<style lang="css">
</style>