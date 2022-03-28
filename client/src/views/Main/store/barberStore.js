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

  barbers = [];

  fetching = false;

  modalSchedule = false;

  resetRegisterBarber() {
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

  handleChangeChipRegisterBarberSpecialties(row) {
    const exists = this.registerBarberData.specialties.find(
      (specialty) => specialty.id === row.id
    );

    exists
      ? (this.registerBarberData.specialties =
          this.registerBarberData.specialties.filter(
            (specialty) => specialty.id !== row.id
          ))
      : this.registerBarberData.specialties.push(row);
  }

  selectedChipRegisterBarber(row) {
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

  async registerBarber(admId, navigate) {
    try {
      this.fetching = true;

      const validateData = this.validateBarberData(this.registerBarberData);

      if (validateData) {
        const response = await Barber.registerBarber(this.registerBarberData);
        if (response.error) {
          alert(`${response.error}`);
        }
        if (validator.isEmpty(response.data)) {
          alert("Barbeiro registrado com Sucesso!");
          this.resetRegisterBarber();
          navigate(`/adm/${admId}`);
        }
      }

      if (!validateData) {
        alert("Verifique se os campos foram preenchidos corretamente.");
      }
    } finally {
      this.fetching = false;
    }
  }

  async getBarberSpecialtiesTypes() {
    try {
      this.fetching = true;

      const response = await Barber.getBarberSpecialtiesTypes();

      this.specialties = response.data;
    } finally {
      this.fetching = false;
    }
  }

  constructor() {
    makeObservable(this, {
      fetching: observable,
      specialties: observable,
      registerBarberData: observable,
      selectedChipRegisterBarber: observable,
      barbers: observable,
      resetRegisterBarber: action.bound,
      registerBarber: action.bound,
      getBarberSpecialtiesTypes: action.bound,
      validateBarberData: action.bound,
      handleChangeRegisterBarber: action.bound,
      handleChangeChipRegisterBarberSpecialties: action.bound,
    });
  }
}
export default BarberStore;
