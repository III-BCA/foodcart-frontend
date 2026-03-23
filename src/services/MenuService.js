import axios from "axios";

const API_URL = "https://foodcart-backend1-c9f0ghbgh0dgf7gw.centralindia-01.azurewebsites.net/";

export const getMenus = () => axios.get(API_URL);
export const addMenu = (menu) => axios.post(API_URL, menu);
export const updateMenu = (id, menu) => axios.put(`${API_URL}/${id}`, menu);
export const deleteMenu = (id) => axios.delete(`${API_URL}/${id}`);
