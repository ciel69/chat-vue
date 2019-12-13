<template>
  <section class="auth-page">
    <v-tabs
      v-model="active"
      dark
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
    Component,
    Vue
  } from 'nuxt-property-decorator'

  import Login from '~/components/Auth/Login.vue';
  import Registration from '~/components/Auth/Registration.vue';


  @Component({
    layout() {
      return 'auth';
    },
    components: {
      Login,
      Registration,
    }
  })
  export default class AuthPage extends Vue {
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
