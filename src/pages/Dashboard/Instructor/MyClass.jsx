import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";

const MyClass = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser, isLoading } = useUser();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/classes/${currentUser?.email}`)
      .then((res) => setClasses(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading]);
  return (
    <div>
      <div className="my-9">
        <h1 className="text-4xl text-center font-bold">My Class</h1>
        <div>
          <p className="text-[12px] text-center my-2">
            Here is your all class details.
          </p>
        </div>
      </div>

      <div className="p-9">
        {classes.length === 0 ? (
          <div className="text-center text-2xl font-bold mt-10">
            You dont have any class
          </div>
        ) : (
          <div>
            {classes.map((cls, index) => (
              <div key={index} className="mb-5 hover:ring ring-secondary duration-200 focus:ring rounded-lg">
                <div className="bg-white flex rounded-lg gap-8 shadow p-4">
                  <div>
                    <img
                      src={cls.image}
                      alt=""
                      className="max-h-[200px] max-w-[300px]"
                    />
                  </div>
                  <div className="w-full">
                    <h2 className="text-[20px] font-bold text-secondary border border-b pb-2 mb-2">
                      {cls.name}
                    </h2>
                    <div className="flex gap-14  items-center">
                      <div>
                        <h1 className="font-bold mb-3">Some Info</h1>
                        <h1 className="my-2">
                          Total Enrolled : {cls.totalEnrolled}
                        </h1>
                        <h1 className="my-2">
                          Aavailable Seats : {cls.availableSeats}
                        </h1>
                        <h1 className="my-2">
                          <span
                            className={`font-bold ${
                              cls.status === "pending"
                                ? "text-orange-500"
                                : cls.status === "checking"
                                ? "text-yellow-500"
                                : cls.status === "approved"
                                ? "text-green-500"
                                : "text-red-600"
                            }`}
                          >
                            {cls.status}
                          </span>
                        </h1>
                      </div>

                      <div className="">
                        <h1 className="mb-3">...........</h1>
                        <h1 className="my-2">Price : {cls.price}</h1>
                        <h1>
                          {cls.submitted
                            ? moment(cls.submitted).format("MMMM Do YYYY")
                            : "Not Found Any Data"}
                        </h1>
                      </div>

                      <div className="w-1/3">
                        <h1 className="font-bold mb-3">Action : </h1>
                        <button
                          onClick={() => handleFeedback(cls._id)}
                          className="px-3 bg-orange-400 font-bold py-1 text-white w-full rounded-lg"
                        >
                          View Feedback
                        </button>
                        <button className="px-3 bg-green-500 font-bold py-1 text-white w-full my-3 rounded-lg ">
                          View Details
                        </button>
                        <button onClick={()=>navigate(`/dashboard/update/${cls._id}`)} className="px-3 bg-secondary font-bold py-1 text-white w-full rounded-lg">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClass;
