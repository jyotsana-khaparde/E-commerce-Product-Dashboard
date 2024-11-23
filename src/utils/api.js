// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com", // Replace with your API's base URL
});

export default api;
