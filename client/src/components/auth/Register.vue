<template>
  <v-container>
    <v-layout justify-center mt-2>
      <span class="display-1">Регистрация</span>
    </v-layout>
    <v-layout justify-center ma-2 pa-4>
      <form class="sign_form">
        <v-text-field
          v-model.trim="login"
          v-validate="{ required: true, max: 16, min: 5, regex: /^[a-zA-Z0-9_]+$/ }"
          name="login"
          :counter="16"
          label="Логин"
          :error-messages="errors.collect('login')"
          solo
        ></v-text-field>
        <v-text-field
          v-model.trim="password"
          v-validate="{ required: true, min: 6, regex: /^\S+$/ }"
          :error-messages="errors.collect('password')"
          label="Пароль"
          type="password"
          name="password"
          solo
        ></v-text-field>
        <v-text-field
          v-model.trim="password_2"
          v-validate="{ required: true, confirmed:password, min: 6, regex: /^\S+$/ }"
          :error-messages="errors.collect('password_2')"
          name="password_2"
          data-vv-as="password"
          placeholder="Your password again"
          label="Повторите пароль"
          type="password"
          solo
        ></v-text-field>
        <v-layout row justify-center>
          <v-btn @click="logIn" :disabled="buttonActive">Зарегистрироваться</v-btn>
          <v-btn @click="googleLogin" :disabled="this.isLoading">
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </v-layout>
      </form>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      login: "",
      password: "",
      password_2: "",
      error: "",
      isLoading: false
    };
  },
  beforeDestroy() {
    this.login = "";
    this.password = "";
    this.password_2 = "";
    this.error = "";
    this.isLoading = false;
  },
  computed: {
    loggedInUser() {
      return this.$store.state.auth.loggedInUser;
    },
    buttonActive() {
      return (
        this.isLoading ||
        this.errors.any() ||
        !this.login.length ||
        !this.password.length ||
        !this.password_2.length
      );
    }
  },
  methods: {
    async logIn() {
      // eslint-disable-next-line
      this.isLoading = true;
      let result = await this.$store.dispatch("fetchRegister", {
        password: this.password,
        username: this.login
      });
      console.log(result);

      this.isLoading = false;
      if (result.user) this.$router.push("/");

      console.log("sdasds");
    },
    async googleLogin() {
      try {
        const googleUser = await this.$gAuth.signIn();
        // eslint-disable-next-line
        console.log("USER: ", googleUser);
        const googleProf = googleUser.getBasicProfile();
        // eslint-disable-next-line
        console.log(
          googleProf.getId(),
          googleProf.getName(),
          googleProf.getImageUrl(),
          googleProf.getEmail()
        );

        const email = googleProf.getEmail();
        const atIndex = email.indexOf("@");
        const username = email.substring(
          0,
          atIndex != -1 ? atIndex : email.length
        );
        console.log(username);
        this.isLoading = true;

        const result = await this.$store.dispatch("fetchOauth", {
          googleId: googleProf.getId(),
          username: username,
          fullname: googleProf.getName(),
          ava_url: googleProf.getImageUrl()
        });

        this.isLoading = false;

        console.log(this.loggedInUser);

        //if(result.err)
        if (this.loggedInUser) this.$router.push("/");
      } catch (error) {
        //
      }
    }
  }
};
</script>

<style lang="css">
.sign_form {
  width: 700px;
  /* justify-content: center; */
}
</style>