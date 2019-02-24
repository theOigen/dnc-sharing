<template>
  <v-container>
    <v-layout justify-center>
      <h1 align="center">{{user.login}}</h1>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs6>
        <v-layout row justify-end mx-2>
          <v-layout column>
            <v-flex align-self-end>
              <v-avatar size="200">
                <img :src="user.ava_url" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex align-self-end v-if="editing">
              <input
                v-validate="{ mimes: ['image/png', 'image/jpeg'], size: 10240 }"
                data-vv-as="file"
                name="file"
                type="file"
                ref="file"
                id="file-2"
                @change="handleFileUpload()"
                @keyup.esc="cancelEdit"
                accept="image/png, image/jpeg"
                class="inputfile inputfile-2"
              >
              <label for="file-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                  <path
                    d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
                  ></path>
                </svg>
                <span ref="fileSpan">Choose a file&hellip;</span>
              </label>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-flex>
      <v-flex xs8>
        <v-layout column mt-4>
          <v-layout row class="user-info">
            <v-flex xs6 md3>
              <label for="username" style="font-weight:bold">Юзернейм:</label>
            </v-flex>
            <v-flex xs7>
              <label>{{user.login}}</label>
            </v-flex>
          </v-layout>
          <v-layout row class="user-info">
            <v-flex xs7 md3>
              <label for="fullname" style="font-weight:bold">Полное имя:</label>
            </v-flex>
            <v-flex xs5>
              <label v-if="!editing">{{user.fullname}}</label>
              <v-text-field
                v-else
                id="fullname"
                v-model.trim="user.fullname"
                v-validate="{ required: true, max: 32, min: 5, regex: /^[а-яА-ЯёЁa-zA-Z\s]+$/ }"
                name="fullname"
                :counter="16"
                :error-messages="errors.collect('fullname')"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="user-info">
            <v-flex xs7 md3>
              <label for="username" style="font-weight:bold">Био:</label>
            </v-flex>
            <v-flex xs5>
              <v-textarea no-resize solo :readonly="!editing" v-model.trim="user.description"></v-textarea>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-btn @click="editUser()" :disabled="isLoading" v-if="!editing">Edit</v-btn>
      <v-btn @click="finishEdit()" v-if="editing" :disabled="buttonActive">Finish</v-btn>
      <v-btn @click="cancelEdit()" v-if="editing">Cancel</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  name: "profile",
  props: {
    usr: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      user: {},
      beforeEditCache: {},
      accountOwner: false,
      editing: false,
      isLoading: false,
      newAva: "",
      error: ""
    };
  },
  computed: {
    buttonActive() {
      return this.errors.any() || !this.user.fullname.length;
    }
  },
  mounted() {
    console.log(this.usr, this.id);
    if (this.usr) {
      this.user = this.usr;
      this.isLoading = false;
      this.error = "";
      this.accountOwner =
        this.$store.state.auth.loggedInUser._id === this.user._id;
      this.beforeEditCache = {
        login: this.user.login,
        fullname: this.user.fullname,
        description: this.user.description
      };
    } else {
      this.getUser();
    }
  },
  methods: {
    editUser() {
      this.beforeEditCache = {
        login: this.user.login,
        fullname: this.user.fullname,
        description: this.user.description
      };
      this.editing = true;
    },
    cancelEdit() {
      this.user.login = this.beforeEditCache.login;
      this.user.fullname = this.beforeEditCache.fullname;
      this.user.description = this.beforeEditCache.description;
      this.newAva = "";
      this.editing = false;
    },
    handleFileUpload() {
      this.newAva = this.$refs.file.files[0];
      if (this.newAva) {
        this.$refs.fileSpan.innerText = this.newAva.name;
      } else {
        this.$refs.fileSpan.innerText = "Choose a file...";
      }
    },
    async finishEdit() {
      this.editing = false;
      console.log(this.user);
      console.log(this.beforeEditCache);
      if (
        (this.user.fullname !== this.beforeEditCache.fullname ||
          this.newAva ||
          this.user.description !== this.beforeEditCache.description) &&
        !this.errors.any()
      ) {
        try {
          this.isLoading = true;
          const response = await this.$store.dispatch("fetchUserUpdate", {id: this.user._id, fullname : this.user.fullname, description: this.user.description, ava: this.newAva });
          const updated = response.user;
          console.log(updated);
          if (updated.ava_url !== this.user.ava_url)
            this.user.ava_url = updated.ava_url;
        } catch (error) {
          console.log(error);
        }
        this.isLoading = false;
      }
    },
    async getUser() {
      const id = this.$route.params.id;
      if (id.length) {
        try {
          const user = await this.$store.dispatch("getUserByID", id);
          this.error = "";
          this.isLoading = false;
          this.user = user;
          this.accountOwner = this.$store.state.user._id === this.user._id;
          this.beforeEditCache = {
            login: this.user.login,
            fullname: this.user.fullname,
            bio: this.user.bio,
            role: this.user.role
          };
        } catch (error) {
          console.log(error);
          this.error = error;
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getUser();
    }
  }
};
</script>

<style>
.user-info {
  font-size: 20px;
  margin-top: 10px;
}
</style>


