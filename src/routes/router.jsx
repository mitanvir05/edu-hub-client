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
          fetch(`http://localhost:3000/class/${params.id}`),
      },
    ],
  },


  {
    path:"/dashboard",
    element:<DashboardLayout/>,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      //studnets routes
      {
        path:"student-cp",
        element:<StudentCP/>
      },
      {
        path:"enrolled-class",
        element:<EnrolledClasses/>
      },
      {
        path:"my-selected",
        element:<SelectedClass/>
      },
      {
        path:"my-payments",
        element:<MyPaymentHistory/>
      },
      {
        path:"apply-instructor",
        element:<AsInstructor/>
      },
      {
        path:"user/payment",
        element:<Payment/>
      },

      //instructor

      {
        path:"instructor-cp",
        element:<InstructorCp/>

      },
      {
        path:"add-class",
        element:<AddClass/>

      },
      {
        path:"my-class",
        element:<MyClass/>

      },

    ]
  },
]);

export default router;
