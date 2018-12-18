<template>
    <section>
        <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="loginUser">
            <md-card class="md-layout-item md-size-30 md-small-size-100 form-auth">
                <md-card-header>
                    <div class="md-title">Авториация</div>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('login')">
                                <label for="login">Логин</label>
                                <md-input v-validate="'required|min:3'" name="login" id="login" v-model="login" autocomplete="off" :disabled="sending"/>
                                <span class="md-error">{{ errors.first('login') }}</span>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('password')">
                                <label for="password">Пароль</label>
                                <md-input v-validate="'required|min:5'" type="password" name="password" id="password" v-model="password" :disabled="sending"/>
                                <span class="md-error">{{ errors.first('password') }}</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions md-alignment="space-between">
                    <md-button type="submit" class="md-dense md-raised md-primary" :disabled="sending">Авторизоваться</md-button>
                </md-card-actions>
            </md-card>
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
        console.log('error', this.errors);
        console.log('error', this.errors.collect('login'));
        console.log('error', this.errors.collect('login'));
        this.$validator.validateAll().then((result) => {
            console.log('result', result);
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
