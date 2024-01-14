import axios from './axios'

export const insertData = (data) => axios.post(`/api/insert`,data);

export const getData = () => axios.get(`/api/get`);