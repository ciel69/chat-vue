<template>
  <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="loginUser">
    <div class="md-layout-item md-size-30 md-small-size-100 form-auth">
      <div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <div :class="getValidationClass('login')">
              <v-text-field
                v-model="login"
                v-validate="'email'"
                data-vv-as="email"
                name="email"
                label="Email"
                required
                :disabled="sending"
              ></v-text-field>
              <span class="md-error">{{ errors.first('email') }}</span>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100">
            <div :class="getValidationClass('password')">
              <v-text-field
                ref="password"
                type="password"
                v-model="password"
                v-validate="'required|min:5'"
                label="Пароль"
                required
                :disabled="sending"
              ></v-text-field>
              <span class="md-error">{{ errors.first('password') }}</span>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100">
            <div :class="getValidationClass('password')">
              <v-text-field
                type="password"
                v-model="passwordConfirmation"
                v-validate="'required|confirmed:password'"
                name="password_confirmation"
                label="Подтвердите пароль"
                required
                :disabled="sending"
              ></v-text-field>
              <span class="md-error">{{ errors.first('password_confirmation') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <v-btn type="submit" color="primary" small :disabled="sending">Авторизоваться</v-btn>
      </div>
    </div>
  </form>
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
  export default class Registration extends VueNuxt {

    @State(state => state.form.registration.error) errorForm!: boolean;

    @Inject() $validator!: any;

    @Action('form/registration/changeField') changeField: any;
    @Action('form/registration/send') actionRegSend: any;

    sending: boolean = false;
    errors: any;
    passwordConfirmation: string = '';

    created() {
      this.$validator.localize('ru', {
        messages: russian.messages,
        attributes: {
          login: 'логин',
          password: 'пароль',
          password_confirmation: 'подтвердите пароль'
        }
      });
    }

    get login() {
      return this.$store.state.form.registration.login
    }

    set login(value) {
      this.changeField({name: 'login', value})
    }

    get password() {
      return this.$store.state.form.registration.password
    }

    set password(value) {
      this.changeField({name: 'password', value})
    }

    @Emit()
    loginUser() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.actionRegSend({
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

<style scoped>

</style>
