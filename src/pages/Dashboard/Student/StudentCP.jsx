import React from "react";
import useUser from "../../../hooks/useUser";
import welcomeImg from "../../../assets/dashboard/welcome.png";
import { Link } from "react-router-dom";
const StudentCP = () => {
  const { currentUser } = useUser();

  return (
    <div className="h-screen flex justify-center items-center p-2">
      <div>
        <div>
          <div>
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={welcomeImg}
              alt=""
              className="h-[200px] placeholder:blur"
            />
          </div>
          <h1 className="text-4xl capitalize font-bold">
            Hi,{" "}
            <span className="text-secondary items-stretch">
              {currentUser?.name}{" "}
            </span>{" "}
            Welcome to the Dashboard
          </h1>
          <p className="text-base text-center py-2">
            Hey, This is the simple dashboard for you .
          </p>
          <div className="text-center">
            <h1 className="font-bold">You can jump any page from here</h1>
            <div className="flex items-center justify-center my-4 gap-3 flex-wrap">
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/enrolled-class">My Enroll</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/my-selected">My Selected</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/my-payments">Payments History</Link>
              </div>
              <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                <Link to="/dashboard/apply-instructor">Apply For Instructors</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCP;
