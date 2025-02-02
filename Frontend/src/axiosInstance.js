import axios from "axios";

const API = axios.create({
  baseURL:
    "blingg-jewelery-backend-jjgxc4j4z-asadullahtalats-projects.vercel.app",
  withCredentials: true, // Include cookies if using authentication
});

export default API;
