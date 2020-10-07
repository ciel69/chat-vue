import {Middleware, Context} from '@nuxt/types';

const myMiddleware: Middleware = (context: Context) => {
  if (!context.app.$apolloHelpers.getToken()) {
    return context.redirect('/login');
  }
};

export default myMiddleware;
