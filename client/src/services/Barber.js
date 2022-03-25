import api from "./api";

const Barber = {
    getBarberSpecialties: async () => {
    let response = {}
    await api
      .get(`/barbers/specialties`)
      .then((res) => {
        response.data = res.data
      })
      .catch((res) => {
        response.error = res.response.data
      });
    return response;
  },

  registerBarber: async (data) => {
    let response = {}
    await api
      .post(`/barbers`, data)
      .then((res) => {
        response.data = res.data
      })
      .catch((res) => {
        response.error = res.response.data
      });
    return response;
  },
}

export default Barber;