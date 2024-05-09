import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
const KEY = import.meta.env.VITE_IMG_TOKEN;
const AddClass = () => {
  const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [image, setImage] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    //console.log(formData);
    const newData = Object.fromEntries(formData);
    formData.append("file", image);
    //console.log(newData)

    fetch(API_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          //console.log(data.data.display_url);
          newData.image = data.data.display_url;
          newData.instructorName = currentUser?.name;
          newData.instructorEmail = currentUser?.email;
          newData.status = "pending";
          newData.submitted = new Date();
          newData.totalEnrolled=0;
          axiosSecure.post('new-class',newData).then(res=>{
            alert("Succefully added new courses")
            
            console.log(res.data)
            navigate("/dashboard/my-class")
            e.target.reset();
          })

        }
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="my-10">
        <h1 className="text-center text-3xl font-bold">Add Your Course Here</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto bg-white rounded shadow p-6"
      >
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label
              className="mb-2 block text-gray-700 font-bold"
              htmlFor="name"
            >
              Course Name
            </label>
            <input
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              required
              placeholder="Course Name"
              name="name"
              id="name"
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-gray-700 font-bold"
              htmlFor="image"
            >
              Course Thumbnail
            </label>
            <input
              type="file"
              required
              name="image"
              onChange={handleImageChange}
              className="block mt-[5px] w-full border border-secondary shadow-sm
            rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary
             file:text-white file:mr-4 file:py-3 file:px-4"
            />
          </div>
        </div>

        <div>
          <h1 className="text-[12px] my-2 ml-2 text-secondary">
            You can not chnage your name and email.
          </h1>
          <div className="grid gap-3 grid-cols-2 ">
            {/* name */}
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="instructorName"
              ></label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                value={currentUser?.name}
                readOnly
                placeholder="Instructor Name"
                name="instructorName"
              />
            </div>

            {/* email */}
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="instructorEmail"
              ></label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                value={currentUser?.email}
                readOnly
                placeholder="Instructor Email"
                name="instructorEmail"
              />
            </div>
          </div>
        </div>
        {/* available seats */}
        <div className="grid grid-cols-2 w-full gap-3 items-center">
          <div className="mb-6">
            <label
              className="mb-2 block text-gray-700 font-bold"
              htmlFor="availableSeats"
            >
              Available Seats
            </label>
            <input
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              type="number"
              required
              placeholder="How many seats are available ?"
              name="availableSeats"
            />
          </div>
          {/* price */}
          <div className="mb-6">
            <label
              className="mb-2 block text-gray-700 font-bold"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
              type="number"
              required
              placeholder="Price "
              name="price"
            />
          </div>
        </div>

        {/* youtubr preview */}
        <div className="mb-6">
          <label
            className="mb-2 block text-gray-700 font-bold"
            htmlFor="videoLink"
          >
            YouTube Link
          </label>
          <p className="text-[12px] my-2 ml-2 text-secondary">
            Only YouTube videos supports
          </p>
          <input
            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
            type="text"
            required
            placeholder="Your course intro video"
            name="videoLink"
          />
        </div>
        {/* des */}
        <div className="mb-6">
          <label
            className="mb-2 block text-gray-700 font-bold"
            htmlFor="description"
          >
            Description About Your Course
          </label>

          <textarea
            className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-blue-500"
            type="text"
            required
            placeholder="Your course description"
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
  );
};

export default AddClass;
