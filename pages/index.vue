<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
          <p>
            For more information on Vuetify, check out the <a
              href="https://vuetifyjs.com"
              target="_blank"
            >
              documentation
            </a>.
          </p>
          <p>
            If you have questions, please join the official <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              title="chat"
            >
              discord
            </a>.
          </p>
          <p>
            Find a bug? Report it on the github <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              title="contribute"
            >
              issue board
            </a>.
          </p>
          <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <b>counter: {{ testModuleInstance.counter }}</b>
          <b>axles: {{ testModuleInstance.axles }}</b>
          <b>wheels: {{ testModuleInstance.wheels }}</b>
          <hr class="my-3">
          <a
            href="https://nuxtjs.org/"
            target="_blank"
          >
            Nuxt Documentation
          </a>
          <br>
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
          >
            Nuxt GitHub
          </a>

          <LoginForm />
          <v-btn
            nuxt
            color="primary"
            @click="loginClick"
          >
            Login
          </v-btn>
          <v-btn
            nuxt
            color="primary"
            @click="logoutClick"
          >
            Logout
          </v-btn>
          <v-btn
            nuxt
            color="primary"
            @click="requestClick"
          >
            Test request
          </v-btn>
          <v-btn
            nuxt
            color="primary"
            @click="handleClickTest"
          >
            Test module
          </v-btn>
          <v-btn
            nuxt
            color="primary"
            @click="handleClickUser"
          >
            Test user
          </v-btn>
          <v-btn
            nuxt
            color="primary"
            @click="testModuleInstance.incrementCounter"
          >
            Increment
          </v-btn>
          <div class="d-flex flex-row-reverse">
            <v-btn
              color="primary"
              nuxt
              to="/inspire"
            >
              Continue
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';

import {Store} from '~/utils/decorators';

import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';
import LoginForm from '~/components/Login.vue';

import TestModule from '~/store/TestModule';
import UserModule from '~/store/UserModule';

@Component({
  components: {
    Logo,
    LoginForm,
    VuetifyLogo
  }
})
export default class IndexPage extends Vue {

  @Store(TestModule)
  testModuleInstance!: TestModule;

  @Store(UserModule)
  userModuleInstance!: UserModule;

  requestClick(): void {
    this.userModuleInstance.testAction();
  }

  logoutClick(): void {
    this.userModuleInstance.onLogout();
  }

  loginClick(): void {
    this.userModuleInstance.onLogin();
  }

  handleClickTest(): void {
    this.testModuleInstance.incrWheels(4);
  }

  handleClickUser(): void {
    this.userModuleInstance.testAction();
  }

};
</script>
