import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router-dom";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateUser = () => {
  const { user } = useAuth();
  const userCredentials = useLoaderData();
  console.log(userCredentials);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  //console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData);
    axiosSecure
      .put(`/update-user/${userCredentials?._id}`, updatedData)
      .then((res) => {
        if(res.data.modifiedCount>0){
            alert("Updated Successfully")
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="text-center text-4xl font-boldmt-5">
        Update : {user?.displayName}
      </h1>
      <p>Change Details About : {userCredentials?.name}</p>
      <section>
        <div className="mx-auto py-16 sm:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:p-12 ">
            <form
              onSubmit={handleSubmit}
              className="mx-auto bg-white rounded shadow p-6"
            >
              {/* name phone */}
              <div className="grid grid-cols-2 w-full gap-3 items-center">
                <div className="mb-6">
                  <label
                    className="mb-2 block text-gray-700 font-bold"
                    htmlFor="name"
                  >
                     Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                    type="text"
                    required
                    value={userCredentials?.name}
                    placeholder=" Name"
                    name="name"
                    id="name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-gray-700 font-bold"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                    type="number"
                    required
                    placeholder="Phone Number"
                    name="phone"
                    id="phone"
                    
                    
                  />
                </div>
              </div>
              {/* email skill */}

              <div>
                <div className="grid gap-3 grid-cols-2 ">
                  <div className="mb-6">
                    <label
                      className="mb-2 block text-gray-700 font-bold"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                      type="email"
                      required
                      value={userCredentials?.email}
                      placeholder=" Email"
                      name="email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="mb-2 block text-gray-700 font-bold"
                      htmlFor="phone"
                    >
                      Skill
                    </label>
                    <input
                      className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                      type="text"
                      required
                      placeholder="Skill"
                      name="skill"
                      value={userCredentials?.skill}
                    />
                  </div>
                </div>
              </div>
              {/* address photo */}
              <div className="grid gap-3 grid-cols-2 ">
                <div className="mb-6">
                  <label
                    className="mb-2 block text-gray-700 font-bold"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                    type="text"
                    required
                    value={userCredentials?.address}
                    placeholder=" Address"
                    name="address"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-gray-700 font-bold"
                    htmlFor="photo"
                  >
                    Photo URL
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                    type="text"
                    required
                    placeholder="Photo Url"
                    name="photo"
                    value={userCredentials?.photo}
                  />
                </div>
              </div>
              {/* role */}
              <h1>Please Select a Role</h1>
              <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-3">
  {/* User */}
  <div>
    <input
    id="option1"
      type="radio"
      className="peer sr-only"
      value="user"
      tabIndex="-1"
      name="option"
      defaultChecked={userCredentials?.role === "user"}
    />
    <label
      tabIndex="0"
      htmlFor="option1"
      className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
    >
      <span className="text-sm font-medium">User</span>
    </label>
  </div>
  {/* Admin */}
  <div>
    <input
    id="option2"
      type="radio"
      className="peer sr-only"
      value="admin"
      tabIndex="-1"
      name="option"
      defaultChecked={userCredentials?.role === "admin"}
    />
    <label
      tabIndex="0"
      htmlFor="option2"
      className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
    >
      <span className="text-sm font-medium">Admin</span>
    </label>
  </div>
  {/* Instructor */}
  <div>
    <input
    id="option3"
      type="radio"
      className="peer sr-only"
      value="instructor"
      tabIndex="-1"
      name="option"
      defaultChecked={userCredentials?.role === "instructor"}
    />
    <label
      tabIndex="0"
      htmlFor="option3"
      className="block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white"
    >
      <span className="text-sm font-medium">Instructor</span>
    </label>
  </div>
</div>


              {/* About */}
              <div className="mb-6">
                <label
                  className="mb-2 block text-gray-700 font-bold"
                  htmlFor="description"
                >
                  About user
                </label>

                <textarea
                  className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-blue-500"
                  type="text"
                  required
                  placeholder="About user"
                  name="description"
                  rows={4}
                />
              </div>

              {/* btn */}

              <div className="text-center w-full">
                <button
                  type="submit"
                  className="bg-secondary w-full hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateUser;
