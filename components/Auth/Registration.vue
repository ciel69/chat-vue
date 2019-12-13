<template>
  <v-form novalidate class="form-reg" @submit.prevent="regUser" data-vv-scope="form-reg">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <div :class="getValidationClass('name')">
            <v-text-field
              v-model="firstName"
              v-validate="'required'"
              name="firstName"
              label="Имя"
              required
              :disabled="sending"
            ></v-text-field>
            <span class="md-error">{{ errors.first('firstName') }}</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <div :class="getValidationClass('lastName')">
            <v-text-field
              v-model="lastName"
              name="lastName"
              label="Фамилия"
              :disabled="sending"
            ></v-text-field>
            <span class="md-error">{{ errors.first('lastName') }}</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <div :class="getValidationClass('login')">
            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              data-vv-as="email"
              name="email"
              label="Email"
              required
              :disabled="sending"
            ></v-text-field>
            <span class="md-error">{{ errors.first('email') }}</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <div :class="getValidationClass('regPassword')">
            <v-text-field
              ref="regPassword"
              type="password"
              v-model="regPassword"
              v-validate="'required|min:5'"
              name="regPassword"
              label="Пароль"
              required
              :disabled="sending"
            ></v-text-field>
            <span class="md-error">{{ errors.first('regPassword') }}</span>
          </div>
        </v-flex>
        <v-flex xs12 class="md-layout-item md-small-size-100">
          <div :class="getValidationClass('passwordConfirmation')">
            <v-text-field
              type="password"
              v-model="passwordConfirmation"
              v-validate="'required|confirmed:regPassword'"
              name="passwordConfirmation"
              label="Подтвердите пароль"
              required
              :disabled="sending"
            ></v-text-field>
            <span class="md-error">{{ errors.first('passwordConfirmation') }}</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-btn type="submit" color="primary" small :disabled="sending">Регистрация</v-btn>
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

  import russian from 'vee-validate/dist/locale/ru';


  @Component
  export default class Registration extends Vue {

    @State(state => state.form.registration.error) errorForm!: boolean;

    @Inject() $validator!: any;

    @Action('form/registration/changeField') changeField: any;
    @Action('form/registration/sendReg') actionRegSend: any;

    sending: boolean = false;
    errors: any;

    created() {
      this.$validator.localize('ru', {
        messages: russian.messages,
        attributes: {
          firstName: 'имя',
          lastName: 'фамилия',
          login: 'логин',
          regPassword: 'пароль',
          password_confirmation: 'подтвердите пароль'
        }
      });
    }

    get firstName() {
      return this.$store.state.form.registration.firstName
    }
    set firstName(value) {
      this.changeField({name: 'firstName', value})
    }

    get lastName() {
      return this.$store.state.form.registration.lastName
    }
    set lastName(value) {
      this.changeField({name: 'lastName', value})
    }

    get login() {
      return this.$store.state.form.registration.login
    }
    set login(value) {
      this.changeField({name: 'login', value})
    }

    get email() {
      return this.$store.state.form.registration.email
    }
    set email(value) {
      this.changeField({name: 'email', value})
    }

    get regPassword() {
      return this.$store.state.form.registration.password
    }
    set regPassword(value) {
      this.changeField({name: 'password', value})
    }

    get passwordConfirmation() {
      return this.$store.state.form.registration.passwordConfirmation
    }
    set passwordConfirmation(value) {
      this.changeField({name: 'passwordConfirmation', value})
    }

    @Emit()
    regUser() {
      console.log('regUser');
      this.$validator.validateAll('form-reg').then((result) => {
        if (result) {
          this.actionRegSend({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            login: this.login,
            password: this.regPassword
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
.form-reg {
  .v-btn {
    margin: 0;
  }
}
</style>
