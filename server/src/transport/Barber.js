const barberService = require("../services/barber/barberService");

module.exports = {
  async getBarberSpecialtiesTypes(req, res, next) {
    try {
      const response = await barberService.getBarberSpecialtiesTypes();
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async registerBarber(req, res, next) {
    try {
      const data = req.body;
      const response = await barberService.registerBarber(data);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  },
};
