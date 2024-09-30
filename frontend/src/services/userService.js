import axios from 'axios';

const API_URL = 'http://67.205.143.93:8280/users/v1/users'; // URL del API Manager para el servicio de usuarios

const getAll = () => {
  return axios.get(API_URL);
};

const create = (data) => {
  return axios.post(API_URL, data);
};

const update = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
