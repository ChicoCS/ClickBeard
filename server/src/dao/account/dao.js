const connection = require("../../database/index");
const sql = require("./sql");

module.exports = {
  async getLoginAccount(data) {
    const response = await connection.query(sql.getLoginAccount, {
      type: connection.QueryTypes.SELECT,
      plain: true,
      replacements: {
        login: data.login,
        password: data.password,
      },
    });
    return response;
  },

  async getAccountByUID(uid) {
    const response = await connection.query(sql.getAccountByUID, {
      type: connection.QueryTypes.SELECT,
      plain: true,
      replacements: {
        uid: uid
      },
    });
    return response;
  },

  async checkLoginAccount(loginId) {
    const response = await connection.query(sql.checkLoginAccount, {
      type: connection.QueryTypes.SELECT,
      plain: true,
      replacements: {
        login: loginId,
      },
    });
    return response;
  },

  async checkAccountExists(data) {
    const response = await connection.query(sql.checkAccountExists, {
      type: connection.QueryTypes.SELECT,
      plain: true,
      replacements: {
        login: data.login,
        email: data.email,
      },
    });
    return response;
  },

  async createAccount(data, typeAccount) {
    const response = await connection.query(sql.createAccount, {
      type: connection.QueryTypes.INSERT,
      plain: true,
      replacements: {
        name: data.name,
        login: data.login,
        password: data.password,
        email: data.email,
        type: typeAccount,
      },
    });
    return response;
  },

  async deleteAccount(uid) {
    return await connection.query(sql.deleteAccount, {
      type: connection.QueryTypes.DELETE,
      replacements: {
        uid: uid,
      },
    });
  },
};
