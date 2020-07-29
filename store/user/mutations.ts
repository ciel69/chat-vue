import {StateUser} from '~/store/user/state';

export const checkToken = (state: StateUser, token: string): void => {
  state.token = token;
};

export const login = (state: StateUser, data: StateUser): void => {
  state.login = data.login;
  state.firstName = data.firstName;
  state.lastName = data.lastName;
  state.email = data.email;
  state.id = data.id;
  state.token = data.token;
};

export const loadToken = (state: StateUser, token: string): void => {
  state.token = token;
};

export const sendMessage = (state: StateUser, data: StateUser): void => {
  state.list.push(data);
};

export const chatChangeInput = (state: StateUser, data: string): void => {
  state.inputText = data;
};
