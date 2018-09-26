<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ListMessage />
    <input type="text" v-model="textMessage" />
    <button @click="onEvent">event</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { State, Action } from 'vuex-class'

import ListMessage from '@/components/Chat/ListMessage';

@Component({
    components: {
        ListMessage
    }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  @State(state => state.chat.inputText) inputText!: string;

  @Action chatSendMessage: any;
  @Action chatChangeInput: any;

  get textMessage() {
    return this.inputText
  }
  set textMessage(value: string) {
      this.chatChangeInput(value);
  }

  @Emit()
  onEvent () {
      this.chatSendMessage(this.textMessage);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
