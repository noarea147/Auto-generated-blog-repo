import axios from "axios";
const API = process.env.VITE_API_URL || "http://localhost:4000/api";
export const list = () => axios.get(`${API}/articles`).then((r) => r.data);
export const get = (id) =>
  axios.get(`${API}/articles/${id}`).then((r) => r.data);
