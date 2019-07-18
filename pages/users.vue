<template>
  <div>
    Users
    <div v-for="(user, key) in listUsers" :key="key">
      <div>name: {{user.name}}
        <md-button class="md-raised md-primary" @click="newChannel(user.id)">
          <md-icon>comment</md-icon>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Emit, Vue} from 'nuxt-property-decorator';
  import {State, Action} from 'vuex-class';

  @Component({})
  export default class Users extends Vue {
    @Action('users/getUsersFront') actionsGetUsers: any;
    @Action('channels/createChannel') actionsNewChannel: any;

    created() {
      this.actionsGetUsers();
    }

    @State(state => state.users.list)
    listUsers!: any[];

    @Emit()
    newChannel(id) {
      this.$router.push(`/channel/${id}`);
    }
  }
</script>
