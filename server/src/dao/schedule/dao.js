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
};
