import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: currentUser, isLoading, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email && localStorage.getItem("token") !== null,
  });

  return { currentUser, isLoading, refetch };
};

export default useUser;
