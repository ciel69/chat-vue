<template>
  <v-layout class="users-list" row>
    <v-flex xs12>
      <v-list subheader>
        <v-list-item
          v-for="(user, key) in listUsers"
          :key="key"
          avatar
          ripple
          @click="actionsNewChannel(user.id)"
        >
          <v-list-item-avatar>
            <img src="https://placeimg.com/40/40/people/1" alt="ava"/>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="user.firstName"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon color="grey">chat_bubble</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'nuxt-property-decorator';
  import {State, Action} from 'vuex-class';

  import {User} from '~/model';

  @Component
  export default class AllListUser extends Vue {

    @State(state => state.users.list)
    listUsers: User[];

    @Action('channels/createChannel')
    actionsNewChannel: any;
  }
</script>

<style lang="scss" scoped>
.users-list {
  margin: 0;
  overflow: auto;
  max-height: 88vh;
  .v-list {
    background: transparent;
  }
}
</style>
