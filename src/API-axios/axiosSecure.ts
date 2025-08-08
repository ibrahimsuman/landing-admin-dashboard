import axios from "axios";
import Cookies from "js-cookie";
import { useLogout } from "./logOut";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API,
});
const useAxiosSecure = () => {
  const { logOut } = useLogout();
  // ........................................................................
  // request interceptors authorization header
  // ........................................................................
  axiosSecure.interceptors.request.use(
    function (config) {
      // Send the token in server side
      const token = Cookies.get("accessToken");
      config.headers.authorization = `Bearer ${token}`;

      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // ........................................................................
  // Add a response interceptor
  // ........................................................................

  // axiosSecure.ts
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        logOut();
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
