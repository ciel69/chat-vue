<template>
  <v-form novalidate class="form-login" @submit.prevent="loginUser">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div :class="getValidationClass('login')">
            <v-text-field
              v-model="login"
              name="login"
              label="Логин"
              required
              :disabled="sending"
            ></v-text-field>
          </div>
        </v-flex>
        <v-flex xs12>
          <div :class="getValidationClass('password')">
            <v-text-field
              type="password"
              v-model="password"
              name="password"
              label="Пароль"
              required
              :disabled="sending"
            ></v-text-field>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn type="submit" color="primary" small :disabled="sending">Авторизоваться</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
  import {
    Component,
    Emit,
    Inject,
    Vue
  } from 'nuxt-property-decorator'
  import {State, Action} from 'vuex-class'


  @Component
  export default class LoginForm extends Vue {

    sending: boolean = false;
    errors: any;

    created() {
    }

    get login(): string {
      return 'test'
    }

    set login(value) {
      console.log('login', value);
    }

    get password(): string {
      return 'test'
    }

    set password(value) {
      console.log('password', value);
    }

    @Emit()
    loginUser(): void {
      console.log('loginUser');
    }

    getValidationClass(fieldName: string) {
      return {'md-invalid': false}
    }
  }
</script>

<style lang="scss" scoped>
  .form-login {
    .v-btn {
      margin: 0;
    }
  }
</style>
