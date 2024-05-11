import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Card from "./Card";

const PopularClasses = () => {
  const axiosFetch = useAxiosFetch();

  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await axiosFetch.get("/classes");
      // Filter classes with status=approved
      const approvedClasses = response.data.filter(item => item.status === "approved");
      setClasses(approvedClasses);
    };
    fetchClasses();
  }, []);

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * 3;
  const endIndex = currentPage * 6;

  // Handle pagination
  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center dark:text-white">
          Our <span className="text-secondary">Popular</span> Classes
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-400">
            Discover Our Most Popular Classes! Join Thousands of Students Thriving
            in Our Engaging and Effective Educational Environment. Enroll Now
            for Success.
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.slice(startIndex, endIndex).map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`mr-2 px-3 py-1 ${currentPage === 1 ? 'bg-gray-200 text-gray-600' : 'bg-green-500 text-white'} rounded-md`}
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={endIndex >= classes.length}
          className={`px-3 py-1 ${endIndex >= classes.length ? 'bg-gray-200 text-gray-600' : 'bg-green-500 text-white'} rounded-md`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularClasses;
