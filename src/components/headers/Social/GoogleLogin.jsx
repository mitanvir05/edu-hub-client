import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    //console.log("click");
    googleLogin()
      .then((userCrendential) => {
        const user = userCrendential.user;
        console.log(user);

        if (user) {
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
            role: "user",
            gender: "Is not specified",
            address: "Is not specified",
            phone: "Is not specified",
          };
          if (user.email && user.displayName) {
            return axios
              .post("http://localhost:3000/new-user", userImp)
              .then(() => {
                navigate("/");
                return "Registration Successful";
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center my-3">
      <button
        onClick={() => handleLogin()}
        className="flex items-center outline-none bg-white border-gray-900 rounded-lg px-6 shadow-xl py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none"
      >
        <FcGoogle className="w-6 h-6 mr-2" />
        <span>Continue With Google </span>
      </button>
    </div>
  );
};

export default GoogleLogin;
