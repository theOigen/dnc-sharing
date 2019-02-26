<template>
  <v-container>
    <!-- <v-container> -->
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <span class="font-weight-light display-4">16:9</span>
      </v-flex>
      <v-flex xs12>
        <span class="title">Сервис для тех, кому не по нраву повестка дня в кинотеатре</span>
      </v-flex>
    </v-layout>
    <!-- </v-container> -->
    <v-layout row>
      <!-- <v-flex class="pa-3 m-4" md12> -->
      <v-text-field
        class="mx-3"
        flat
        label="Search"
        prepend-inner-icon="search"
        clearable
        clear-icon
        xs10
        md10
        v-model.trim="filters"
      ></v-text-field>
      <v-btn @click="filterSearch" xs2 md2 class="my-3" icon small>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn xs2 md2 class="my-3" icon small to="/newShowing">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- <input type="text" placeholder="search by tags"> -->
      <!-- </v-flex> -->
    </v-layout>
    <v-flex xs12 mb-2 v-for="event in array" :key="event._id">
      <v-card>
        <v-layout row>
          <v-flex xs4 sm3 md2 mt-1 mb-1 class="scr-img-wrap">
            <v-img :src="event.avaUrl" class="screening_img" contain aspect-ratio="1.75" left></v-img>
          </v-flex>
          <v-flex xs8 sm9 md10>
            <v-card-title class="custom_title">
              <div>
                <div class="headline">
                  <router-link
                    class="eventTitle"
                    :to="{name: 'showing', params: {event: event, id: event._id}}"
                  >{{event.title}}</router-link>
                </div>
              </div>
            </v-card-title>
            <div class="title custom_title">Создатель: {{event.author.login}}</div>
            <div class="title custom_title">Место: {{event.place.name}}</div>
            <div class="screening-desc">{{event.description}}</div>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3 ml-2">
          Тэги:
          <span class="tag" v-for="tag in event.keywords" :key="tag">{{tag}}</span>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 mb-4>
        <v-layout justify-center>
          <v-pagination v-model="page" :length="pages" total-visible="7" @input="changePage"></v-pagination>
        </v-layout>
      </v-flex>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      filters: "",
      array: [],
      page: 1,
      pages: 0
    };
  },
  async created() {
    try {
      const result = await this.$store.dispatch("getEvents", {
        page: 1,
        per_page: 5,
        filters: ""
      });
      this.array = result.data;
      this.page = result.page;
      this.pages = result.maxPage;
    } catch (err) {
      console.error(err);
    }
  },
  // watch: {
  //   // эта функция запускается при любом изменении вопроса
  //   filters: function (newFilt) {
  //     this.filterSearch(newFilt);
  //   }
  // },
  methods: {
    async filterSearch() {
      try {
        const result = await this.$store.dispatch("getEvents", {
          page: 1,
          per_page: 5,
          filters: this.filters
        });
        this.array = result.data;
      } catch (err) {
        console.error(err);
      }
    },
    async changePage() {
      console.log(this.page);
      try {
      const result = await this.$store.dispatch("getEvents", {
        page: 1,
        per_page: 5,
        filters: this.filters
      });
      this.array = result.data;
      this.page = result.page;
      this.pages = result.maxPage;
    } catch (err) {
      console.error(err);
    }
    }
  }
};
</script>

<style>
.poster {
  max-height: 200px;
  max-width: 200px;
}
.custom_title {
  padding: 5px;
}
.tag {
  margin: 3px;
}
.screening-desc {
  overflow-wrap: break-word;
  padding: 5px;
  font-size: 15px;
}
.scr-img-wrap {
  vertical-align: middle;
}
.eventTitle {
  text-decoration: none;
  color: inherit;
}
.screening_img {
  height: 200px;
  /* width: 200px; */
}
</style>
