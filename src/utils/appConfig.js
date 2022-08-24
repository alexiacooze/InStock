import axios from "axios";

const API_URL = "http://localhost:8080/";

export const WAREHOUSES_API = {
  getAll: (endpoint) => {
    return axios.get(`${API_URL}${endpoint}`);
  },

  getOne: (endpoint, id) => {
    return axios.get(`${API_URL}${endpoint}/${id}`);
  },

  postOne: (endpoint, obj) => {
    return axios.post(`${API_URL}${endpoint}`, obj);
  },
  editOne: (endpoint, id, obj) => {
    return axios.put(`${API_URL}${endpoint}/${id}/edit`, obj);
  },
  deleteOne: (endpoint, id) => {
    return axios.delete(`${API_URL}${endpoint}/${id}/delete`);
  },
};
