
import React, { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast,ToastContainer } from 'react-toastify';
import Swal from "sweetalert2";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { currentUser } = useUser();
  console.log(currentUser)
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [hoveredCard, setHoverCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const  navigate  = useNavigate();

  const axiosSecure = useAxiosSecure();

  const handleHover = (index) => {
    setHoverCard(index);
  };

  useEffect(() => {
    axiosFetch
      .get("/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelected = async (id) => {
    console.log(id);
    if (!currentUser) {
       Swal.fire({
        title: "Please Login",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      navigate('/login')
     
      
    }
  
    try {
      const enrolledClassesRes = await axiosSecure.get(`/enrolled-classes/${currentUser?.email}`);
      const enrolledClasses = enrolledClassesRes.data;
      if (enrolledClasses.find(item => item.classes._id === id)) {
        return toast.error("Already enrolled");
      }
  
      const cartItemRes = await axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`);
      if (cartItemRes.data.classId === id) {
        return toast.error("Already selected");
      }
  
      const data = {
        classId: id,
        userMail: currentUser?.email,
        data: new Date()
      };
  
      const addToCartRes = await axiosSecure.post("/add-to-cart", data);
      console.log(addToCartRes.data);
      toast.success("Selected Successfully");
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }
  };
   //console.log(classes);
  
  return (
    <div>
      <div className="mt-20 pt-6">
        <h1 className=" text-4xl font-bold text-center dark:text-white text-secondary">
          Classes
        </h1>
      </div>
      <div className="my-28 w-[90%] mx-auto gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {classes.map((cls, index) => (
          <div
            key={index}
            className={`relative hover:-translate-y-2 duration-300 hover:ring-[2px] hover:ring-secondary w-64
            mx-auto ${cls.availableSeats < 1 ? "bg-red-400" : "bg-white"}
             dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="relative h-48">
              <div
                className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300
                 ${hoveredCard === index ? "opacity-60" : ""}`}
              />
              <img
                src={cls.image}
                alt=""
                className="object-cover w-full h-full"
              />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleSelected(cls._id)}
                    title={
                      role === "admin" || role === "instructor"
                        ? "Instructor/Admin Cant be able to select"
                          ? cls.availableSeats < 1
                          : "No Seat Available"
                        : "You can select classes"
                    }
                    disabled={
                      role === "admin" ||
                      role === "instructor" ||
                      cls.availableSeats < 1
                    }
                    className="px-4 py-2 text-white disabled:bg-red-400
                  bg-secondary duration-300 rounded-md hover:bg-red-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </Transition>
            </div>
            <div>
              {/* details */}
              <div className="px-6 py-2">
                <h3 className="font-semibold mb-2 dark:text-white">
                  {cls.name}
                </h3>
                <p className="text-gray-400 mb-5 dark:text-white">
                  Instructor : {cls.instructorName}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-600 text-xs dark:text-white">
                    Available Seat: {cls.availableSeats}
                  </span>
                  <span className="text-green-600 font-semibold dark:text-white">
                    ${cls.price}
                  </span>
                </div>
                <Link to={`/class/${cls._id}`}>
                  <button
                    className="px-4 py-2 mt-4 mb-1 w-full mx-auto text-white
                   disabled:bg-red-400  bg-secondary duration-300 rounded-md hover:bg-red-600"
                  >
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Classes;
