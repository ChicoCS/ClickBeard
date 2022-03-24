const axios = require("axios");
const accountService = require("../src/services/account/accountService");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test.only("Should get a login account - Case Success", async function () {
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
