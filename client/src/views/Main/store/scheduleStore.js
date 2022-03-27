import { action, makeObservable, observable } from "mobx";
import validator from "validator";
import Barber from "../../../services/Barber";
import Schedule from "../../../services/Schedule";

class ScheduleStore {
  fetching = false;

  specialties = [];

  barbers = [];

  schedule = {
    specialty: "",
    date: "",
    barber: "",
    time: "",
  };

  availableBarbers = [];

  availableSchedules = [];

  clientSchedules = [];

  schedules = [];

  resetRegisterSchedule() {
    this.schedule = {
      specialty: "",
      date: "",
      barber: "",
      time: "",
    };
    this.availableBarbers = [];
    this.availableSchedules = [];
  }

  handleChangeRegisterSchedule(target) {
    this.resetRegisterSchedule();
    const { name, value } = target;
    this.schedule[name] = value;
  }

  async handleChangeChipRegisterSchedule(row, target) {
    this.schedule[target] =
      target === "specialty"
        ? row.id
        : target === "barber"
        ? row.uid
        : target === "time"
        ? row
        : "";

    if (target === "specialty") {
      this.availableBarbers = [];
      this.availableSchedules = [];
      await this.filterBarbersBySpecialty();
    }

    if (target === "barber") {
      this.availableSchedules = [];
      await this.filterAvailableSchedulesBarber();
    }
  }

  async filterBarbersBySpecialty() {
    try {
      this.fetching = true;

      const response = await Barber.getBarbersBySpecialty(
        this.schedule.specialty
      );

      this.availableBarbers = response.data;
    } finally {
      this.fetching = true;
    }
  }

  async filterAvailableSchedulesBarber() {
    try {
      this.fetching = true;

      if (validator.isDate(this.schedule.date)) {
        const response = await Barber.getSchedulesBarberByBarber(
          this.schedule.barber,
          this.schedule.date
        );
        this.availableSchedules = response.data;
      }

      if (!validator.isDate(this.schedule.date)) {
        alert("você precisa informar uma data.");
        this.schedule.barber = null;
      }
    } finally {
      this.fetching = true;
    }
  }

  validateRegisterScheduleData(data) {
    if (
      validator.isInt(toString(data.specialty)) ||
      validator.isEmpty(data.barber) ||
      validator.isEmpty(data.time) ||
      !validator.isDate(data.date)
    ) {
      return false;
    } else {
      return true;
    }
  }

  async registerSchedule(navigation, clientID) {
    try {
      this.fetching = true;

      const validation = this.validateRegisterScheduleData(this.schedule);

      if (validation) {
        const response = await Schedule.registerSchedule(
          clientID,
          this.schedule
        );
        if (response.error) {
          alert(`${response.error}`);
        }
        if (validator.isEmpty(response.data)) {
          alert("Agendamento realizado com Sucesso!");
          this.resetRegisterSchedule();
          navigation(`/client/${clientID}`);
        }
      }

      if (!validation) {
        alert("Preencha os campos corretamente.");
      }
    } finally {
      this.fetching = false;
    }
  }

  async getSchedulesByClient(clientID) {
    try {
      this.fetching = true;

      const response = await Schedule.getSchedulesByClient(clientID);

      this.clientSchedules = response.data;
    } finally {
      this.fetching = false;
    }
  }

  async getSchedules() {
    try {
      this.fetching = true;

      const response = await Schedule.getSchedules();

      this.schedules = response.data;
    } finally {
      this.fetching = false;
    }
  }

  constructor() {
    makeObservable(this, {
      specialties: observable,
      fetching: observable,
      barbers: observable,
      availableBarbers: observable,
      availableSchedules: observable,
      schedules: observable,
      clientSchedules: observable,
      resetRegisterSchedule: action.bound,
      handleChangeRegisterSchedule: action.bound,
      handleChangeChipRegisterSchedule: action.bound,
      filterBarbersBySpecialty: action.bound,
      filterAvailableSchedulesBarber: action.bound,
      registerSchedule: action.bound,
      validateRegisterScheduleData: action.bound,
      getSchedulesByClient: action.bound,
    });
  }
}
export default ScheduleStore;