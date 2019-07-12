<template>
    <section>
        <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="loginUser">
            <div class="md-layout-item md-size-30 md-small-size-100 form-auth">
                <div>
                    <div class="md-title">Авториация</div>
                </div>
                <div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <div :class="getValidationClass('login')">
                                <v-text-field
                                    v-model="login"
                                    v-validate="'required|min:3'"
                                    label="Логин"
                                    required
                                    :disabled="sending"
                                ></v-text-field>
                                <span class="md-error">{{ errors.first('login') }}</span>
                            </div>
                        </div>
                        <div class="md-layout-item md-small-size-100">
                            <div :class="getValidationClass('password')">
                                <v-text-field
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
                    </div>
                </div>

<!--                <md-progress-bar md-mode="indeterminate" v-if="sending" />-->

                <div>
                    <v-btn type="submit" color="primary" small :disabled="sending">Авторизоваться</v-btn>
                </div>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import {
    Component,
    Action,
    Emit,
    Inject,
    Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import russian from 'vee-validate/dist/locale/ru';


@Component({})
export default class Auth extends Vue {
    @State(state => state.form.auth.error) errorForm!: boolean;

    @Inject() $validator!: any;

    @Action('form/auth/changeField') changeField: any;
    @Action('form/auth/login') actionUserLogin: any;

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
       return this.$store.state.form.auth.login
    }
    set login(value) {
        this.changeField({name:'login', value})
    }

    get password() {
       return this.$store.state.form.auth.password
    }
    set password(value) {
        this.changeField({name:'password', value})
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

            console.log('Correct them errors!');
        });
    }

    getValidationClass (fieldName) {
        return { 'md-invalid': this.errors.has(fieldName) }
    }
}
</script>
