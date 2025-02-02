import axios from "axios";

const API = axios.create({
  baseURL: "https://bling-jewelery-store-backend.vercel.app",
  withCredentials: true, // Include cookies if using authentication
});

export default API;
