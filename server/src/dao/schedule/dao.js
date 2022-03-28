const connection = require("../../database/index");
const sql = require("./sql");

module.exports = {
  async registerSchedule(data) {
    const response = await connection.query(sql.registerSchedule, {
      type: connection.QueryTypes.INSERT,
      plain: true,
      replacements: {
        barber: data.barber,
        date: data.date,
        time: data.time,
        user: data.user,
      },
    });
    return response[0];
  },

  async getSchedulesByClientUID(uid) {
    const response = await connection.query(sql.getSchedulesByClientUID, {
      type: connection.QueryTypes.SELECT,
      replacements: {
        uid: uid,
      },
    });
    return response;
  },

  async getSchedules() {
    const response = await connection.query(sql.getSchedules, {
      type: connection.QueryTypes.SELECT,
    });
    return response;
  },

  async getScheduleByUID(scheduleUID) {
    const response = await connection.query(sql.getScheduleByUID, {
      type: connection.QueryTypes.SELECT,
      plain: true,
      replacements: {
        uid: scheduleUID,
      },
    });
    return response;
  },

  async cancelSchedule(scheduleUID) {
    const response = await connection.query(sql.cancelSchedule, {
      type: connection.QueryTypes.UPDATE,
      plain: true,
      replacements: {
        uid: scheduleUID,
      },
    });
    return response;
  },

  async checkClientScheduleIsAvailable(scheduleData) {
    const response = await connection.query(
      sql.checkClientScheduleIsAvailable,
      {
        type: connection.QueryTypes.SELECT,
        plain: true,
        replacements: {
          date: scheduleData.date,
          time: scheduleData.time,
          user_id: scheduleData.user,
        },
      }
    );
    return response;
  },
};
