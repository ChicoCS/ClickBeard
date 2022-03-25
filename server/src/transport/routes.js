const express = require("express");
const routes = express.Router();

const Account = require("./Account");
const Barber = require("./Barber");

routes.post("/login", Account.login);
routes.post("/accounts/client", Account.createAccount);
routes.get("/accounts/client/:id", Account.getUserDataByUID);


routes.post("/barbers", Barber.registerBarber);
routes.get("/barbers/specialties", Barber.getBarberSpecialtiesTypes);

module.exports = routes;
