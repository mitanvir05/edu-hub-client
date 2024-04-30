import axios from "axios";
import { useEffect } from "react";

const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  // Interceptors
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject interceptors on cleanup
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
