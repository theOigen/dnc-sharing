<template>
  <v-container>
    <v-layout justify-center mt-2>
      <span class="display-1">Есть что предложить?</span>
    </v-layout>
    <v-layout justify-center ma-2 pa-4>
      <form class="nshow_form">
        <v-text-field
          v-model.trim="title"
          v-validate="{ required: true, max: 64, min: 5 }"
          name="title"
          :counter="64"
          label="Название показа"
          :error-messages="errors.collect('title')"
          solo
        ></v-text-field>
        <v-text-field
          v-model.trim="keywords"
          v-validate="{ required: true, max: 100, min: 6 }"
          :counter="100"
          :error-messages="errors.collect('keywords')"
          label="Теги для показа. Вводятся через пробел"
          name="keywords"
          solo
        ></v-text-field>
        <v-textarea
          solo
          no-resize
          label="Описание показа. Постарайтесь кратко, но информативно описать его суть"
          v-model.trim="description"
          v-validate="{ max: 200, required: true }"
          name="desc"
          :error-messages="errors.collect('desc')"
          :counter="200"
        ></v-textarea>
        <v-layout row justify-center mb-2>
          <input
            type="file"
            ref="file"
            name="file"
            id="file-2"
            v-validate="{ required: true, mimes: ['image/png', 'image/jpeg'], size: 10240 }"
            data-vv-as="file"
            @change="handleFileUpload()"
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
        </v-layout>
        <v-layout row justify-center>
          <v-btn @click="createShowing" :disabled="buttonActive">Создать</v-btn>
        </v-layout>
      </form>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      keywords: "",
      description: "",
      file: null,
      isLoading: false
    };
  },
  computed: {
    buttonActive() {
      return (
        this.errors.any() ||
        !this.title.length ||
        !this.keywords.length ||
        !this.file ||
        !this.description.length
      );
    }
  },
  methods: {
    clearAll() {
      this.title = "";
      this.keywords = "";
      this.description = "";
      this.$refs.fileSpan.innerText = "Choose a file...";
      this.file = null;
    },
    async createShowing() {
      if (
        this.title.length &&
        this.keywords.length &&
        this.description.length &&
        this.file &&
        !this.errors.any()
      ) {
        try {
          this.isLoading = true;
          const formData = new FormData();
          formData.append("description", this.description);
          formData.append("title", this.title);
          formData.append("keywords", this.keywords);
          formData.append("ava", this.file);
          await this.$store.dispatch("createShowing", formData);
          this.$router.push("/");
          this.clearAll();
        } catch (error) {
          this.error = error;
        }
        this.isLoading = false;
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      if (this.file) {
        this.$refs.fileSpan.innerText = this.file.name;
      } else {
        this.$refs.fileSpan.innerText = "Choose a file...";
      }
    }
  }
};
</script>

<style lang="css">
.nshow_form {
  width: 650px;
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + label {
  max-width: 180px;
  margin-top: 5px;
  font-size: 15px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 4px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.inputfile:focus + label,
.inputfile.has-focus + label {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
}
.inputfile + label svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  margin-top: -4px;
  margin-right: 4px;
}
.inputfile-2 + label {
  color: #1c1f22;
  border: 1px solid currentColor;
}
.inputfile-2:focus + label,
.inputfile-2.has-focus + label,
.inputfile-2 + label:hover {
  background-color: #1f1f1f;
  color: #f0f0f0;
}
</style>
