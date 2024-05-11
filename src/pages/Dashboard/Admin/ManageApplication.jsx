import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5); // Change this value to set the number of applications per page
  const axiosFetch = useAxiosFetch();

  useEffect(() => {
    axiosFetch
      .get(`/applied`)
      .then((res) => {
        setApplications(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Pagination Logic
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(
    indexOfFirstApplication,
    indexOfLastApplication
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto my-10 p-5">
      <h1 className="text-3xl font-bold mb-3">Application for Instructor :</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Experience</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2">{item?.name}</td>
              <td className="border px-4 py-2">{item?.email}</td>
              <td className="border px-4 py-2">{item?.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex">
            {Array.from(
              { length: Math.ceil(applications.length / applicationsPerPage) },
              (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => paginate(i + 1)}
                    className={`${
                      currentPage === i + 1
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    } px-4 py-2 rounded-md mr-2`}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ManageApplication;
