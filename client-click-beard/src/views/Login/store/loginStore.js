import { action, makeObservable, observable, computed } from "mobx";
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
  }

  fetching = false;

  reset() {
    this.user = {
      login: "",
      password: "",
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

  validateUser(data) {
    return data.login === "" ? false : data.password === "" ? false : true;
  }

  async makeLogin(navigate) {
    try {
      this.fetching = true;

      const validateUser = this.validateUser(this.user);

      if (validateUser) {
        // const response = await Login.MakeLogin(this.user);

        // if (response.error) {
        //   alert(`${response.error}`);
        // }

        // if (response.data) {
        //   navigate("/main");
        // }
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
      validateUser: action.bound,
      handleChangeLogin: action.bound,
      handleChangeCreateAccount: action.bound,
    });
  }
}
export default LoginStore;
