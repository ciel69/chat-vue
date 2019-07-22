<template>
  <v-layout row>
    <v-flex xs12>
      <v-list subheader>
        <v-list-tile
          v-for="(user, key) in listUsers"
          :key="key"
          avatar
          ripple
          @click="actionsNewChannel(user.id)"
        >
          <v-list-tile-avatar>
            <img src="https://placeimg.com/40/40/people/1"/>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="user.firstName"></v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon color="grey">chat_bubble</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component} from 'nuxt-property-decorator';
  import {State, Action} from 'vuex-class';

  import {VueNuxt, IUser} from '~/types';

  @Component
  export default class AllListUser extends VueNuxt {
    @Action('channels/createChannel') actionsNewChannel: any;

    @State(state => state.users.list) listUsers: [IUser];
  }
</script>

<style scoped>

</style>
