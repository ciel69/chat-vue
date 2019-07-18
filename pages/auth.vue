<template>
  <section class="auth-page">
    <v-tabs
      v-model="active"
      color="cyan"
      dark
      slider-color="yellow"
    >
      <v-tab
        ripple
      >
        Авторизация
      </v-tab>
      <v-tab
        ripple
      >
        Регистрация
      </v-tab>
      <v-tab-item >
        <v-card flat>
          <v-card-text>
            <Login/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item >
        <v-card flat>
          <v-card-text>
            <Registration/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </section>
</template>

<script lang="ts">
  import {
    Component
  } from 'nuxt-property-decorator'

  import {VueNuxt} from '~/types';

  import Login from '~/components/Auth/Login';
  import Registration from '~/components/Auth/Registration';


  @Component({
    layout() {
      return 'auth';
    },
    components: {
      Login,
      Registration,
    }
  })
  export default class AuthPage extends VueNuxt {
    active: number = null;
  }
</script>

<style lang="scss" scoped>
  .auth-page {
    .v-tabs {
      overflow: hidden;
    }
  }
</style>
