import {User} from '~/model';

export interface StateUser extends User {
  token: string;
  inputText: string;
}

export default () => ({
  token: null,
  login: null,
  id: null
})
