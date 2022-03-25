const accountDAO = require("../../dao/account/dao");
const accountRules = require("./accountRules");

module.exports = {
  async getLoginAccount(data) {
    const accountExists = await accountDAO.checkLoginAccount(data.login);
    if (!accountExists) {
      throw new Error("Falha ao realizar login. Login inexistente.");
    }

    const account = await accountDAO.getLoginAccount(data);
    if (!account) {
      throw new Error(
        "Falha ao realizar login. Login ou senha estão incorretos."
      );
    }

    return account;
  },

  async createAccount(newAccount, typeAccount) {
    const existingAccount = await accountDAO.checkAccountExists(newAccount);
    if (existingAccount) {
      const validation = await accountRules.validateAccount(
        existingAccount,
        newAccount
      );

      if (validation) {
        return validation;
      }
    }

    const response = await accountDAO.createAccount(newAccount, typeAccount);
    if (!response) {
      throw new Error("Houve um erro ao cadastrar conta.");
    }
  },

  async getUserDataByUID(uid, type) {
    const account = await accountDAO.getUserDataByUID(uid, type);
    if (!account) {
      throw new Error(
        "Houve um erro ao obter dados do usuário."
      );
    }

    return account;
  },

  async deleteAccount(uid) {
    await accountDAO.deleteAccount(uid);

    const response = await accountDAO.getAccountByUID(uid);
    if (response) {
      throw new Error("Houve um erro ao remover conta.");
    }
  },
};
