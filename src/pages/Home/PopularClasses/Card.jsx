import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const {
    _id,
    name,
    image,
    price,
    availableSeats,
    totalEnrolled,
  } = item;
  console.log(item);

  return (
    <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4">
      <img src={image} alt="" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{name}</h2>

        <p className="text-black text-base dark:text-white">
          Available Seats : {availableSeats}
        </p>
        <p className="text-black dark:text-white text-base">Total Students : {totalEnrolled}</p>
        <p className="text-black dark:text-white text-base">Price : ${price}</p>
        <div className="text-center px-2 py-2 rounded-md w-full bg-secondary text-white mt-2 font-bold">
          <Link to={`/classes/${_id}`}>
            Select
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
