import LoginStore from "../views/Login/store/loginStore";
import BarberStore from "../views/Main/store/barberStore";

const loginStore = new LoginStore();
const barberStore = new BarberStore();

export { loginStore, barberStore };
