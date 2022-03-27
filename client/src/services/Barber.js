import api from "./api";

const Barber = {
  getBarberSpecialtiesTypes: async () => {
    let response = {};
    await api
      .get(`/barbers/specialties`)
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  registerBarber: async (data) => {
    let response = {};
    await api
      .post(`/barbers`, data)
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  getBarbers: async () => {
    let response = {};
    await api
      .get(`/barbers`)
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  getBarbersBySpecialty: async (specialtyId) => {
    let response = {};
    await api
      .get(`/barbers/${specialtyId === "" ? 0 : specialtyId}/specialties`)
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  getSchedulesBarberByBarber: async (barber, date) => {
    let response = {};
    await api
      .get(`/barbers/${barber}/schedules`, { params: { date: date } })
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },
};

export default Barber;
