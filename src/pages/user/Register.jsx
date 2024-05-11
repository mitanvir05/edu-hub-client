import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePicture,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/headers/Social/GoogleLogin";

import { AuthContext } from "../../utilities/Providers/AuthProvider";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { signUp, updateUser, setError} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError('')
    console.log(data);
    signUp(data.email, data.password).then((result) => {
      const user = result.user;
      if (user) {
        return updateUser(data.name, data.photoURL)
          .then(() => {
            const userImp = {
              name: user?.displayName,
              email: user?.email,
              photo: user?.photoURL,
              role: "user",
              gender: data.gender,
              phone: data.phone,
              address: data.address,
            };

            if (user.email && user.displayName) {
              return axios
                .post("https://edu-hub1-server.vercel.app/new-user", userImp)
                .then(() => {
                  setError('');
                  navigate("/");
                })
                .catch((err) => {
                  throw new Error(err);
                });
            }
          })
          .catch((err) => {
            setError(err.code);
            throw new Error(err);
          });
      }
    });
  };
  const password = watch("password");
  return (
    <div className="flex justify-center items-center bg-gray-100 pt-14">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="name"
                className=" block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 text-lg" />
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                {...register("name", { required: true })}
                className="w-full border-gray-300 rounded-md py-2 px-4 
                focus:outline-none  focus:ring focus:border-blue-400 border"
              />
            </div>

            {/* email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className=" block text-gray-700 font-bold mb-2"
              >
                <AiOutlineMail className="inline-block mr-2 text-lg" />
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
                className="w-full border-gray-300 rounded-md py-2 px-4 
                focus:outline-none  focus:ring focus:border-blue-400 border"
              />
            </div>
          </div>

          {/* paswword */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="password"
                className=" block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 text-lg" />
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
                className="w-full border-gray-300 rounded-md py-2 px-4 
                focus:outline-none  focus:ring focus:border-blue-400 border"
              />
            </div>

            {/*confirm passowrd */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className=" block text-gray-700 font-bold mb-2"
              >
                <AiOutlineLock className="inline-block mr-2 text-lg" />
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "password does not match",
                })}
                className="w-full border-gray-300 rounded-md py-2 px-4 
                focus:outline-none  focus:ring focus:border-blue-400 border"
              />
            </div>
          </div>

          {/*phone no  */}
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className=" block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePhone className="inline-block mr-2 text-lg" />
                Phone<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter Phone"
                {...register("phone", { required: true })}
                className="w-full border-gray-300 rounded-md py-2 px-4 
                focus:outline-none  focus:ring focus:border-blue-400 border"
              />
            </div>

            {/*photo */}
            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className=" block text-gray-700 font-bold mb-2"
              >
                <AiOutlinePicture className="inline-block mr-2 text-lg" />
                Photo URl<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Photo URL"
                {...register("photoURL")}
                className="w-full border-gray-300 rounded-md py-2 px-4 
                focus:outline-none  focus:ring focus:border-blue-400 border"
              />
            </div>
          </div>
          {/* Gender */}
          <div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className=" block text-gray-700 font-bold mb-2"
              >
                <AiOutlineUser className="inline-block mr-2 text-lg" />
                Gender<span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender", { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className=" block text-gray-700 font-bold mb-2"
              >
                <FaMapMarkerAlt className="inline-block mr-2 text-lg" />
                Address<span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("address", { required: true })}
                rows="3"
                placeholder="Enter Address"
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-500"
              ></textarea>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded"
            >
              Register
            </button>
            {/* {errors && (
              <div className="text-red-500 text-sm w-full mt-1">
                <p>Password does not match !</p>
              </div>
            )} */}
          </div>
        </form>
        <p className="text-center mt-3">
          Already have an account?
          <Link className="underline text-secondary ml-1" to="/login">
            Login
          </Link>
        </p>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
