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
        <v-tab :href="`#Описание`">Описание</v-tab>
        <v-tab :href="`#Карта`">Локация</v-tab>
        <v-tab :href="`#Обсуждение`">Обсуждение</v-tab>
      </v-tabs>
      <v-tabs-items v-model="model">
        <v-tab-item :value="`Описание`">
          <v-card flat>
            <v-card-text v-text="event.description"></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="`Карта`">
          <v-card flat>
            <v-layout row justify-center>
              <mapa :markerName="event.place.name" :markerLat="event.place.location.coordinates[0]" :markerLng="event.place.location.coordinates[1]"></mapa>
            </v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item :value="`Обсуждение`">
          <v-card flat>
            <v-card-text v-text="event.description">
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <!-- </v-card> -->
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
import Mapa from "./Map";
export default {
  name: "showing",
  components: {
    Mapa
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
      eve: {}
    };
  },
  methods: {
    async getEve() {
const id = this.$route.params.id;
      if (id.length) {
        try {
          const event = await this.$store.dispatch("getUserByID", id);
          this.eve = event;
        } catch (error) {
          console.log(error);
          this.error = error;
        }
      }
    }
  },
  mounted() {
    if (this.event)
      this.eve = this.event;
    else
      this.getEve();
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