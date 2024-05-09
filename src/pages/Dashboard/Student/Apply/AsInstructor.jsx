import React, { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AsInstructor = () => {
  const { currentUser } = useUser();
  const [sumittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();
const navigate =useNavigate()
  useEffect(() => {
    axiosFetch
      .get(`/applied-instructors/${currentUser?.email}`)
      .then((res) => {
        //console.log(res.data);
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;

    const data = {
      name,
      email,
      experience,
    };

    axiosFetch
      .post(`/as-instructor`, data)
      .then((res) => {
        console.log(res.data);
        alert("Success");
        navigate('/dashboard/student-cp')
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="my-20">
      <div>
        {!sumittedData?.name && (
          <div className="md:w-1/2 p-5">
            <form onSubmit={onSubmit}>
              <div className=" w-full flex">
                <div className="mb-4 w-full">
                  <label className="text-gray-700" htmlFor="name">
                    Name
                  </label>
                </div>
                <div className="flex items-center mt-1">
                  <FaUser className="text-gray-500" />
                  <input
                    className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                    disabled
                    readOnly
                    name="name"
                    type="text"
                    id="name"
                    defaultValue={currentUser?.name}
                  />
                </div>
              </div>

              {/* email */}

              <div className=" w-full flex ">
                <div className="mb-4 w-full">
                  <label className="text-gray-700" htmlFor="name">
                    Email
                  </label>
                </div>
                <div className="flex items-center mt-1">
                  <MdOutlineEmail className="text-gray-500" />
                  <input
                    className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                    disabled
                    readOnly
                    name="email"
                    type="email"
                    id="email"
                    defaultValue={currentUser?.email}
                  />
                </div>
              </div>

              {/* exp */}
              <div className=" w-full flex">
                <div className="mb-4 w-full">
                  <label className="text-gray-700" htmlFor="name">
                    Experience
                  </label>
                </div>
                <div className="flex items-center mt-1">
                  <textarea
                    className="ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none"
                    name="experience"
                    id="experience"
                    placeholder="Type here"
                  ></textarea>
                </div>
              </div>
              <div className="w-full mt-6 ">
                <button
                  className=" hover:bg-orange-400 text-white px-3 py-3 bg-secondary justify-center items-center w-full rounded-lg"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsInstructor;
