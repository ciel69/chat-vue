<template>
  <div class="md-layout-item md-size-45">
    <ListMessage/>
    <form @submit.prevent="sendForm">
      <v-layout>
        <v-flex xs12>
          <v-text-field
            v-model="textMessage"
            label="Введите сообщение"
            required
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn color="primary" small @click="sendForm">
            <v-icon>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </form>
  </div>
</template>

<script lang="ts">
  import {Component, Emit} from 'nuxt-property-decorator';
  import {State, Action} from 'vuex-class';

  import {VueNuxt} from '~/types'

  import ListMessage from '~/components/Chat/ListMessage.vue';

  @Component({
    components: {
      ListMessage,
    },
  })
  export default class Chat extends VueNuxt {
    @State(state => state.channels.inputText) inputText!: string;

    @Action('channels/chatSendMessage') chatSendMessage: any;
    @Action('channels/chatChangeInput') chatChangeInput: any;

    head() {
      return {
        title: 'Чат',

        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description',
          },
        ],
      };
    }

    get textMessage() {
      return this.inputText;
    }

    set textMessage(value: string) {
      this.chatChangeInput(value);
    }

    @Emit()
    sendForm() {
      if (this.textMessage.trim().length > 0) {
        const cid = this.$route.params.id;
        this.chatSendMessage({text: this.textMessage, cid});
      }
    }
  }
</script>

<style scoped lang="scss">
  .custom-input {
    border: 1px solid #ccc;
    height: 40px;
    width: 100%;
  }
</style>
