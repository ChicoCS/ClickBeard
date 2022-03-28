const barberDAO = require("../../dao/barber/dao");

module.exports = {
  async getBarberSpecialtiesTypes() {
    const specialties = await barberDAO.getBarberSpecialtiesTypes();
    if (!specialties) {
      throw new Error("Falha ao obter tipos de especialidades.");
    }

    return specialties;
  },

  async getBarbersBySpecialty(specialtyID) {
    const barbers = await barberDAO.getBarbersBySpecialty(specialtyID);
    if (!barbers) {
      throw new Error("Falha ao obter barbeiros.");
    }

    return barbers;
  },

  async getSchedulesBarberByBarberUID(uid, date) {
    const availableSchedules = [];
    const unavailableSchedules =
      await barberDAO.getUnavailableSchedulesBarberByBarberUID(uid, date);
    if (!unavailableSchedules) {
      throw new Error("Falha ao obter horários.");
    }

    const timeList = await barberDAO.getTimeList();
    if (!timeList) {
      throw new Error("Falha ao obter lista de horários.");
    }

    timeList.forEach((time) => {
      let resp = unavailableSchedules.find(
        (unavailableTime) => unavailableTime.time === time.time
      );

      if (!resp) {
        if (
          !availableSchedules.some(
            (availableSchedule) => availableSchedule === time.time
          )
        ) {
          availableSchedules.push(time.time);
        }
      }
    });

    return availableSchedules;
  },

  async getBarberByName(name) {
    let result = {};
    const barber = await barberDAO.getBarberByName(name);
    if (!barber) {
      throw new Error("Falha ao obter barbeiro.");
    }

    const specialties = await barberDAO.getBarberSpecialtiesById(barber.id);
    if (!specialties) {
      throw new Error("Falha ao obter especialidades do barbeiro.");
    }

    result = {
      uid: barber.uid,
      name: barber.name,
      age: barber.age,
      date_hiring: barber.date_hiring,
      specialties: specialties,
    };

    return result;
  },

  async registerBarber(data) {
    const checkBarber = await barberDAO.getBarberByName(data.name);
    if (checkBarber) {
      throw new Error("Falha ao cadastrar barbeiro. Barbeiro ja cadastrado.");
    }

    if (!checkBarber) {
      const barberId = await barberDAO.registerBarber(data);
      if (data.specialties.length > 0) {
        data.specialties.map(async (specialty) => {
          const response = await barberDAO.addBarberSpecialty(
            barberId,
            specialty.id
          );
          if (!response) {
            throw new Error("Falha ao adicionar especialidades.");
          }
        });
      }
    }
  },

  async deleteBarber(uid) {
    const barber = await barberDAO.getBarberByUID(uid);

    await barberDAO.deleteBarber(barber);

    const checkBarber = await barberDAO.getBarberByUID(uid);
    if (checkBarber) {
      throw new Error("Houve um erro ao remover conta.");
    }
  },
};
