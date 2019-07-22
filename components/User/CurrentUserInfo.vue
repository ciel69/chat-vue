<template>
  <v-layout
    class="v-chat__current-user-info current-user-info"
    align-center
    row
    spacer
  >
    <v-flex xs4 sm2>
      <v-avatar
        size="36px"
      >
        <img
          src="https://placeimg.com/40/40/people/1"
          alt="Avatar"
        >
      </v-avatar>
    </v-flex>

    <v-flex>
      <strong>{{userName}}</strong>
    </v-flex>
    <v-flex xs2>
      <v-speed-dial
        v-model="fab"
        :direction="direction"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="white"
            outline
            small
            dark
            fab
          >
            <v-icon dark>list</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="primary"
          @click="handleEdit"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
          @click="handleExit"
        >
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Emit} from 'nuxt-property-decorator';
  import {State, Action} from 'vuex-class';

  import {VueNuxt, IUser} from '~/types'

  @Component
  export default class CurrentUserInfo extends VueNuxt {
    direction: string = 'bottom';
    fab: boolean = false;
    transition: string = 'slide-y-reverse-transition';

    @State(state => state.user) currentUser: IUser;

    @Action('user/logout') userLogout: any;

    get userName() {
      return this.currentUser && this.currentUser.firstName || 'Имя не указано'
    }

    @Emit()
    handleEdit() {
      console.log('handleEdit');
    }

    @Emit()
    handleExit() {
      this.userLogout();
    }

  }
</script>

<style lang="scss">
  .current-user-info {
    padding: 0 16px;

    .v-speed-dial {
      float: right;
      bottom: 0 !important;

      .v-btn__content {
        height: 18px;
        margin-left: -1px;
      }
    }
  }
</style>
