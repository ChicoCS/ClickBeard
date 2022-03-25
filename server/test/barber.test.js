const axios = require("axios");
const barberService = require("../src/services/barber/barberService");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should get specialties list - Case Success", async () => {
  const response = await request(
    `http://localhost:8080/barbers/specialties`,
    "get"
  );

  expect(response).toBeDefined();
  expect(response.status).toBe(200);
});

test("Should register barber - Case Success", async () => {
  const data = {
    name: "Tester",
    age: 99,
    date_hiring: "2010-10-10",
    specialties: [
      {
        id: 1,
        name: "Cabelo",
      },
      {
        id: 2,
        name: "Barba",
      },
    ],
  };

  const response = await request("http://localhost:8080/barbers", "post", data);

  const barber = await barberService.getBarberByName(data.name);

  expect(response).toBeDefined();
  expect(response.status).toBe(201);
  expect(barber.name).toBe(data.name);
  expect(barber.age).toBe(data.age);
  expect(barber.specialties.length).toBe(data.specialties.length);

  await barberService.deleteBarber(barber.uid);
});
