<template>
  <v-container>
    <v-layout justify-center>
      <h1 align="center">{{user.login}} profile</h1>
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
        fullname: this.user.fullname
      };
    } else {
      this.getUser();
    }
  },
  methods: {
    editUser() {
      this.beforeEditCache = {
        login: this.user.login,
        fullname: this.user.fullname
      };
      this.editing = true;
    },
    cancelEdit() {
      this.user.login = this.beforeEditCache.login;
      this.user.fullname = this.beforeEditCache.fullname;
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
      if (
        (this.user.login !== this.beforeEditCache.login ||
          this.user.fullname !== this.beforeEditCache.fullname ||
          this.newAva) &&
        !this.errors.any()
      ) {
        try {
          this.isLoading = true;
          const formData = new FormData();
          if (this.newAva) formData.append("image", this.newAva);
          formData.append("login", this.user.login);
          formData.append("fullname", this.user.fullname);
          const updated = await this.$store.dispatch("updateUser", {
            userId: this.user._id,
            formData
          });
          if (updated.avaUrl !== this.user.avaUrl)
            this.user.avaUrl = updated.avaUrl;
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
    async "user.login"(value) {
      if (
        !this.errors.has("login") &&
        value !== this.beforeEditCache.login &&
        value.length !== 0
      ) {
        try {
          const isExist = await this.$store.dispatch("isUsernameExist", value);
          if (isExist) {
            const field = this.$validator.fields.find({ name: "login" });
            field.setFlags({ invalid: true });
            this.errors.add({
              field: "login",
              msg: "Sorry, but this username already exists",
              id: field.id,
              scope: field.scope
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    $route(to, from) {
      this.getUser();
    }
  }
};
</script>

<style>
</style>


