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

  getSchedulesByClient: async (clientID, date) => {
    let response = {};
    await api
      .get(`/schedules/${clientID}`, { params: { date: date } })
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  getSchedules: async (date) => {
    let response = {};
    await api
      .get(`/schedules`, { params: { date: date } })
      .then((res) => {
        response.data = res.data;
      })
      .catch((res) => {
        response.error = res.response.data;
      });
    return response;
  },

  cancelSchedule: async (schedule_id) => {
    let response = {};
    await api
      .put(`/schedules/cancel/${schedule_id}`)
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
