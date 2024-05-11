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

  useEffect(() => {
    axiosFetch
      .get("classes-manage")
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    const firstIndex = (page - 1) * itemPerPage;
    const lastIndex = firstIndex + itemPerPage;
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginatedData(currentData);
  }, [page, classes]);

  const totalPages = Math.ceil(classes.length / itemPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleApprove = (id) => {
    axiosSecure
      .patch(`/change-status/${id}`, { status: "approved" })
      .then(() => {
        alert("Course approved successfully");
        // Fetch updated data
        axiosFetch.get("classes-manage").then((res) => {
          setClasses(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deny it!",
    });
    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/change-status/${id}`, {
          status: "pending",
        });
        Swal.fire({
          title: "Rejected!",
          text: "Course has been rejected.",
          icon: "success",
        });
        // Fetch updated data
        axiosFetch.get("classes-manage").then((res) => {
          setClasses(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className=" p-5">
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
        <tbody>
  {paginatedData.map((cls, index) => {
    const indexOnPage = (page - 1) * itemPerPage + index + 1;
    const statusColor =
      cls.status === "approved" ? "text-green-500" : "text-red-500";
    return (
      <>
        <tr key={cls._id}>
          <td className="py-4">{indexOnPage}</td>
          <td className="py-4">
            <div className="flex items-center">
              <img src={cls?.image} alt="" className="w-16 h-16 mr-4" />
              <span>{cls?.name}</span>
            </div>
          </td>
          <td>{cls?.instructorName}</td>
          <td className={`py-4 ${statusColor}`}>{cls?.status}</td>
          <td className="py-4">
            <p className="text-green-800 text-sm">
              {moment(cls?.submitted).format("YYYY-MM-DD")}
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
          </td>
        </tr>
        <tr>
          <td colSpan="6"><hr/></td>
        </tr>
      </>
    );
  })}
</tbody>

      </table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                page === index + 1 ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
