import api from "./api";

const Account = {
  makeLogin: async (data) => {
    let response = {}
    await api
      .post(`/login`, data)
      .then((res) => {
        response.data = res.data
      })
      .catch((res) => {
        response.error = res.response.data
      });
    return response;
  },

  createClientAccount: async (data) => {
    let response = {}
    await api
      .post(`/accounts/client`, data)
      .then((res) => {
        response.data = res.data
      })
      .catch((res) => {
        response.error = res.response.data
      })
    return response;
  }
};

export default Account;