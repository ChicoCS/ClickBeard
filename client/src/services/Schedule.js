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
};

export default Schedule;
