import { action, makeObservable, observable } from "mobx";
import validator from "validator";
import Account from "../../../services/Account";

class LoginStore {
  user = {
    login: "",
    password: "",
  };

  createAccountData = {
    login: "",
    name: "",
    password: "",
    password_confirm: "",
    email: "",
    type: "",
  };

  loggedUser = null;

  reset() {
    this.user = {
      login: "",
      password: "",
    };
    this.createAccountData = {
      login: "",
      name: "",
      password: "",
      password_confirm: "",
      email: "",
      type: "",
    };
    this.loggedUser = null;
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

  validateCreateAccountData(data) {
    if (
      validator.isEmpty(data.name) ||
      validator.isEmpty(data.login) ||
      !validator.isEmail(data.email) ||
      data.password !== data.password_confirm
    ) {
      return false;
    } else {
      return true;
    }
  }

  async makeLogin(navigate) {
    try {
      const validateUser = this.validateLogin(this.user);
      if (validateUser) {
        const response = await Account.makeLogin(this.user);

        if (response.error) {
          alert(`${response.error}`);
        }
        if (response.data) {
          response.data.type === 1
            ? navigate(`/adm/${response.data.uid}`)
            : navigate(`/client/${response.data.uid}`);
        }
      }

      if (!validateUser) {
        alert("Verifique se os campos foram preenchidos corretamente.");
      }
    } finally {
    }
  }

  async createAccount(navigate) {
    try {
      const validateData = this.validateCreateAccountData(
        this.createAccountData
      );

      this.createAccountData.type = 2;
      if (validateData) {
        const response = await Account.createClientAccount(
          this.createAccountData
        );
        if (response.error) {
          alert(`${response.error}`);
        }
        if (validator.isEmpty(response.data)) {
          alert("Conta criada com Sucesso!");
          navigate("/");
        }
      }

      if (!validateData) {
        alert("Verifique se os campos foram preenchidos corretamente.");
      }
    } finally {
    }
  }

  async getClientData(id, navigation) {
    try {
      const response = await Account.getUserDataByID(id, 2);
      if (response.error) {
        alert(`${response.error}`);
        navigation("/");
      }

      this.loggedUser = response.data;
    } finally {
    }
  }

  async getAdminData(id, navigation) {
    try {
      const response = await Account.getUserDataByID(id, 1);
      if (response.error) {
        alert(`${response.error}`);
        navigation("/");
      }

      this.loggedUser = response.data;
    } finally {
    }
  }

  constructor() {
    makeObservable(this, {
      user: observable,
      reset: action.bound,
      makeLogin: action.bound,
      createAccount: action.bound,
      validateLogin: action.bound,
      validateCreateAccountData: action.bound,
      handleChangeLogin: action.bound,
      handleChangeCreateAccount: action.bound,
      getClientData: action.bound,
      getAdminData: action.bound,
    });
  }
}
export default LoginStore;
