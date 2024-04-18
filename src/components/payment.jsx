import React, { useEffect, useState } from "react";
// import logo from "assets/images/logo/logo-white.png";
// import logo from "../public/assets/images/logo/logo-white.png";
import axios from "axios";
import { server_url } from "@/src/config";

function Payment({
  data,
  amount,
  type = "flight",
  setLoading,
  btnClass = null,
}) {
  let [toggle, setToggle] = useState(false);
  console.log(data);
  // razorpay inport
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    setLoading(true);
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
    setLoading(false);
  }, []);

  const [metaData, setmetadata] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const getammount = () => amount;

  async function displayRazorpayPaymentSdk() {
    setLoading(true);
    let reqdata = {
      data: data,
      metadata: { ...metaData, amount: getammount() },
      type: type,
    };
    // console.log(getammount());
    console.log(reqdata.metadata.amount);
    const result = await axios.post(server_url + "/razorpay_order", reqdata);

    if (!result) {
      alert("Server error. please check are you onlin?");
      return;
    }

    console.log(result);
    const {
      merchantId = null,
      amount = null,
      currency = null,
      orderId = null,
    } = result.data.metadata;

    const options = {
      key: merchantId,
      amount: parseInt(amount),
      currency: currency,
      name: "Razorpay Testing",
      description: "Test Transaction",
      // image: { logo },
      order_id: orderId,
      callback_url: server_url + "/razorpay_callback",
      // handler: function (response) {
      //   alert("pay id", response.razorpay_payment_id);
      //   alert("order id", response.razorpay_order_id);
      //   alert("pay signature", response.razorpay_signature);
      // },
      redirect: true,
      prefill: metaData,
      notes: {
        address: "None",
      },
      theme: {
        color: "#61dafb",
      },
    };

    console.log(options);
    const paymentObject = new window.Razorpay(options);
    setLoading(false);
    paymentObject.open();
  }

  return (
    <div className="payment">
      <div className="header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>Razorpay Payments ! Try it Once </p> */}
        <button
          className={"App-link " + btnClass}
          onClick={() => setToggle(!toggle)}
        >
          Pay with RazorPay
        </button>
        {toggle && (
          <div className="popup">
            <div className="content">
              <h1>PAYMENT INFO</h1>
              <input
                type="text"
                name=""
                placeholder="Name"
                onChange={(e) =>
                  setmetadata({ ...metaData, name: e.target.value })
                }
                value={metaData.name}
                id=""
              />
              <input
                type="text"
                name=""
                placeholder="Phone number"
                onChange={(e) =>
                  setmetadata({ ...metaData, contact: e.target.value })
                }
                value={metaData.contact}
                id=""
              />
              <input
                type="text"
                name=""
                placeholder="Email"
                onChange={(e) =>
                  setmetadata({ ...metaData, email: e.target.value })
                }
                value={metaData.email}
                id=""
              />
              <button className="App-link" onClick={displayRazorpayPaymentSdk}>
                Procede to Payment Page
              </button>
              <p>
                *We will use this information to contact you so please fill
                carefully
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
