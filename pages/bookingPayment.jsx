import React, { useState, useEffect } from "react";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { useRouter } from "next/router";
import Payment from "@/src/components/payment";
import { server_url } from "@/src/config";

export default function BookingPayment({}) {
  // let [isPaid, setIsPaid] = useState(false);
  let [loading, setloading] = useState(false);
  // let [PaymentPortalGen, setPaymentPortalGen] = useState(false);
  // let [PaymentPortal, setPaymentPortal] = useState(false);
  // let [meta, setmeta] = useState(false);
  // let [metadata, setmetaData] = useState(false);
  // const [uid, setUid] = useState("");

  // useEffect(() => {
  //   // Extract UID from local storage on component mount or page reload
  //   const storedUid = localStorage.getItem("uid");
  //   if (storedUid) {
  //     setUid(storedUid);
  //   } else {
  //     window.location.href = "/AuthPage";
  //   }
  // }, []);

  const router = useRouter();
  const data = JSON.parse(router.query.data);

  console.log(data);

  // let make_payment_request = () => {
  //   if (!data) {
  //     alert("data not found, please refill forum in previous page");
  //     return false;
  //   }
  //   setloading(true);
  //   const performApiCall = async (data) => {
  //     // try {
  //     // console.log(data);
  //     const response = await fetch(`${server_url}/create_payment_request`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: uid,
  //       },
  //       body: JSON.stringify({ data: data }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setloading(false);
  //       // console.log('API Response:', data);
  //       if (data?.resp) {
  //         // alert("payment request created")
  //         setPaymentPortalGen(true);
  //         setPaymentPortal(data.resp);
  //       } else {
  //         alert("error creating payment request");
  //       }
  //     } else {
  //       setloading(false);
  //       alert("API Request Failed:", response.status, response.statusText);
  //     }
  //     // } catch (error) {
  //     //   setloading(false);
  //     //   alert("An error occurred during the API request:", error);
  //     // }
  //   };
  //   performApiCall(data);
  // };
  // let check_payment_request = () => {
  //   setloading(true);
  //   const performApiCall = async (data) => {
  //     try {
  //       // console.log(data);
  //       const response = await fetch(`${server_url}/check_payment_status`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authentication: "random_id",
  //         },
  //         body: JSON.stringify({ data: data }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setloading(false);
  //         // console.log('API Response:', data);
  //         if (data) {
  //           setIsPaid(true);
  //         } else {
  //           alert("Payment incomplete please wait or cross check");
  //           // setSearchResponse(data);
  //         }
  //       } else {
  //         setloading(false);
  //         alert("API Request Failed:", response.status, response.statusText);
  //       }
  //     } catch (error) {
  //       setloading(false);
  //       alert("An error occurred during the API request:", error);
  //     }
  //   };
  //   performApiCall(data);
  // };

  let book_flight = () => {
    setloading(true);
    const performApiCall = async () => {
      // try {
      console.log(data);
      data.booking_data.TraceId = `${data.booking_data.TraceId}`;
      const response = await fetch(`${server_url}/book_flight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authentication: "random_id",
        },
        body: JSON.stringify({ data: data.booking_data }),
      });

      if (response.ok) {
        const data = await response.json();
        setloading(false);
        console.log(data);
        if (data.Response.Error.ErrorCode !== "0") {
          alert("Error in response");
          // console.log(data)
        } else {
          // console.log("resp")
          router.push({
            pathname: "/BookingSuccessfull",
            query: { data: JSON.stringify(data.Response) },
          });
        }
      } else {
        setloading(false);
        alert("API Request Failed:", response.status, response.statusText);
      }
      // } catch (error) {
      //   setloading(false);
      //   alert("An error occurred during the API request:", error);
      // }
    };
    performApiCall();
    // console.log(data)
  };
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Book Flight"} />
      <div className="top1">
        <p className="">Enter Your details</p>
        <p className="selected">Complete Payment</p>
        <p className="">Book Your Flight</p>
      </div>
      <div id="BookingPayment">
        <h1>Please confirm your payment</h1>
        <hr />
        <h2>Flight details</h2>
        <br />
        <div className="top">
          <div className="">
            <p>
              From:{" "}
              <span> {data.flight_data.Segments[0][0].Origin.AirportName}</span>
            </p>
            <p>
              to:{" "}
              <span>
                {data.flight_data.Segments[0][0].Destination.AirportName}
              </span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              Departure: <span>{data.flight_data.Segments[0][0].DepTime}</span>
            </p>
            <p>
              Arrival: <span>{data.flight_data.Segments[0][0].ArrTime}</span>
            </p>
          </div>
        </div>
        <br />
        <h2>Passenger Information</h2>
        <br />
        {data.booking_data.Passengers.map((passenger, index) => (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
            }}
            className="P_details"
          >
            <p>
              Name:{" "}
              <span>
                {passenger.FirstName} {passenger.LastName}
              </span>
            </p>
            <p>
              Date of Birth: <span>{passenger.DateOfBirth}</span>
            </p>
            <p>
              Email: <span>{passenger.Email}</span>
            </p>
          </div>
        ))}
        <br />

        <h2>Payment Methods</h2>
        <div className="pay">
          <h2>Pay using RazorPay</h2>
          <br />
          <div className="details">
            <p>
              Total Price:{" "}
              <span>
                {data.flight_data.FareDataMultiple[0].PublishedFare
                  ? data.flight_data.FareDataMultiple[0].PublishedFare +
                    data.flight_data.FareDataMultiple[0].PublishedFare * 0.1
                  : data.flight_data.FareDataMultiple[0].OfferedFare +
                    data.flight_data.FareDataMultiple[0].OfferedFare * 0.1}
              </span>
            </p>
            <p>
              Flight Price:{" "}
              <span>{data.flight_data.FareDataMultiple[0].OfferedFare}</span>
            </p>
            <p>
              Base Fare:{" "}
              <span>{data.flight_data.FareDataMultiple[0].Fare.BaseFare}</span>
            </p>
            <p>
              Tax: <span>{data.flight_data.FareDataMultiple[0].Fare.Tax}</span>
            </p>
            <p>
              Platform Charge (10%):{" "}
              <span>
                {data.flight_data.FareDataMultiple[0].PublishedFare
                  ? (
                      data.flight_data.FareDataMultiple[0].PublishedFare * 0.1
                    ).toFixed(2)
                  : (
                      data.flight_data.FareDataMultiple[0].OfferedFare * 0.1
                    ).toFixed(2)}
              </span>
            </p>
          </div>
          <Payment
            data={data.booking_data}
            amount={
              data.flight_data.FareDataMultiple[0].PublishedFare
                ? data.flight_data.FareDataMultiple[0].PublishedFare +
                  data.flight_data.FareDataMultiple[0].PublishedFare * 0.1
                : data.flight_data.FareDataMultiple[0].OfferedFare +
                  data.flight_data.FareDataMultiple[0].OfferedFare * 0.1
            }
            type="flight"
            setLoading={setloading}
          />
          {/* <Payment/> */}
          <p className="customer_care">
            *if money deducted and not showing here, please wait 10 minuts, if
            still a problem contact <span>XXXXXXXX98</span>{" "}
          </p>
          {/* <button onClick={() => book_flight(data.booking_data)}></button> */}
        </div>
        {loading && (
          <div className="loader">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                stroke-width="15"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                stroke-width="15"
                opacity=".8"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin="0.05"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                stroke-width="15"
                opacity=".6"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".1"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                stroke-width="15"
                opacity=".4"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".15"
                ></animate>
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                stroke-width="15"
                opacity=".2"
                r="15"
                cx="35"
                cy="100"
              >
                <animate
                  attributeName="cx"
                  calcMode="spline"
                  dur="2"
                  values="35;165;165;35;35"
                  keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                  repeatCount="indefinite"
                  begin=".2"
                ></animate>
              </circle>
            </svg>
          </div>
        )}
      </div>
    </Layout>
  );
}
