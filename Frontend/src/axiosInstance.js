import axios from "axios";

const API = axios.create({
  // baseURL: "https://blingg-jewelery-backend.vercel.app",
  baseURL: "http://localhost:5000",
  withCredentials: true, // Now this will work
});

export default API;
