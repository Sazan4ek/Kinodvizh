import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    // validateStatus: (status) => status >= 200 && status < 300,
});

export default axiosClient;