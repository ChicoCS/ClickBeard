const axios = require("axios");
const accountService = require("../src/services/account/accountService");
const accountDAO = require("../src/dao/account/dao");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should get a login account - Case Success", async function () {
  const data = {
    name: "Tester",
    login: "test",
    password: "test",
    email: "test@testing.com",
    type: 1,
  };

  await accountService.createAccount(data, 1);

  const response = await request(`http://localhost:8080/login`, "post", data);

  const get = response.data;

  expect(response).toBeDefined();
  expect(response.status).toBe(200);
  expect(get.name).toBe(data.name);
  expect(get.email).toBe(data.email);
  expect(get.type).toBe(data.type);

  await accountService.deleteAccount(get.uid);
});

test("Should create account - Case Success", async function () {
  const data = {
    name: "Tester",
    login: "test",
    password: "test",
    email: "test@testing.com",
    type: 2,
  };

  const response = await request(
    "http://localhost:8080/accounts/client",
    "post",
    data
  );

  const testAccount = await accountDAO.getAccountByEmail(data.email);

  expect(response).toBeDefined();
  expect(response.status).toBe(201);
  expect(testAccount.name).toBe(data.name);
  expect(testAccount.cpf).toBe(data.cpf);

  await accountService.deleteAccount(testAccount.uid);
});
