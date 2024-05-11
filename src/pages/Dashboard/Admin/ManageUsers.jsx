import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

const ManageUsers = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  useEffect(() => {
    axiosFetch
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/delete-user/${id}`)
      .then((res) => {
        alert("User deleted successfully");
        // Update users state after successful deletion
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getUserRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "text-green-500";
      case "instructor":
        return "text-yellow-500";
      case "user":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl text-center font-bold my-7">Manage Users</h1>
      <div className="table-container">
        <table className="w-full table-fixed">
          {/* Table Header */}
          <thead className="border-b font-medium dark:border-neutral-500 p-5">
            <tr className="p-">
              <th className="text-left font-semibold">#</th>
              <th className="text-left font-semibold">Name</th>
              <th className="text-left font-semibold">Email</th>
              <th className="text-left font-semibold">Role</th>
              <th className="text-left font-semibold">Update</th>
              <th className="text-left font-semibold">Delete</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-2xl font-bold">
                  No user found
                </td>
              </tr>
            ) : (
              currentUsers.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td className={getUserRoleColor(user?.role)}>{user?.role}</td>
                    <td>
                      <span
                        onClick={() =>
                          navigate(`/dashboard/update-user/${user._id}`)
                        }
                        className="inline-flex items-center gap-2 cursor-pointer bg-green-500 rounded-lg px-2 text-white"
                      >
                        Update <GrUpdate className="text-white" />
                      </span>
                    </td>
                    <td>
                      <span
                        onClick={() => handleDelete(user._id)}
                        className="inline-flex items-center gap-2 cursor-pointer bg-red-500 rounded-lg px-2 text-white"
                      >
                        Delete <MdDeleteForever className="text-white" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5">
                      <hr />
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-5">
        {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-2 px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-green-500" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
