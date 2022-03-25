const connection = require("../../database/index");
const sql = require("./sql");

module.exports = {
  async getBarberSpecialtiesTypes() {
    const response = await connection.query(sql.getBarberSpecialties, {
      type: connection.QueryTypes.SELECT,
    });
    return response;
  },

  async getBarberSpecialtiesById(barberId) {
    const response = await connection.query(sql.getBarberSpecialtiesById, {
      type: connection.QueryTypes.SELECT,
      replacements: {
        barber_id: barberId,
      },
    });
    return response;
  },

  async getBarberByName(name) {
    const response = await connection.query(sql.getBarberByName, {
      type: connection.QueryTypes.SELECT,
      plain: true,
      replacements: {
        name: name,
      },
    });
    return response;
  },

  async getBarberByUID(uid) {
    const response = await connection.query(sql.getBarberByUID, {
      type: connection.QueryTypes.SELECT,
      plain: true,
      replacements: {
        uid: uid,
      },
    });
    return response;
  },

  async registerBarber(data) {
    const response = await connection.query(sql.registerBarber, {
      type: connection.QueryTypes.INSERT,
      plain: true,
      replacements: {
        name: data.name,
        age: data.age,
        date_hiring: data.date_hiring,
      },
    });
    return response[0];
  },

  async addBarberSpecialty(barberId, specialtyId) {
    const response = await connection.query(sql.addBarberSpecialty, {
      type: connection.QueryTypes.INSERT,
      plain: true,
      replacements: {
        barber_id: barberId,
        specialty_id: specialtyId,
      },
    });
    return response;
  },

  async deleteBarber(data) {
    await connection.query(sql.deleteBarberSpecialties, {
      type: connection.QueryTypes.DELETE,
      plain: true,
      replacements: {
        barber_id: data.id,
      },
    });

    await connection.query(sql.deleteBarber, {
      type: connection.QueryTypes.DELETE,
      plain: true,
      replacements: {
        uid: data.uid,
      },
    });
  },
};
