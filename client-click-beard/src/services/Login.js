import api from "./api";

const Login = {
  MakeLogin: async (data) => {
    let response = {}
    await api
      .post(`/login`, data)
      .then((res) => {
        response.data = res.data
      })
      .catch((error) => {
        response.error = error.response.data.error
      });
    return response;
  },
};

export default Login;