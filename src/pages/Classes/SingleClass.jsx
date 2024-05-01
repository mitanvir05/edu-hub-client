import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { MdOutlinePriceChange } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import useUser from "../../hooks/useUser";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast,ToastContainer } from 'react-toastify';

const SingleClass = () => {
  // Fetching course data using useLoaderData
  const course = useLoaderData();

  // Log course data for debugging
  console.log("Course Data:", course);

  // Return null if course data is not available
  if (!course) {
    console.log("Course data not available.");
    return null;
  }

   // Destructuring course data for ease of use
   const {
    name,
    image,
    availableSeats,
    price,
    description,
    instructorName,
    instructorEmail,
    totalEnrolled,
  
  } = course;

  
const { currentUser } = useUser();
  //console.log(currentUser?.role)
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();




  const handleEnroll = async (id) => {
    console.log("Enrolling for class with ID:", id);
    
    // Check if currentUser exists
    if (!currentUser) {
      console.log("User not logged in.");
      return toast.error("Please Login");
    }
  
    try {
      // Fetch enrolled classes for the current user
      const enrolledClassesRes = await axiosSecure.get(`/enrolled-classes/${currentUser.email}`);
      const enrolledClasses = enrolledClassesRes.data;
      
      // Check if user is already enrolled in the class
      if (enrolledClasses.find(item => item.classes._id === id)) {
        //console.log("User is already enrolled in this class.");
        return toast.error("Already enrolled");
      }
  
      // Check if the class is already in the cart
      const cartItemRes = await axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`);
      if (cartItemRes.data.classId === id) {
        //console.log("Class is already in the cart.");
        return toast.error("Already selected");
      }
  
      // Add class to the cart
      const data = {
        classId: id,
        userMail: currentUser.email,
        data: new Date()
      };
      const addToCartRes = await axiosSecure.post("/add-to-cart", data);
      //console.log("Class added to cart:", addToCartRes.data);
      
      // Show success toast
      toast.success("Selected Successfully");
    } catch (error) {
      // Log and show error toast
      //console.error("Error while enrolling:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="font-medium max-w-screen-2xl p-2 text-gray-800 dark:text-white text-lg leading-[27px] w-90% mx-auto">
        {/* Course details */}
        <div className="bg-secondary text-white py-10 mt-20 section-padding bg-cover bg-no-repeat ">
          <div className="text-center">
            <h1 className="text-3xl"> Course Details</h1>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row">
        <div className=" md:w-1/2 ">
          {/* Content for the first portion */}
          <div>
            <img className="w-full p-4" src={image} />
            <p className="text-4xl font-semibold px-2 py-5 mt-5">{name}</p>
          </div>
          <div className="p-2">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Instructor Name:</span>
              {instructorName}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Instructor Email:</span>
              {instructorEmail}
            </p>
          </div>
          <div className="p-2">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Description:</span> {description}
            </p>
          </div>
        </div>
        <div className=" md:w-1/2">
          {/* Content for the second portion */}
          <div className="p-2">
            <video controls className="w-full mx-auto p-2">
              <source src='youtube.com/feed' type="video/mp4" />
              Your browser does not support the video .
            </video>
            <div className="p-2">
            <button
                    onClick={() => handleEnroll(course._id)}
                    title={
                      role === "admin" || role === "instructor"
                        ? "Instructor/Admin Cant be able to select"
                          ? course.availableSeats < 1
                          : "No Seat Available"
                        : "You can select classes"
                    }
                    disabled={
                      role === "admin" ||
                      role === "instructor" ||
                      course.availableSeats < 1
                    }
                    className="px-4 py-2 w-full text-white disabled:bg-red-400
                  bg-secondary duration-300 rounded-md hover:bg-red-700"
                  >
                    Enroll Now
                  </button>
            </div>
          </div>
          <div className="justify-between items-center  p-4 gap-5 flex ">
            <p className="block text-gray-700 font-bold text-xl">
               <MdOutlinePriceChange size={30} className="inline-block mr-2 " />
              Price
            </p>
            <p className="block font-semibold text-xl text-secondary">${price}</p>
          </div>
          <div className="justify-between items-center  p-4 gap-5 flex ">
            <p className="block text-gray-700 font-bold text-xl">
               <FaChalkboardTeacher size={30} className="inline-block mr-2 " />
              Instructor
            </p>
            <p className="block font-semibold text-xl text-secondary">{instructorName}</p>
          </div>
          <div className="justify-between items-center  p-4 gap-5 flex ">
            <p className="block text-gray-700 font-bold text-xl">
               <MdEventAvailable size={30} className="inline-block mr-2 " />
              Aavailable Seats
            </p>
            <p className="block font-semibold text-xl text-secondary">{availableSeats}</p>
          </div>
          <div className="justify-between items-center  p-4 gap-5 flex ">
            <p className="block text-gray-700 font-bold text-xl">
               <MdOutlineMenuBook size={30} className="inline-block mr-2 " />
              Total Enrolled
            </p>
            <p className="block font-semibold text-xl text-secondary">{totalEnrolled}</p>
          </div>
          <div className="justify-between items-center  p-4 gap-5 flex ">
            <p className="block text-gray-700 font-bold text-xl">
               <MdLanguage size={30} className="inline-block mr-2 " />
              Language
            </p>
            <p className="block font-semibold text-xl text-secondary">English</p>
          </div>
          
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SingleClass;