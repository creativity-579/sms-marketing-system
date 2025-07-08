import adminService from "../service/adminProvider.js";

export function useAdminHook() {
  const getAllUsers = () => {
    return adminService.getAllUsers();
  };

  const createClient = (newClient) => {
    return adminService.createClient(newClient);
  };

  const updateClient = (id, updateData) => {
    return adminService.updateClient(id, updateData);
  };

  const updateBalance = (id, newBalance) => {
    return adminService.updateBalance(id, newBalance);
  };

  const removeClient = (id) => {
    return adminService.removeClient(id);
  }

  const getSenderIds = () => {
    return adminService.getSenderIds();
  };

  const changeStatus = (id, status) => {
    return adminService.changeStatus(id, status);
  };

  const approveSenderId = (id) => {
    return adminService.approveSenderId(id);
  };

  const rejectSenderId = (id) => {
    return adminService.rejectSenderId(id);
  };

  const getTemplates = () => {
    return adminService.getTemplates();
  };

  const updateTemplateStatus = (id, updateData) => {
    return adminService.updateTemplateStatus(id, updateData);
  };

  return {
    getAllUsers,
    createClient,
    updateClient,
    updateBalance,
    removeClient,
    getSenderIds,
    approveSenderId,
    rejectSenderId,
    changeStatus,
    getTemplates,
    updateTemplateStatus,
  };
}
