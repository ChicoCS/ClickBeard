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

  async getBarbers(req, res, next) {
    try {
      const response = await barberService.getBarbers();
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async getBarbersBySpecialty(req, res, next) {
    try {
      const response = await barberService.getBarbersBySpecialty(req.params.id);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async getSchedulesBarberByBarberUID(req, res, next) {
    try {
      const response = await barberService.getSchedulesBarberByBarberUID(req.params.id, req.query.date);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
};
