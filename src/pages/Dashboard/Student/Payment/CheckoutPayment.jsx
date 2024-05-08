import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import { Navigate } from "react-router-dom";
const CheckoutPayment = ({ price, cartItem }) => {
  const URL = `http://localhost:3000/payment-info?${
    cartItem && `classId=${cartItem}`
  }`;

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  if (price < 0 || !price) {
    return <Navigate to="dashboard/my-selected" replace />;
  }
  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classesId = res.data.map((item) => item._id);
        setCart(classesId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   console.log(cart)

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    });
  }, []);
  const handleSubmit = async (event) => {
    setMessage("");
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    if (error) {
      console.log("[error]", error);
      setMessage(error.message);
    } else {
      console.log("[paymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.displayName || "unknown",
            email: currentUser?.email || "Anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("[confirmError]", confirmError);
    } else {
      console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const transactionId = paymentIntent.id;
        const paymentMethod = paymentIntent.payment_method;
        const amount = paymentIntent.amount / 100;
        const currency = paymentIntent.currency;
        const paymentStatus = paymentIntent.status;
        const userName = currentUser?.name;
        const userEmail = currentUser?.email;

        const data = {
          transactionId,
          paymentMethod,
          amount,
          currency,
          paymentStatus,
          userName,
          userEmail,
          classesId: cartItem ? [cartItem] : cart,
          date: new Date(),
        };
        // console.log(data)
        fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (
              res.deletedResult.deletedCount > 0 &&
              res.paymentResult.insertedId &&
              res.updatedResult.modifiedCount > 0
            ) {
              setSucceeded("Payment Successful, You Can Access Your Classes.");
            } else {
              setSucceeded("Payment Failed, Please Try Again.");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      {succeeded && <Navigate to="/dashboard/enrolled-class" replace />}
      <div>
        <h1 className="text-center font-bold">
          Payment Amount : <span className="text-secondary">{price}$</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-7">
        <CardElement
          className="w-96  text-center"
          options={{
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invaid: {
              color: "#9e2146",
              iconColor: "#fa755a",
              cvc: {
                color: "#424770",
              },
              expiry: {
                color: "#424770",
              },
              postalCode: {
                color: "#424770",
              },
            },
          }}
        />
        <button
          className="text-xl rounded-md hover:bg-secondary
           text-white font-semibold w-64 mt-10 p-2 bg-emerald-800"
          type="submit"
          disabled={isLoading || !stripe || !clientSecret}
        >
          Pay
        </button>
        {message && <p className="text-red-500">{message}</p>}
        {succeeded && <p className="text-green-500">{succeeded}</p>}
      </form>
    </>
  );
};

export default CheckoutPayment;
