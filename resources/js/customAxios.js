import axios from "axios";

const customAxios = axios.create({
    baseURL: 'http://localhost:8000/api'
});

customAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = token;
    return config;
});

customAxios.interceptors.response.use(
    (response) => {
        return response;
    }
    ,
    (error) => {
        const {response} = error;
        if(response.status === 401) 
        {
            localStorage.removeItem('ACCESS_TOKEN');
        }
        throw error;
    }
);     

export default customAxios;