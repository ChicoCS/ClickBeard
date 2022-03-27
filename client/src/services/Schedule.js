import api from "./api";

const Schedule = {
  registerSchedule: async (clientID, data) => {
    let response = {};
    await api
      .post(`/schedules/${clientID}`, data)
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  getSchedulesByClient: async (clientID) => {
    let response = {};
    await api
      .get(`/schedules/${clientID}`)
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  getSchedules: async () => {
    let response = {};
    await api
      .get(`/schedules`)
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },
};

export default Schedule;
