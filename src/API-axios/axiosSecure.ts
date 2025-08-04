import axios from "axios";

const axiosSecure = axios.create({
    baseURL:'https://landing-pageecommarce-backend.vercel.app',
});

axiosSecure.interceptors.request.use((config)=>{
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
});