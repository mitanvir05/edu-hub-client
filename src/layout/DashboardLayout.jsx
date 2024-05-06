import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import logo from "/eduhub-logo.png";
import { BiHome, BiHomeAlt, BiLogInCircle } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { BsFillPostcardFill } from "react-icons/bs";
import { TbBrandAppleArcade } from "react-icons/tb";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdTrendingUp } from "react-icons/io";
import { BsBrowserChrome } from "react-icons/bs";
import Swal from "sweetalert2";
import { MdExplore } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { SiGoogleclassroom } from "react-icons/si";
import { BiSelectMultiple } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { SiInstructure } from "react-icons/si";
import Scroll from "../hooks/useScroll";
import { FadeLoader } from "react-spinners";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHome className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUser className="text-2xl" />,
    label: "Manage User",
  },
  {
    to: "/dashboard/manage-classes",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Class",
  },
  {
    to: "/dashboard/manage-application",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Applications",
  },
];
//instructor items
const instructorNavItems = [
  {
    to: "/dashboard/instructor-cp",
    icon: <BiHome className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdExplore className="text-2xl" />,
    label: "Add a class",
  },
  {
    to: "/dashboard/my-class",
    icon: <IoSchoolSharp className="text-2xl" />,
    label: "My classes",
  },
  {
    to: "/dashboard/my-pending",
    icon: <MdPendingActions className="text-2xl" />,
    label: "Pending courses",
  },
  {
    to: "/dashboard/my-approved",
    icon: <IoMdDoneAll className="text-2xl" />,
    label: "Approved Class",
  },
];

// student items

const students = [
  {
    to: "/dashboard/student-cp",
    icon: <BiHome className="text-2xl" />,
    label: "Dashboard",
  },
  {
    to: "/dashboard/enrolled-class",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "My Enroll",
  },
  {
    to: "/dashboard/my-selected",
    icon: <BiSelectMultiple className="text-2xl" />,
    label: "My Selected",
  },
  {
    to: "/dashboard/my-payments",
    icon: <MdPayment className="text-2xl" />,
    label: "Payments History",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <SiInstructure className="text-2xl" />,
    label: "Apply For Instructors",
  },
];

// last menu item
const lastMenuItem = [
  {
    to: "/",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Main Home",
  },
  {
    to: "/trending",
    icon: <IoMdTrendingUp className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "/browse",
    icon: <BsBrowserChrome className="text-2xl" />,
    label: "Browse",
  },
];
const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out me!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(
            Swal.fire({
              title: "Logout!",
              text: "Logout Successfully",
              icon: "success",
            })
          )
          .catch((err) => {
            console.log(err);
          });
      }
      navigate("/");
    });
  };
  //const role = "instructor";
  // if (loader) {
  //   return <div>Loading .....</div>;
  // }

  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#36d7b7" size={50} />
      </div>
    );
  }
  return (
    <div className="flex ">
      <div
        className={`${
          open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"
        } bg-green-100 h-screen p-5 md:block hidden pt-8 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center">
          <img
            onClick={() => setOpen(!open)}
            src={logo}
            alt=""
            className={`cursor-pointer h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <Link to="/">
            <h1
              onClick={() => setOpen(!open)}
              className={`text-dark-primary cursor-pointer 
        font-bold origin-left text-xl duration-200 ${!open && "scale-0"} `}
            >
              Edu Hub
            </h1>
          </Link>
        </div>
        {/* navlink */}
        {/* Admin nav */}
        {role === "admin" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
              <small className="uppercase">Menu</small>
            </p>
            {role === "admin" &&
              adminNavItems.map((menuItem, index) => (
                <li key={index}>
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white" : "text-gray-700"
                      }duration-150 rounded-md p-2 mb-2 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}
        {/* instructor navlink */}
        {role === "instructor" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
              <small className="uppercase">Menu</small>
            </p>
            {instructorNavItems.map((menuItem, index) => (
              <li key={index}>
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${
                      isActive ? "bg-red-500 text-white" : "text-gray-700"
                    }duration-150 rounded-md p-2 mb-2 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* Student nav */}
        {role === "user" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
              <small className="uppercase">Menu</small>
            </p>
            {students.map((menuItem, index) => (
              <li key={index}>
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${
                      isActive ? "bg-red-500 text-white" : "text-gray-700"
                    }duration-150 rounded-md p-2 mb-2 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
        {/* Last menu item */}
        <ul className="pt-6">
          <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
            <small className="uppercase">Useful Links</small>
          </p>
          {lastMenuItem.map((menuItem, index) => (
            <li key={index}>
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex ${
                    isActive ? "bg-red-500 text-white" : "text-gray-700"
                  }duration-150 rounded-md p-2 mb-2 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItem.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItem.label}
                </span>
              </NavLink>
            </li>
          ))}
          {/* Logout */}
          <li>
            <button
              onClick={() => handleLogout()}
              className="flex duration-150 rounded-md p-2 mb-2 hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4"
            >
              <BiLogInCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div>
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
