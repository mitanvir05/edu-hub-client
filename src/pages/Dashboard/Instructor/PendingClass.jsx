import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingClass = () => {
  const [pendingClasses, setPendingClasses] = useState([]);
  const { currentUser, isLoading } = useUser();

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => {
        // Filter classes with status "pending"
        const pendingClasses = res.data.filter(
          (cls) => cls.status === "pending"
        );
        setPendingClasses(pendingClasses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser?.email, isLoading]);

  return (
    <div>
        <h1 className="text-4xl font-bold text-center my-20">Pending <span className="text-secondary">Class</span></h1>
        <div className="p-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pendingClasses.length === 0 ? (
        <p className="text-4xl font-bold text-center my-20">
          There is no pending class.
        </p>
      ) : (
        pendingClasses.map((cls, index) => (
          <div key={index} className="card glass">
            <figure>
              <img src={cls.image} alt="class" />
            </figure>
            <div className="card-body">
              <h2 className="text-xl font-semibold">Course Name: {cls.name}</h2>
              <p className="text-gray-600 font-semibold">Description: {cls.description}</p>
              <p className="text-gray-600 font-semibold">Status: <span className="text-yellow-500">{cls.status}</span></p>
              
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default PendingClass;
