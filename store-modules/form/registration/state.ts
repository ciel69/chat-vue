interface IAuthForm {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
  passwordConfirmation: string;
  error: boolean;
}

export default {
  firstName: "",
  lastName: "",
  email: "",
  login: "",
  password: "",
  passwordConfirmation: "",
  error: false
}
