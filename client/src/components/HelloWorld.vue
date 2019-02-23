<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex md5 xs4>
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"></v-img>
      </v-flex>
      <v-flex xs3>
        <v-layout justify-center column fill-height>
          <v-flex order-md2 order-xs1>
            <v-card dark tile flat color="error">
              <v-card-text>THIS IS TEST!!!</v-card-text>
            </v-card>
          </v-flex>
          <v-flex order-md1 order-xs2 hidden-md-and-down>
            <v-card dark tile flat color="red darken-4">
              <v-card-text>dasdsad
                <v-icon>mdi-send</v-icon>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3 offset-xs1 style="background-color:black; color:white">
        <v-layout justify-center>THIS IS TEST!!!</v-layout>
      </v-flex>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Vuetify</h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >{{ next.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >{{ eco.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-4>
        <v-layout justify-center>
          <v-pagination v-model="page" :length="15" total-visible="7" @input="changePage"></v-pagination>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      ecosystem: [
        {
          text: "vuetify-loader",
          href: "https://github.com/vuetifyjs/vuetify-loader"
        },
        {
          text: "github",
          href: "https://github.com/vuetifyjs/vuetify"
        },
        {
          text: "awesome-vuetify",
          href: "https://github.com/vuetifyjs/awesome-vuetify"
        }
      ],
      importantLinks: [
        {
          text: "Documentation",
          href: "https://vuetifyjs.com"
        },
        {
          text: "Chat",
          href: "https://community.vuetifyjs.com"
        },
        {
          text: "Made with Vuetify",
          href: "https://madewithvuetifyjs.com"
        },
        {
          text: "Twitter",
          href: "https://twitter.com/vuetifyjs"
        },
        {
          text: "Articles",
          href: "https://medium.com/vuetify"
        }
      ],
      whatsNext: [
        {
          text: "Explore components",
          href: "https://vuetifyjs.com/components/api-explorer"
        },
        {
          text: "Select a layout",
          href: "https://vuetifyjs.com/layout/pre-defined"
        },
        {
          text: "Frequently Asked Questions",
          href:
            "https://vuetifyjs.com/getting-started/frequently-asked-questions"
        }
      ],
      page: 1
    };
  },
  methods: {
    async changePage(page) {
      // const resp = await axios.get("http://localhost:3000/users");
      // console.log(resp);
      // eslint-disable-next-line
      console.log(page);
    }
  }
};
</script>

<style>
</style>
