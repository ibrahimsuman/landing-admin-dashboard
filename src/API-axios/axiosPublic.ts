import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://landing-pageecommarce-backend.vercel.app',
});

export default axiosPublic;
