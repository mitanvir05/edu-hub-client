import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/instructors",
            element:<Instructors></Instructors>
        },
        {
            path:"/classes",
            element:<Classes></Classes>
        },
        {
          path:"/login",
          element:<Login/>
        }
      ]
    },
  ]);

export default router;