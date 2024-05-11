import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import logo from "/eduhub-logo.png";
import { BiHome, BiHomeAlt, BiLogInCircle, BiMenu } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { BsFillPostcardFill, BsBrowserChrome } from "react-icons/bs";
import { TbBrandAppleArcade } from "react-icons/tb";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdExplore, MdPendingActions, MdPayment } from "react-icons/md";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { FadeLoader } from "react-spinners"; // Ensure this is installed
import Swal from "sweetalert2";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";


// Define navigation items for various user roles
const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHome className="text-2xl" />,
    label: "Admin Home",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUser className="text-2xl" />,
    label: "Manage User",
  },
  {
    to: "/dashboard/manage-classes",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "Manage Class",
  },
  {
    to: "/dashboard/manage-application",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Applications",
  },
];

const instructorNavItems = [
  {
    to: "/dashboard/instructor-cp",
    icon: <BiHome className="text-2xl" />,
    label: "Instructor Home",
  },
  {
    to: "/dashboard/add-class",
    icon: <MdOutlineLibraryAdd className="text-2xl" />,
    label: "Add a Class",
  },
  {
    to: "/dashboard/my-class",
    icon: <SiGoogleclassroom className="text-2xl" />,
    label: "My Classes",
  },
  {
    to: "/dashboard/my-pending",
    icon: <MdPendingActions className="text-2xl" />,
    label: "Pending Classes",
  },
  {
    to: "/dashboard/my-approved",
    icon: <AiOutlineFileDone  className="text-2xl" />,
    label: "Approved Classes",
  },
];

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
    icon: <IoCheckmarkDoneCircle className="text-2xl" />,
    label: "My Selected",
  },
  {
    to: "/dashboard/my-payments",
    icon: <RiMoneyDollarBoxFill className="text-2xl" />,
    label: "Payments History",
  },
  {
    to: "/dashboard/apply-instructor",
    icon: <FaChalkboardTeacher className="text-2xl" />,
    label: "Apply For Instructors",
  },
];

const lastMenuItem = [
  { to: "/", icon: <BiHomeAlt className="text-2xl" />, label: "Main Home" },
  {
    to: "https://www.google.com/",
    icon: <MdExplore className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "https://www.google.com/",
    icon: <BsBrowserChrome className="text-2xl" />,
    label: "Browse",
  },
];

// DashboardLayout Component
const DashboardLayout = () => {
  const [open, setOpen] = useState(true); // For handling sidebar toggle
  const [mobileOpen, setMobileOpen] = useState(false); // For the mobile menu
  const { logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const role = currentUser?.role;

  // Function to handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
      }
    });
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    setOpen(!open); // Toggle sidebar
    if (!open && mobileOpen) setMobileOpen(false); // Close mobile menu when opening sidebar
  };

  // Function to handle mobile menu item click
  const handleMobileMenuItemClick = () => {
    setMobileOpen(false); // Close mobile menu
  };

  // Return the JSX component
  return (
    <div className="flex">
      {/* Mobile menu */}
      <BiMenu
        className="md:hidden text-3xl m-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      />

      {/* Sidebar navigation (both mobile and desktop) */}
      <div
        className={`${mobileOpen ? "block" : "hidden"} md:block ${
          open ? "w-72" : "w-20"
        } bg-green-100 h-screen p-5 pt-8 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            onClick={handleLogoClick}
            alt="Edu Hub Logo"
            className={`cursor-pointer h-10 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          {open && (
            <Link to="/">
              <h1 className="text-dark-primary text-xl font-bold">Edu Hub</h1>
            </Link>
          )}
        </div>

        {/* Navigation based on user role */}
        {role === "admin" && (
          <ul className="pt-6">
            {adminNavItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={({
                    isActive,
                  }) => `flex items-center gap-x-4 p-2 mb-2 rounded-md text-sm font-bold duration-150 hover:bg-secondary
                  ${isActive ? "bg-red-500 text-white" : "text-gray-700"}`}
                  onClick={handleMobileMenuItemClick} // Close mobile menu on item click
                >
                  {item.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {role === "instructor" && (
          <ul className="pt-6">
            {instructorNavItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={({
                    isActive,
                  }) => `flex items-center gap-x-4 p-2 mb-2 rounded-md text-sm font-bold duration-150 hover:bg-secondary
                  ${isActive ? "bg-red-500 text-white" : "text-gray-700"}`}
                  onClick={handleMobileMenuItemClick} // Close mobile menu on item click
                >
                  {item.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {role === "user" && (
          <ul className="pt-6">
            {students.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={({
                    isActive,
                  }) => `flex items-center gap-x-4 p-2 mb-2 rounded-md text-sm font-bold duration-150 hover:bg-secondary
                  ${isActive ? "bg-red-500 text-white" : "text-gray-700"}`}
                  onClick={handleMobileMenuItemClick} // Close mobile menu on item click
                >
                  {item.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* Last menu item */}
        <ul className="pt-6">
          {lastMenuItem.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({
                  isActive,
                }) => `flex items-center gap-x-4 p-2 mb-2 rounded-md text-sm font-bold duration-150 hover:bg-secondary
                ${isActive ? "bg-red-500 text-white" : "text-gray-700"}`}
                onClick={handleMobileMenuItemClick} // Close mobile menu on item click
              >
                {item.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-4 p-2 mb-2 rounded-md text-sm font-bold duration-150 hover:bg-secondary"
            >
              <BiLogInCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="h-screen overflow-y-auto flex-1 px-18">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
