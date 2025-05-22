import axios from "axios";
import config from "../config";

const axiosClient = axios.create({
    baseURL: config.api.url,
    withCredentials: true,
});

export default axiosClient;