import React, { useEffect, useState } from "react";
import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import useUser from "../../../../../hooks/useUser";

const Paginator = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded-lg ${
              page === currentPage ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

const MyPaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const totalItem = payments.length;
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

 

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payments]);

  useEffect(() => {
    axiosFetch
      .get(`/payment-history/${currentUser?.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser?.email]);

  const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full items-center h-screen">
      <div>
        <div className="text-center mt-6 mb-16">
          <p className="text-gray-500">Hey, {currentUser.name}</p>
          <h1 className="text-4xl text-secondary">My Payment History</h1>
          <p className="text-base text-gray-500">
            You can see your payment history here
          </p>
        </div>

        <div className="p-6">
          <div>
            <p className="font-bold">Total Payments: {payments.length}</p>
            <p className="font-bold">Total Paid : ${totalPaidAmount}</p>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">#</th>
                    <th className="text-left font-semibold">Amount</th>
                    <th className="text-left font-semibold">Transaction Id</th>
                    <th className="text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPayments.map((payment, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1 + (page - 1) * itemsPerPage}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.transactionId}</td>
                        <td>{payment.date}</td>
                      </tr>
                      <tr>
                        <td colSpan="4">
                          <hr className="my-1" />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Paginator
          totalItems={totalItem}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default MyPaymentHistory;


// import React, { useEffect, useState } from "react";
// import useAxiosFetch from "../../../../../hooks/useAxiosFetch";
// import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
// import useUser from "../../../../../hooks/useUser";

// const MyPaymentHistory = () => {
//   const axiosFetch = useAxiosFetch();
//   const axiosSecure = useAxiosSecure();
//   const { currentUser } = useUser();
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paginatedPayments, setPaginatedPayments] = useState([]);
//   const totalItem = payments.length;
//   const [page, setPage] = useState(1);
//   let totalPage = Math.ceil(totalItem / 5);
//   let itemsPerPage = 5;

//   const handleChange = (event, value) => {
//     setPage(value);
//   };
//   useEffect(() => {
//     const lastIndex = page * itemsPerPage;
//     const firstIndex = lastIndex - itemsPerPage;
//     const currentItems = payments.slice(firstIndex, lastIndex);
//     setPaginatedPayments(currentItems);
//   }, [page, payments]);

//   useEffect(() => {
//     axiosFetch
//       .get(`/payment-history/${currentUser?.email}`)
//       .then((res) => {
//         setPayments(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [currentUser?.email]);

//   const totalPaidAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="text-center mt-6 mb-16">
//         <p className="text-gray-500">Hey, {currentUser.name}</p>
//         <h1 className="text-4xl text-secondary">My Payment History</h1>
//         <p className="text-base text-gray-500">
//           You can see your payment history here
//         </p>
//       </div>

//       {/* table */}
//       <div className="p-6">
//   <div>
//     <p className="font-bold">Total Payments: {payments.length}</p>
//     <p className="font-bold">Total Paid : ${totalPaidAmount}</p>
//   </div>

//   <div className="md:w-1/2 p-5">
//     <div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-x-auto">
//       <table className="w-full">
//         <thead>
//           <tr>
//             <th className="text-left font-semibold">#</th>
//             <th className="text-left font-semibold">Amount</th>
//             <th className="text-left font-semibold">Transaction Id</th>
//             <th className="text-left font-semibold">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedPayments.map((payment, index) => (
//             <React.Fragment key={index}>
//               <tr>
//                 <td>{index + 1}</td>
//                 <td>{payment.amount}</td>
//                 <td>{payment.transactionId}</td>
//                 <td>{payment.date}</td>
//               </tr>
//               <tr>
//                 <td colSpan="4"><hr className="my-1" /></td>
//               </tr>
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// };

// export default MyPaymentHistory;
