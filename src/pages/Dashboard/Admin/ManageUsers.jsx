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

  const handleDelete = (id)=>{
    axiosSecure
     .delete(`/delete-user/${id}`)
     .then((res) => {
      alert("User deleted successfully")
        console.log(res.data);
      })
     .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl text-center font-bold my-7">Manage Users</h1>
      <div>
        <table className="w-full">
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
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-2xl font-bold">
                  No user found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td>{index + 1}</td>
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
    </div>
  );
};

export default ManageUsers;
