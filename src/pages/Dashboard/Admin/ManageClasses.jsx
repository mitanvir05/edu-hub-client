import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemPerPage);

  useEffect(() => {
    axiosFetch
      .get("classes-manage")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    if (lastIndex > classes.length) {
      lastIndex = classes.length;
    }

    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, totalPage]);

  const handleApprove = (id) => {
    axiosSecure
      .patch(`/change-status/${id}`, { status: "approved" })
      .then((res) => {
        alert("Course approve succesfully");
        console.log(res.data);
        const updateClass = classes.map((cls) =>
          cls._id === id ? { ...cls, status: "approved" } : cls
        );
        setClasses(updateClass);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deny it it!",
    }).then(async (result) => { // Make the function async
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/change-status/${id}`, {
            status: "pending",
          });
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Rejected!",
              text: "Course has been rejected.",
              icon: "success",
            });
            const updateClass = classes.map((cls) =>
              cls._id === id ? { ...cls, status: "pending" } : cls
            );
            setClasses(updateClass);
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl text-secondary text-center my-10">
        Manage Class
      </h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left font-semibold">#</th>
            <th className="text-left font-semibold">Courses</th>
            <th className="text-left font-semibold">Instructor Name</th>
            <th className="text-left font-semibold">Status</th>
            <th className="text-left font-semibold">Date</th>
            <th className="text-left font-semibold">Actions</th>
          </tr>
        </thead>
        {/* Move tbody here */}
        <tbody>
          {classes.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-2xl font-bold">
                No Classes Found
              </td>
            </tr>
          ) : (
            paginatedData.map((cls, index) => {
              const letIndex = (page - 1) * itemPerPage + index + 1;
              return (
                <tr key={cls._id}>
                  <td className="py-4">{letIndex}</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <img src={cls?.image} alt="" className="w-16 h-16 mr-4" />
                      <span>{cls?.name}</span>
                    </div>
                  </td>
                  <td>{cls?.instructorName}</td>
                  <td className="py-4 ">{cls?.status}</td>
                  <td className="py-4">
                    <p className="text-green-800 text-sm">
                      {moment(cls.submitted).format("YYYY-MM-DD")}
                    </p>
                  </td>
                  <td className="py-6 flex gap-3">
                    <button
                      onClick={() => handleApprove(cls._id)}
                      className="text-[12px] cursor-pointer disabled:bg-green-500 bg-green-500 py-1 rounded-md px-2 text-white"
                    >
                      Approve
                    </button>
                    <button
                      disabled={
                        cls.status === "rejected" || cls.status === "checking"
                      }
                      onClick={() => handleReject(cls._id)}
                      className="text-[12px] cursor-pointer disabled:bg-red-500 bg-red-500 py-1 rounded-md px-2 text-white"
                    >
                      Reject
                    </button>
                    <button className="text-[12px] cursor-auto disabled:bg-green-500 bg-green-500 py-1 rounded-md px-2 text-white">
                      Approve
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
