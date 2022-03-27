import LoginStore from "../views/Login/store/loginStore";
import BarberStore from "../views/Main/store/barberStore";
import ScheduleStore from "../views/Main/store/scheduleStore";

const loginStore = new LoginStore();
const barberStore = new BarberStore();
const scheduleStore = new ScheduleStore();

export { loginStore, barberStore, scheduleStore };
