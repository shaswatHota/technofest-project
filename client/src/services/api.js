import axios from "axios";

// Automatically attach token to requests
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
