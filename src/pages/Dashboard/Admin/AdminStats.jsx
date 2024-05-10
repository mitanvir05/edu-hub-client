import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiOutlineUserGroup } from "react-icons/hi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";


const AdminStats = ({ users }) => {
  const [data, setData] = useState();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/admin-stats")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-8 sm:grid-cols-4 sm:px-8">
        <div className="flex bg-white borderr rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-lime-500">
            <HiOutlineUserGroup className="h-12 w-12 text-white"/>
          </div>
          <div className="px-4 text-gray-700">
            <h1 className="text-sm tracking-wider ">Total Member : </h1>
            <p className="text-3xl">{users.length}</p>
          </div>
        </div>
        <div className="flex bg-white borderr rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-green-600">
            <SiGoogleclassroom className="h-12 w-12 text-white"/>
          </div>
          <div className="px-4 text-gray-700">
            <h1 className="text-sm tracking-wider ">Approved Classes : </h1>
            <p className="text-3xl">{data?.approvedClasses}</p>
          </div>
        </div>
        <div className="flex bg-white borderr rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-sky-500">
            <FaChalkboardTeacher className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h1 className="text-sm tracking-wider ">Instructor : </h1>
            <p className="text-3xl">{data?.instructors}</p>
          </div>
        </div>
        <div className="flex bg-white borderr rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-red-600">
            <MdOutlinePendingActions className="h-12 w-12 text-white" />
          </div>
          <div className="px-4 text-gray-700">
            <h1 className="text-sm tracking-wider ">Pending Class : </h1>
            <p className="text-3xl">{data?.pendingClasses}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
