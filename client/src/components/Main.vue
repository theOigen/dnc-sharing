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
      ></v-text-field>
      <v-btn xs2 md2 class="my-3" icon small to="/newShowing">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- <input type="text" placeholder="search by tags"> -->
      <!-- </v-flex> -->
    </v-layout>
    <v-flex xs12 mb-2 v-for="item in array" :key="item.id">
      <v-card>
        <v-layout row>
          <v-flex xs4 sm3 md2 mt-1 mb-1 class="scr-img-wrap">
            <v-img
              src="https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg"
              class="screening_img"
              contain
              aspect-ratio="1.75"
              left
            ></v-img>
          </v-flex>
          <v-flex xs8 sm9 md10>
            <v-card-title class="custom_title">
              <div>
                <div class="headline">Показ к/ф Blade Runner 2049</div>
              </div>
            </v-card-title>
            <div class="title custom_title">Создатель: John Doe</div>
            <div
              class="screening-desc"
            >Officer K (Ryan Gosling), a new blade runner for the Los Angeles Police Department, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. His discovery leads him on a quest to find Rick Deckard (Harrison Ford), a former blade runner who's been missing for 30 years.</div>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3 ml-2">Тэги: #sci-fi #bladerunner #gosling #ford</v-card-actions>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      array: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        }
      ]
    };
  },
  methods: {}
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
.screening-desc {
  overflow-wrap: break-word;
  padding: 5px;
  font-size: 15px;
}
.scr-img-wrap {
  vertical-align: middle;
}
.screening_img {
  height: 200px;
  /* width: 200px; */
}
</style>
