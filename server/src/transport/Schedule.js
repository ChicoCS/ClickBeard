const scheduleService = require("../services/schedule/scheduleService");

module.exports = {
  async registerSchedule(req, res, next) {
    try {
      const data = req.body;
      const response = await scheduleService.registerSchedule(data, req.params.client_id);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },
};
