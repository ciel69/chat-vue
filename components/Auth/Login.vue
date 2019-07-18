<template>
  <v-form novalidate class="form-login" @submit.prevent="loginUser">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div :class="getValidationClass('login')">
            <v-text-field
              v-model="login"
              v-validate="'required|min:3'"
              name="login"
              label="Логин"
              required
              :disabled="sending"
            ></v-text-field>
            <span class="md-error">{{ errors.first('login') }}</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <div :class="getValidationClass('password')">
            <v-text-field
              type="password"
              v-model="password"
              v-validate="'required|min:5'"
              name="password"
              label="Пароль"
              required
              :disabled="sending"
            ></v-text-field>
            <span class="md-error">{{ errors.first('password') }}</span>
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
  } from 'nuxt-property-decorator'
  import {State, Action} from 'vuex-class'

  import {VueNuxt} from '~/types';

  import russian from 'vee-validate/dist/locale/ru';


  @Component
  export default class LoginForm extends VueNuxt {

    @State(state => state.form.login.error) errorForm!: boolean;

    @Inject() $validator!: any;

    @Action('form/login/changeField') changeField: any;
    @Action('form/login/login') actionUserLogin: any;

    sending: boolean = false;
    errors: any;

    created() {
      this.$validator.localize('ru', {
        messages: russian.messages,
        attributes: {
          login: 'логин',
          password: 'пароль'
        }
      });
    }

    get login() {
      return this.$store.state.form.login.login
    }

    set login(value) {
      this.changeField({name: 'login', value})
    }

    get password() {
      return this.$store.state.form.login.password
    }

    set password(value) {
      this.changeField({name: 'password', value})
    }

    @Emit()
    loginUser() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.actionUserLogin({
            login: this.login,
            password: this.password
          });

          return;
        }
      });
    }

    getValidationClass(fieldName) {
      return {'md-invalid': this.errors.has(fieldName)}
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
