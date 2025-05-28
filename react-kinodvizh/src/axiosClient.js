import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.VITE_BACKEND_URL,
    withCredentials: true,
});

export default axiosClient;