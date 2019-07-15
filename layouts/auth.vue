<template>
  <v-app dark>
    <v-container grid-list-md>
      <v-layout row justify-center>
        <v-flex xs4>
          <nuxt/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
  import {Component} from 'nuxt-property-decorator';

  import {VueNuxt} from '~/types'

  @Component
  export default class extends VueNuxt {
  }
</script>

<style lang="scss">
  @import 'material-design-icons/iconfont/material-icons.css';
  @import 'vuetify/dist/vuetify.min.css';

  .page-container {
    height: 100vh;
    display: flex;

    .md-app {
      width: 100%;
    }
  }
</style>
