<template>
  <div></div>
</template>

<script>
/* eslint-disable */
export default {
  created() {
    this.$store.dispatch("logout").then(response => this.$router.push("/"));
  }
};
</script>

<style>
</style>