const scheduleDAO = require("../../dao/schedule/dao");
const barberDAO = require("../../dao/barber/dao");
const accountDAO = require("../../dao/account/dao");

module.exports = {
  async registerSchedule(data, clientID) {
    const barber = await barberDAO.getBarberByUID(data.barber);
    if (!barber) {
      throw new Error("Falha ao registrar agendamento.");
    }

    const user = await accountDAO.getAccountByUID(clientID)
    if (!user) {
      throw new Error("Falha ao registrar agendamento.");
    }

    const scheduleData = {
      barber: barber.id,
      date: data.date,
      time: data.time,
      user: user.id
    }

    const schedule = await scheduleDAO.registerSchedule(scheduleData);
    if (!schedule) {
      throw new Error("Falha ao registrar agendamento.");
    }
  }
};
