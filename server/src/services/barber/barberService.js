const barberDAO = require("../../dao/barber/dao");

module.exports = {
  async getBarberSpecialtiesTypes() {
    const specialties = await barberDAO.getBarberSpecialtiesTypes();
    if (!specialties) {
      throw new Error("Falha ao obter tipos de especialidades.");
    }

    return specialties;
  },

  async getBarberByName(name) {
    let result = {}
    const barber = await barberDAO.getBarberByName(name);
    if (!barber) {
      throw new Error("Falha ao obter barbeiro.");
    }

    const specialties = await barberDAO.getBarberSpecialtiesById(barber.id)
    if (!specialties) {
      throw new Error("Falha ao obter especialidades do barbeiro.");
    }

    result = {
      uid: barber.uid,
      name: barber.name,
      age: barber.age,
      date_hiring: barber.date_hiring,
      specialties: specialties,
    }

    return result;
  },

  async registerBarber(data) {
    const checkBarber = await barberDAO.getBarberByName(data.name);
    if (checkBarber) {
      throw new Error("Barbeiro ja cadastrado.");
    }

    if (!checkBarber) {
      const barberId = await barberDAO.registerBarber(data);
      if (data.specialties.length > 0) {
        data.specialties.map(async (specialty) => {
          const response = await barberDAO.addBarberSpecialty(barberId, specialty.id);
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
