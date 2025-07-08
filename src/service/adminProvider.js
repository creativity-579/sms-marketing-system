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

  updateClient: async (id, updateData) => {
    try {
      await adminService.setToken();
      const res = await axios.put(
        authService.url + "/admin/clients",
        updateData
      );
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error);
    }
  },

  removeClient: async (id) => {
    try {
      await adminService.setToken();
      const res = await axios.delete(authService.url + "/admin/clients");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error);
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

  updateClient: async (id, updateData) => {
    try {
      await authService.setToken();
      const res = await axios.put(
        authService.url + `/admin/clients/${id}`,
        updateData
      );
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  updateClientBalance: async (id, balance) => {
    try {
      await authService.setToken();
      const res = await axios.put(
        authService.url + `/admin/clients/${id}/balance`,
        { balance }
      );
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },
};

export default adminService;
