const express = require("express");
const routes = express.Router();

const Account = require("./Account");
const Barber = require("./Barber");
const Schedule = require("./Schedule");

routes.post("/login", Account.login);
routes.post("/accounts/client", Account.createAccount);
routes.get("/accounts/client/:id", Account.getUserDataByUID);


routes.post("/barbers", Barber.registerBarber);
routes.get("/barbers", Barber.getBarbers);
routes.get("/barbers/specialties", Barber.getBarberSpecialtiesTypes);
routes.get("/barbers/:id/specialties", Barber.getBarbersBySpecialty);
routes.get("/barbers/:id/schedules", Barber.getSchedulesBarberByBarberUID);

routes.get("/schedules", Schedule.getSchedules);
routes.post("/schedules/:client_id", Schedule.registerSchedule);
routes.get("/schedules/:client_id", Schedule.getSchedulesByClient);

module.exports = routes;
