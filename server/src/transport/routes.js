const express = require("express");
const routes = express.Router();

const Account = require("./Account");

routes.post("/login", Account.login);
routes.post("/accounts/client", Account.createClient);

module.exports = routes;
