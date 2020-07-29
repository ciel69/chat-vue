import {User} from '~/model';

export interface StateUser extends User {
  token: string;
  list: any[];
  inputText: string;
}

export default () => ({
  token: null,
  login: null,
  id: null
});
