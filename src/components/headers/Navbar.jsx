import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../utilities/Providers/AuthProvider";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

const Navbar = () => {
  const [navBg, setNavBg] = useState("bg-[#15151580]");
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const { currentUser } = useUser();
  const { logout, user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   if (scrollPosition > 100) {
  //     if (isHome) {
  //       setNavBg(
  //         "bg-white backdrop-filter backdrop-blur-xl bg-opacity-0 dark:text-white text-black"
  //       );
  //     } else {
  //       setNavBg("bg-white dark:bg-black dark:text-white text-black");
  //     }
  //   } else {
  //     setNavBg(
  //       `${
  //         isHome || location.pathname === "/"
  //           ? "bg-transparent"
  //           : "bg-white dark:bg-black"
  //       }dark:text-white text-white`
  //     );
  //   }
  // }, [scrollPosition]);
  useEffect(() => {
    if (isHome) {
      setNavBg("bg-white dark:bg-black dark:text-white text-black");
    } else {
      setNavBg("bg-white dark:bg-black dark:text-white text-black");
    }
  }, [isHome]);
  
  const handleLogout = (e) => {
    e.preventDefault();
    console.log("Logout");
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "Logout Successful.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire("Error", err.message, "error");
          });
      }
    });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${
          isHome ? navBg : "bg-white dark:bg-white backdrop-blur-2xl"
        } ${
          isFixed ? "static" : "fixed"
        } top-0 transition-colors ease-in-out w-full z-10 hidden md:block`}
      >
        <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
          <div className="flex px-4 py-4 items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center"
            >
              <div>
                <h1 className="text-xl inline-flex gap-3 font-bold text-green-500 ">
                  Edu Hub
                  <img
                    src="https://i.ibb.co/xMZHkhf/eduhub-logo.png"
                    alt=""
                    className="h-8 w-8"
                  />
                </h1>
                <p className="font-bold text-[13px] tracking-[3px]">
                  Home School
                </p>
              </div>
            </div>
            {/* navigational link */}
            <div className="hidden md:block text-black dark:text-white">
              <div className="flex">
                <ul className="ml-10 flex items-center space-x-4 pr-4">
                  {navLinks.map((link) => (
                    <li key={link.route}>
                      <NavLink
                        to={link.route}
                        style={{ whiteSpace: "nowrap" }}
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black  dark:text-white"
                                }`
                          } hover:text-secondary duration-300 `
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                  {/* based on users */}
                  {user ? null : isLogin ? (
                    <li>
                      <NavLink
                        to="/register"
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black  dark:text-white "
                                }`
                          } hover:text-secondary duration-300 `
                        }
                      >
                        Register
                      </NavLink>
                    </li>
                  ) : (
                    <li>
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black  dark:text-white "
                                }`
                          } hover:text-secondary duration-300 `
                        }
                      >
                        Login
                      </NavLink>
                    </li>
                  )}
                  {user && (
                    <li>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          `font-bold ${
                            isActive
                              ? "text-secondary"
                              : `${
                                  navBg.includes("bg-transparent")
                                    ? "text-white"
                                    : "text-black  dark:text-white"
                                }`
                          } hover:text-secondary duration-300 `
                        }
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}

                  {user && (
                    <li>
                      <img
                        src={currentUser?.photo}
                        alt=""
                        className="h-[40px] w-[40px] rounded-full"
                      />
                    </li>
                  )}

                  {user && (
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        className={
                          "font-bold px-3 py-2 bg-secondary text-white rounded-xl"
                        }
                      >
                        LogOut
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <nav className="bg-[#00000080] fixed top-0 w-full z-10 block md:hidden">
        <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
          <div className="flex px-4 py-4 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center">
              <div>
                <h1 className="text-xl inline-flex gap-3 font-bold text-green-500">
                  Edu Hub
                  <img
                    src="https://i.ibb.co/xMZHkhf/eduhub-logo.png"
                    alt=""
                    className="h-8 w-8"
                  />
                </h1>
                <p className="font-bold text-[13px] tracking-[3px] text-white">
                  Home School
                </p>
              </div>
            </div>
            {/* moble menu icons */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <FaBars className="h-6 w-6 hover:text-primary" />
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="text-white md:hidden">
              <ul className="flex flex-col items-center space-y-4 mt-4">
                {navLinks.map((link) => (
                  <li key={link.route}>
                    <NavLink
                      to={link.route}
                      className="font-bold hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {/* based on users */}
                {!user && (
                  <li>
                    <NavLink
                      to="/register"
                      className="font-bold hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </li>
                )}
                {!user && (
                  <li>
                    <NavLink
                      to="/login"
                      className="font-bold hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="font-bold hover:text-primary transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      className="font-bold hover:text-primary transition-colors duration-300"
                      
                    >
                      Logout
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
