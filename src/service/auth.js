import axios, { Axios } from "axios";

const authService = {
  // url: "http://192.168.145.161:4001/api",
  url: "https://sms-system-backend-ewnl.onrender.com/api",

  setToken: async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      axios.defaults.headers.common = { Authorization: `Bearer ${jwtToken}` };
    }
  },

  login: async (authData) => {
    try {
      let res = await axios.post(authService.url + "/auth/login", authData);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },
};

export default authService;
