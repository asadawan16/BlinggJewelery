import axios from "axios";

const API = axios.create({
  baseURL: "https://blingg-jewelery-eay7.vercel.app/",
  withCredentials: true, // Include cookies if using authentication
});

export default API;
