<template>
  <v-app dark>
    <v-container grid-list-md>
      <v-layout row justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <nuxt/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'nuxt-property-decorator';

  @Component
  export default class Auth extends Vue {

  }
</script>

<style lang="scss">
  @import 'material-design-icons/iconfont/material-icons.css';
  @import '~/assets/customVuetify.scss';

  .page-container {
    height: 100vh;
    display: flex;

    .md-app {
      width: 100%;
    }
  }
</style>
