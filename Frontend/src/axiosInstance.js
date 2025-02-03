import axios from "axios";

const API = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true, // Include cookies if using authentication
});

export default API;
