import axios from "axios";

const API_URL = "foodcart-backend-bkbrefdvbzdhfzgt.centralindia-01.azurewebsites.net";

export const getMenus = () => axios.get(API_URL);
export const addMenu = (menu) => axios.post(API_URL, menu);
export const updateMenu = (id, menu) => axios.put(`${API_URL}/${id}`, menu);
export const deleteMenu = (id) => axios.delete(`${API_URL}/${id}`);
