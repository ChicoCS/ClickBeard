import { action, makeObservable, observable } from "mobx";
import validator from "validator";
import Barber from "../../../services/Barber";
import Schedule from "../../../services/Schedule";

class ScheduleStore {
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

  filter = {
    date: "",
  };

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

  resetFilter() {
    this.filter = {
      date: "",
    };
  }

  handleChangeRegisterSchedule(target) {
    this.resetRegisterSchedule();
    const { name, value } = target;
    this.schedule[name] = value;
  }

  handleChangeFilterSchedules(target) {
    this.resetFilter();
    const { name, value } = target;
    this.filter[name] = value;
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
      const response = await Barber.getBarbersBySpecialty(
        this.schedule.specialty
      );

      this.availableBarbers = response.data;
    } finally {
    }
  }

  async filterAvailableSchedulesBarber() {
    try {
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
    }
  }

  async getSchedulesByClient(clientID) {
    try {
      const response = await Schedule.getSchedulesByClient(
        clientID,
        this.filter.date
      );

      this.clientSchedules = response.data;
      this.resetFilter();
    } finally {
    }
  }

  async getSchedules() {
    try {
      const response = await Schedule.getSchedules(this.filter.date);

      this.schedules = response.data;
      this.resetFilter();
    } finally {
    }
  }

  async cancelSchedule(schedule_id, client_id) {
    try {
      const response = await Schedule.cancelSchedule(schedule_id);
      if (response.error) {
        alert(`${response.error}`);
      }
      if (validator.isEmpty(response.data)) {
        alert("Agendamento cancelado com Sucesso!");
        this.getSchedulesByClient(client_id);
      }
    } finally {
    }
  }

  constructor() {
    makeObservable(this, {
      specialties: observable,
      barbers: observable,
      availableBarbers: observable,
      availableSchedules: observable,
      schedules: observable,
      clientSchedules: observable,
      filter: observable,
      resetRegisterSchedule: action.bound,
      resetFilter: action.bound,
      handleChangeRegisterSchedule: action.bound,
      handleChangeChipRegisterSchedule: action.bound,
      handleChangeFilterSchedules: action.bound,
      filterBarbersBySpecialty: action.bound,
      filterAvailableSchedulesBarber: action.bound,
      registerSchedule: action.bound,
      validateRegisterScheduleData: action.bound,
      getSchedulesByClient: action.bound,
      cancelSchedule: action.bound,
    });
  }
}
export default ScheduleStore;
