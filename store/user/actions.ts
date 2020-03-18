import VueRouter from 'vue-router';
import {Context, NuxtAppOptions} from '@nuxt/types';

export const serverInit = ({commit, state}: NuxtAppOptions, context: NuxtAppOptions) => {
  try {
    const auth = context.app.$cookies.get('auth');

    if (auth) {
      commit('loginSuccess', auth)
    } else {
      commit('logout')
    }
  } catch (e) {
    console.error(e)
  }
};

export async function checkToken({commit, state}: NuxtAppOptions, app: NuxtAppOptions): Promise<void> {
  try {
    const token = app.$cookies.get('token');
    const id = app.$cookies.get('id');
    const currentUser = app.$cookies.get('currentUser');

    if (currentUser) {
      commit('login', currentUser);
    } else if (token && id) {
      commit('login', {token, id});
    } else {
      commit('login', {token: null, id: null});
    }
  } catch (e) {
    console.error(e);
  }
}

export function loginUser({commit, dispatch}: NuxtAppOptions, data: any): void {
  commit('login', data);
  dispatch('dialogs/clearDialogs', null, {root: true});
}

export function logout(this: Context|any, {commit, dispatch}: NuxtAppOptions): void {
  commit('loadToken', null);
  dispatch('dialogs/clearDialogs', null, {root: true});
  this.app.$cookies.remove('currentUser');
  this.app.$cookies.remove('token');
  this.app.$cookies.remove('id');
  this.app.router.push('/auth');
}

export function chatChangeInput(context: NuxtAppOptions, data: object): void {
  context.commit('chatChangeInput', data)
}
