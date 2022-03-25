import { action, makeObservable, observable } from "mobx";
import validator from "validator";
import Barber from "../../../services/Barber";

class BarberStore {
  registerBarberData = {
    name: "",
    age: null,
    date_hiring: "",
    specialties: [],
  };

  specialties = [];

  fetching = false;

  reset() {
    this.registerBarberData = {
      name: "",
      age: null,
      date_hiring: "",
      specialties: [],
    };
  }

  handleChangeRegisterBarber(target) {
    const { name, value } = target;
    this.registerBarberData[name] = value;
  }

  handleChangeChip(row) {
    const exists = this.registerBarberData.specialties.find(
      (specialty) => specialty.id === row.id
    );

    exists
      ? this.registerBarberData.specialties.pop(row)
      : this.registerBarberData.specialties.push(row);
  }

  selectedChip(row) {
    const exists = this.registerBarberData.specialties.find(
      (specialty) => specialty.id === row.id
    );

    return exists ? "info" : "default";
  }

  validateBarberData(data) {
    if (
      validator.isEmpty(data.name) ||
      validator.isEmpty(data.age) ||
      !validator.isDate(data.date_hiring) ||
      data.age < 1
    ) {
      return false;
    } else {
      return true;
    }
  }

  async registerBarber(navigate) {
    try {
      this.fetching = true;

      const validateData = this.validateBarberData(this.registerBarberData);

      if (validateData) {
        const response = await Barber.registerBarber(
          this.registerBarberData
        );
        if (response.error) {
          alert(`${response.error}`);
        }
        if (validator.isEmpty(response.data)) {
          alert("Barbeiro registrado com Sucesso!");
          navigate("/adm");
        }
      }

      if (!validateData) {
        alert("Verifique se os campos foram preenchidos corretamente.");
      }
    } finally {
      this.fetching = false;
    }
  }

  async getBarberSpecialties() {
    try {
      this.fetching = true;

      const response = await Barber.getBarberSpecialties();

      this.specialties = response.data;
    } finally {
      this.fetching = false;
    }
  }

  constructor() {
    makeObservable(this, {
      registerBarberData: observable,
      specialties: observable,
      fetching: observable,
      selectedChip: observable,
      reset: action.bound,
      registerBarber: action.bound,
      getBarberSpecialties: action.bound,
      validateBarberData: action.bound,
      handleChangeRegisterBarber: action.bound,
      handleChangeChip: action.bound,
    });
  }
}
export default BarberStore;
