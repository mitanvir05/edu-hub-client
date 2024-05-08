import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import "./Payment.css";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPayment from "./CheckoutPayment";

const Payment = () => {
  const location = useLocation();
  console.log(location);
  const price = location?.state?.price;
  const cartItem = location?.state?.itemId;
  if (!price) {
    <Navigate to="dashboard/my-selected" />;
  }

  return (
    <div className="my-40 ">
      <Elements stripe={stripePromise}>
        <CheckoutPayment price={price} cartItem={cartItem}/>
      </Elements>
    </div>
  );
};

export default Payment;
