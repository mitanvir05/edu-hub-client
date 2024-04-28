import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import img from "../../../assets/image/default profile.png";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const PopularTeacher = () => {
  const [instructors, setInstructors] = useState([]);
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    const fetchInstructor = async () => {
      const response = await axiosFetch.get("/popular-instructors");
      //console.log(response.data)
      setInstructors(response.data);
    };
    fetchInstructor();
  }, []);

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Our <span className="text-secondary">Amazing</span> Instructors
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
            autem?
          </p>
        </div>
      </div>
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

      </div> */}
      {instructors ? (
        <>
          <div className="grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] mx-auto">
            {instructors?.map((instructor, i) => (
              <div className="flex ml-3 dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md">
                <div className="flex-col flex gap-6 md:gap-8">
                  <img
                    className="rounded-full  border-4 border-gray-400 h-24 w-24 mx-auto"
                    src={instructor?.instructor?.photoURL || `${img}`}
                    alt=""
                  />
                  <div className=" flex flex-col text-center">
                    <p className="font-medium text-lg dark:text-white text-gray-900">
                      {instructor?.instructor?.name}
                    </p>
                    <p className="text-gray-700 whitespace-nowrap">
                      Instructor
                    </p>
                    <p className="text-gray-700 mb-4 whitespace-nowrap">
                      Total Students : {instructor?.totalEnrolled}
                    </p>
                  </div>
                </div>
                <div className=' flex justify-center gap-5'>
                    <p><FaLinkedin className='text-secondary' size={25}/></p>
                    <p><SiGmail className='text-secondary' size={25}/></p>
                  </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>No Instructor Available</p>
        </>
      )}
    </div>
  );
};

export default PopularTeacher;
