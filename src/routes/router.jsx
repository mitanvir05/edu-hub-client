import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCP from "../pages/Dashboard/Student/StudentCP";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import InstructorCp from "../pages/Dashboard/Instructor/InstructorCp";
import AddClass from "../pages/Dashboard/Instructor/AddClass";
import MyClass from "../pages/Dashboard/Instructor/MyClass";
import PendingClass from "../pages/Dashboard/Instructor/PendingClass";
import ApprovedClass from "../pages/Dashboard/Instructor/ApprovedClass";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import UpdateUser from "../pages/Dashboard/Admin/UpdateUser";
import ManageApplication from "../pages/Dashboard/Admin/ManageApplication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/class/:id",
        element: <SingleClass />,

        loader: ({ params }) =>
          fetch(`https://edu-hub1-server.vercel.app/class/${params.id}`),
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      //studnets routes
      {
        path: "student-cp",
        element: <StudentCP />,
      },
      {
        path: "enrolled-class",
        element: <EnrolledClasses />,
      },
      {
        path: "my-selected",
        element: <SelectedClass />,
      },
      {
        path: "my-payments",
        element: <MyPaymentHistory />,
      },
      {
        path: "apply-instructor",
        element: <AsInstructor />,
      },
      {
        path: "user/payment",
        element: <Payment />,
      },

      //instructor

      {
        path: "instructor-cp",
        element: <InstructorCp />,
      },
      {
        path: "add-class",
        element: <AddClass />,
      },
      {
        path: "my-class",
        element: <MyClass />,
      },
      {
        path: "my-pending",
        element: <PendingClass />,
      },
      {
        path: "my-approved",
        element: <ApprovedClass />,
      },

      //admin
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "manage-classes",
        element: <ManageClasses />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-application",
        element: <ManageApplication />,
      },
    
      {
        path: "/dashboard/update-user/:id",
        element: <UpdateUser />,
        loader: ({ params }) => {
          const url = `https://edu-hub1-server.vercel.app/users/${params.id}`;
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Bearer token not found in local storage');
            return Promise.reject(new Error('Bearer token not found in local storage'));
          }
          return fetch(url, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json());
        }
      }
    ],
  },
]);

export default router;
