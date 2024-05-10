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
        console.log(res.data);
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

  return (
    <div className="p-5">
      <h1 className="text-4xl text-center font-bold my-7">Manage Users</h1>
      <div className="table-container">
        <table className="w-full table-fixed">
          <thead className="border-b font-medium dark:border-neutral-500 p-5">
            <tr className="p-">
              <th className="text-left font-semibold">#</th>
              <th className="text-left font-semibold">Name</th>
              <th className="text-left font-semibold">Role</th>
              <th className="text-left font-semibold">Update</th>
              <th className="text-left font-semibold">Delete</th>
            </tr>
          </thead>
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
                    <td>{user?.role}</td>
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
      <ul className="flex justify-center mt-5">
        <li
          className={`cursor-pointer mx-2 ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </li>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
          (_, index) => (
            <li
              key={index}
              className={`cursor-pointer mx-2 ${
                currentPage === index + 1 ? "text-blue-500" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </li>
          )
        )}
        <li
          className={`cursor-pointer mx-2 ${
            currentPage === Math.ceil(users.length / usersPerPage)
              ? "opacity-50 pointer-events-none"
              : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default ManageUsers;
