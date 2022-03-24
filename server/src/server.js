const express = require("express");
const cors = require("cors");
const routes = require("./transport/routes");
const exceptions = require("./transport/exceptions");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Application-Json"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE"
  );
  app.use(cors());
  next();
});

app.use(express.json());
app.use(routes);
app.use((error, req, res, next) => {
  if (exceptions.status400Exceptions.includes(error.message)) {
    return res.status(400).send(error.message);
  }
  res.status(500).send(error.message);
});

app.listen(8080);
