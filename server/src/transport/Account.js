const accountService = require("../services/account/accountService");

module.exports = {
  async login(req, res, next) {
    const data = req.body;
    try {
      const response = await accountService.getLoginAccount(data);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async createAccount(req, res, next) {
    const data = req.body;
    try {
      const response = await accountService.createAccount(data, data.type);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },
};