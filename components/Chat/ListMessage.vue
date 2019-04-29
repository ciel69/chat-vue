<template>
  <div>
    <md-list class="md-triple-line list-message">
      <md-list-item class="md-triple-line list-message__item" :class="{'my-message': +userId === +message.user.id}"
                    v-for="(message, key) in listMessage" v-if="message" :key="key">
        <md-avatar>
          <img src="https://placeimg.com/40/40/people/1" alt="People">
        </md-avatar>
        <div class="list-message__text">
          <span class="list-message__user-name">{{uName(message)}}</span>
          <p>{{message.text}}</p>
        </div>
        <md-button class="md-icon-button md-list-action button-star">
          <md-icon>star</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'nuxt-property-decorator';
  import {State, Getter} from 'vuex-class';

  import { IDialog } from "~/types";

  @Component
  export default class ListMessage extends Vue {
    @State(state => state.user.uid) userId!: number;
    // @State(state => state.channels.current) currentDialog!: IDialog;

    @Getter('channels/getChannel') currentDialog!: Function;
    @Getter('channels/getNameCurrentUser') getNameCurrentUser;


    get listMessage(): IDialog {
      return this.currentDialog(this.$route.params.id);
    }

    uName(message) {
      const channelId = this.$route.params.id;
      return this.getNameCurrentUser(channelId, message.user.id)
    }
  }
</script>

<style lang="scss">
  .list-message {
    &__item {
      &:after {
        content: '';
        display: block;
        height: 1px;
        background: #ccc;
        width: 90%;
        margin: auto;
        margin-bottom: 0;
      }

      &:last-child {
        &:after {
          display: none;
        }
      }

      &:hover {
        .md-button.md-icon-button.button-star {
          opacity: 1;
        }
      }

      &.my-message {
        .md-list-item-content {
          flex-direction: row-reverse;
        }

        .md-avatar {
          margin-right: 0;
          margin-left: 16px;
        }

        .list-message__user-name {
          text-align: right;
        }
      }

      .md-button.md-icon-button.button-star {
        opacity: 0;
        margin: auto;
      }
    }

    &__text {
      display: flex;
      max-width: 80%;
      flex-direction: column;
      white-space: normal;
      flex: 1;
    }
  }
</style>
