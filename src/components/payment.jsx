import React, { useState, useEffect } from "react";
import axios from "axios";
import RazorpayCheckout from "react-razorpay";
import { server_url } from "@/src/config";

const Payment = () => {
  const [amount, setAmount] = useState(0);  // Dynamically set the payment amount
  const [orderId, setOrderId] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentRequest = async () => {
    const response = await axios.post(`${server_url}/create-order`, { amount });
    setOrderId(response.data.order_id);
  };

  const handlePaymentSuccess = async (paymentData) => {
    const response = await axios.post(`${server_url}/verify-payment`, paymentData);
    if (response.data.status === "success") {
      setPaymentSuccess(true);
    } else {
      console.error("Payment verification failed");
    }
  };

  return (
    <div>
      {/* Input for dynamically setting the payment amount */}
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handlePaymentRequest}>Pay Now</button>

      {orderId && (
        <RazorpayCheckout
          key={orderId}
          orderId={orderId}
          onSuccess={handlePaymentSuccess}
          onError={(error) => console.error(error)}
        />
      )}

      {paymentSuccess && <p>Payment Successful!</p>}
    </div>
  );
};

export default Payment;