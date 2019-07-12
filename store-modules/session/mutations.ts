import _merge from 'lodash/merge';

export default {
  setSession(state, session) {
    console.log('setSessionData', session);
    state.session = session;
  }
};
