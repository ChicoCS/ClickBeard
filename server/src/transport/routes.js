const express = require("express");
const routes = express.Router();

const Account = require("./Account")

routes.post("/login", Account.login)

module.exports = routes;