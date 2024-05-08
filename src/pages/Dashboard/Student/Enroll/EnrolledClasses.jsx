import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/enrolled-classes/${currentUser?.email}`)
      .then((res) => {
        console.log("Data from API:", res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
   
    <div>
  <h1 className="text-2xl my-6 p-3">Enrolled Classes</h1>
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
    {data.map((item, index) => (
      <div key={index} className="bg-white shadow-md rounded-3xl overflow-hidden">
        <img
          src={item.classes.image}
          alt=""
          className="w-full h-40 sm:h-52 object-cover"
        />
        <div className="p-4">
          <h1 className="text-xl font-semibold">{item.classes.name}</h1>
          <p className="text-gray-600">{item.classes.instructorName}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="font-bold text-gray-500">{item.classes.price}$</p>
            <button className="bg-secondary text-white px-3 py-2 rounded-xl font-bold shadow-lg">
              View
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default EnrolledClasses;

// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import useUser from "../../../../hooks/useUser";

// const EnrolledClasses = () => {
//   const [data, setData] = useState([]);
//   const axiosSecure = useAxiosSecure();
//   const { currentUser } = useUser();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosSecure
//       .get(`/enrolled-classes/${currentUser?.email}`)
//       .then((res) => {
//         console.log("Data from API:", res.data);
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl my-6">Enrolled Classes</h1>
//       <div>
//        {
//         data.map((item,i)=>(
//             <div key={i}>
//               <h1>{item.classes.name}</h1>
//             </div>
//         ))
//        }
//       </div>
//     </div>
//   );
// };

// export default EnrolledClasses;
