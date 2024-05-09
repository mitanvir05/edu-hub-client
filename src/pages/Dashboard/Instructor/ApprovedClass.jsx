import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUser from '../../../hooks/useUser';

const ApprovedClass = () => {
    const [approvedClasses, setApprovedClasses] = useState([]);
  const { currentUser, isLoading } = useUser();

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => {
        // Filter classes with status "pending"
        const approvedClasses = res.data.filter((cls) => cls.status === "approved");
        setApprovedClasses(approvedClasses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser?.email, isLoading]);

  return (
    <div>
        <h1 className="text-4xl font-bold text-center my-20">Approved <span className='text-secondary'>Course</span></h1>
        <div className="p-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {approvedClasses.length === 0 ? (
        <p className="text-4xl font-bold text-center my-20">
          There is no approved class.
        </p>
      ) : (
        approvedClasses.map((cls, index) => (
          <div key={index} className="card glass">
            <figure>
              <img src={cls.image} alt="class" />
            </figure>
            <div className="card-body">
              <h2 className="text-xl font-semibold">Course Name: {cls.name}</h2>
              <p className="text-gray-600 font-semibold">Description: {cls.description}</p>
              <p className="text-gray-600 font-semibold">Status: <span className="text-secondary">{cls.status}</span></p>
              
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default ApprovedClass;