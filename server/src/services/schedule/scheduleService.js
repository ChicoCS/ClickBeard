const scheduleDAO = require("../../dao/schedule/dao");
const barberDAO = require("../../dao/barber/dao");
const accountDAO = require("../../dao/account/dao");

const { formatISO, parseISO, isBefore } = require("date-fns");

const { pt } = require("date-fns/locale/pt");

module.exports = {
  async registerSchedule(data, clientID) {
    const barber = await barberDAO.getBarberByUID(data.barber);
    if (!barber) {
      throw new Error("Falha ao registrar agendamento.");
    }

    const user = await accountDAO.getAccountByUID(clientID);
    if (!user) {
      throw new Error("Falha ao registrar agendamento.");
    }

    const scheduleData = {
      barber: barber.id,
      date: data.date,
      time: data.time,
      user: user.id,
    };

    const schedule = await scheduleDAO.registerSchedule(scheduleData);
    if (!schedule) {
      throw new Error("Falha ao registrar agendamento.");
    }
  },

  async getSchedulesByClient(clientUID, date) {
    const schedules = await scheduleDAO.getSchedulesByClientUID(clientUID);
    if (!schedules) {
      throw new Error("Falha ao obter lista de agendamentos.");
    }

    if (date !== "") {
      const filteredSchedules = await schedules.filter(
        (schedule) => schedule.date === date
      );

      return filteredSchedules;
    }

    return schedules;
  },

  async getSchedules(date) {
    const schedules = await scheduleDAO.getSchedules();
    if (!schedules) {
      throw new Error("Falha ao obter lista de agendamentos.");
    }

    if (date !== "") {
      const filteredSchedules = await schedules.filter(
        (schedule) => schedule.date === date
      );

      return filteredSchedules;
    }

    return schedules;
  },

  async cancelSchedule(scheduleUID) {
    const schedule = await scheduleDAO.getScheduleByUID(scheduleUID);
    if (!schedule) {
      throw new Error("Falha ao cancelar agendamento.");
    }

    const dateSchedule = formatISO(
      new Date(
        schedule.date.split("-")[0],
        schedule.date.split("-")[1] - 1,
        schedule.date.split("-")[2],
        schedule.time.split(":")[0] - 2,
        schedule.time.split(":")[1]
      ),
      {
        locale: pt,
      }
    );

    const timeNow = formatISO(new Date(), {
      locale: pt,
    });

    if (isBefore(parseISO(dateSchedule), parseISO(timeNow))) {
      throw new Error(
        "Não pode cancelar o agendamento porque falta menos de 2 horas antes do horário marcado."
      );
    }

    const err = await scheduleDAO.cancelSchedule(scheduleUID);
    if (!err) {
      throw new Error("Falha ao cancelar agendamento.");
    }
  },
};
