import { action, makeObservable, observable, computed } from "mobx";
import validator from "validator";
import Login from "../../../services/Login";

class LoginStore {
  user = {
    login: "",
    password: "",
  };

  createAccountData = {
    login: "",
    name: "",
    password: "",
    email: "",
  };

  loggedUser = {};

  fetching = false;

  reset() {
    this.user = {
      login: "",
      password: "",
    };
    this.createAccountData = {
      login: "",
      name: "",
      password: "",
      email: "",
    };
  }

  handleChangeLogin(target) {
    const { name, value } = target;
    this.user[name] = value;
  }

  handleChangeCreateAccount(target) {
    const { name, value } = target;
    this.createAccountData[name] = value;
  }

  validateLogin(data) {
    return validator.isEmpty(data.login)
      ? false
      : validator.isEmpty(data.login)
      ? false
      : true;
  }

  async makeLogin(navigate) {
    try {
      this.fetching = true;

      const validateUser = this.validateLogin(this.user);
      if (validateUser) {
        const response = await Login.MakeLogin(this.user);
        if (response.error) {
          alert(`${response.error}`);
        }
        if (response.data.type === 1) {
          navigate("/adm");
        }
        if (response.data.type === 2) {
          navigate("/client");
        }
      }

      if (!validateUser) {
        alert("Verifique se os campos foram preenchidos corretamente.");
      }
    } finally {
      this.fetching = false;
    }
  }

  constructor() {
    makeObservable(this, {
      user: observable,
      fetching: observable,
      reset: action.bound,
      makeLogin: action.bound,
      validateLogin: action.bound,
      handleChangeLogin: action.bound,
      handleChangeCreateAccount: action.bound,
    });
  }
}
export default LoginStore;
