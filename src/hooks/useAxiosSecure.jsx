import React, { useContext, useEffect } from "react";
import { AuthContext } from "../utilities/Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
  });
  useEffect(() => {
    // add req interceptor
    const requestInceptor = axiosSecure.interceptors.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    // res interceptors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          (error.response && error.response.status === 401) ||
          error.response.status === 403
        ) {
          await logout();
          navigate("/login");
          throw error;
        }
        throw error;
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, navigate, axiosSecure]);
  return axiosSecure;
};

export default useAxiosSecure;
