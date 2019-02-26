<template>
  <v-layout row>
    <v-flex xs12 sm10 order-xs2 style="position: relative;">
      <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer">
        <message :messages="messages" @imageLoad="scrollToEnd"></message>
      </div>
      <emoji-picker :show="emojiPanel" @close="toggleEmojiPanel" @click="addMessage"></emoji-picker>
      <div class="typer">
        <input
          type="text"
          placeholder="Type here..."
          v-on:keyup.enter="sendMessage"
          v-model="content"
        >
        <v-btn icon class="blue--text emoji-panel" @click="toggleEmojiPanel">
          <v-icon>mood</v-icon>
        </v-btn>
      </div>
    </v-flex>
    <v-flex sm2 order-xs1 class="scrollable">
      <chats></chats>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>

<style lang="css">
</style>
