import React, { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../../components/headers/Social/GoogleLogin";
import useAuth from "../../hooks/useAuth";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const { login, error, setError, loader, setLoader } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data)
     console.log(formData);
    login(formData.email, formData.password)
      .then(() => {
        // navigate(location.state?.form || "/dashboard");
        navigate("/")
      })
      .catch((err) => {
        setError(err.code);
        setLoader(false);
      });
  };
  return (
    <div className="mx-auto  max-w-screen-xl px-4 py-18 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-center text-secondary sm:text-3xl">
        Sign In to Expereice EDU HUB
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, modi.
      </p>
      <div className="mx-auto max-w-xl mb-0 mt-6 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-center text-red-400 text-lg font-medium">
            Sign in
          </p>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full border outline-none rounded-lg border-gray-300 pe-12 p-4 text-sm shadow-sm"
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <MdOutlineAlternateEmail className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>

          {/* password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="w-full border outline-none rounded-lg border-gray-300 pe-12 p-4 text-sm shadow-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <IoMdEye className="h-4 w-4 text-gray-400" />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-md bg-secondary px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>
          <p className="text-center text-sm text-gray-600">
            No account?
            <Link className="underline" to="/register">
              Sign Up
            </Link>
          </p>
        </form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
