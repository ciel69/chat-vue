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
            />
          </div>
        </v-flex>
        <v-flex xs12>
          <div :class="getValidationClass('password')">
            <v-text-field
              v-model="password"
              type="password"
              name="password"
              label="Пароль"
              required
              :disabled="sending"
            />
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn type="submit" color="primary" :disabled="sending">
            Авторизоваться
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';

@Component
export default class LoginForm extends Vue {
  sending: boolean = false;

  created() {
  }

  get login(): string {
    return 'test';
  }

  set login(value) {
    // eslint-disable-next-line no-console
    console.log('login', value);
  }

  get password(): string {
    return 'test';
  }

  set password(value) {
    // eslint-disable-next-line no-console
    console.log('password', value);
  }

  loginUser(): void {
    // eslint-disable-next-line no-console
    console.log('loginUser');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getValidationClass(fieldName: string) {
    return {'md-invalid': false};
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
