import axios from "axios";
import authService from "./auth.js";

const adminService = {
  getAllUsers: async () => {
    try {
      await authService.setToken();
      let res = await axios.get(authService.url + "/admin/clients");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  createClient: async (newClient) => {
    try {
      await authService.setToken();
      let res = await axios.post(authService.url + "/admin/clients", newClient);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  getSenderIds: async () => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/admin/senderIds");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },

  changeStatus: async (id, status) => {
    try {
      await authService.setToken();
      const res = await axios.put(
        authService.url + `/admin/senderIds/${id}`,
        status
      );
      if (res.data.message !== "success") throw new error(res.data.message);
      console.log("res-senderidstatus->", res);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  getTemplates: async () => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/admin/templates");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  updateTemplateStatus: async (id, updateData) => {
    try {
      await authService.setToken();
      const res = await axios.put(
        authService.url + `/admin/templates/${id}`,
        updateData
      );
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },
};

export default adminService;
