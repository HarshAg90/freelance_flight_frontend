import React, { useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { useRouter } from "next/router";

export default function BookingPayment({}) {
  let [isPaid, setIsPaid] = useState(false);
  let [PaymentPortalGen, setPaymentPortalGen] = useState(false);
  let [PaymentPortal, setPaymentPoratl] = useState(false);

  const router = useRouter();
  const data = JSON.parse(router.query.data);

  console.log(data);

  let make_payment_request = () => {
    // if (!departure_time || !arrival_time) {
    //   alert("Please select departure and arrival time");
    //   return false;
    // }
    setloading(true);


    const performApiCall = async (data) => {
      try {
        console.log(data);
        const response = await fetch(`${server_url}/create_payment_request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authentication: "random_id",
          },
          body: JSON.stringify({ data: data }),
        });

        if (response.ok) {
          const data = await response.json();
          setloading(false);
          // console.log('API Response:', data);
          if (data.ErrorCode === "100") {
            alert("no result found, please select different city");
          } else {
            setSearchResponse(data);
            setSearch(true);
          }
        } else {
          setloading(false);
          alert("API Request Failed:", response.status, response.statusText);
        }
      } catch (error) {
        setloading(false);
        alert("An error occurred during the API request:", error);
      }
    };
    performApiCall(data);
  };
  let check_payment_request = () => {
    setloading(true);
    const performApiCall = async (data) => {
      try {
        console.log(data);
        const response = await fetch(`${server_url}/create_payment_request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authentication: "random_id",
          },
          body: JSON.stringify({ data: data }),
        });

        if (response.ok) {
          const data = await response.json();
          setloading(false);
          // console.log('API Response:', data);
          if (data.ErrorCode === "100") {
            alert("no result found, please select different city");
          } else {
            setSearchResponse(data);
            setSearch(true);
          }
        } else {
          setloading(false);
          alert("API Request Failed:", response.status, response.statusText);
        }
      } catch (error) {
        setloading(false);
        alert("An error occurred during the API request:", error);
      }
    };
    performApiCall(data);
  };

  let book_flight = (bookingData) => {
    if (!isPaid) {
      alert("Payment not completed, please deposite money with us upfront");
      return false;
    }
    if (!departure_time || !arrival_time) {
      alert("Please select departure and arrival time");
      return false;
    }
    setloading(true);
    const performApiCall = async (requestData) => {
      try {
        console.log(data);
        const response = await fetch(`${server_url}/bookFlight`, {
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
          // console.log('API Response:', data);
          if (data.Error.ErrorCode === "100") {
            alert("no result found, please select different city");
          } else {
            setSearchResponse(data);
            setSearch(true);
          }
        } else {
          setloading(false);
          alert("API Request Failed:", response.status, response.statusText);
        }
      } catch (error) {
        setloading(false);
        alert("An error occurred during the API request:", error);
      }
    };
    performApiCall(data);
    // console.log(data)
  };
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Book Flight"} />
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
                {passenger.name} {passenger.LastName}
              </span>
            </p>
            <p>
              Date of Birth: <span>{passenger.dob}</span>
            </p>
            <p>
              Email: <span>{passenger.email}</span>
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
                {data.flight_data.FareDataMultiple[0].OfferedFare + 
                (data.flight_data.FareDataMultiple[0].OfferedFare * 0.15)}
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
              Platform Charge (15%): <span>{(data.flight_data.FareDataMultiple[0].OfferedFare * 0.15).toFixed(2)}</span>
            </p>
          </div>
        <button>Pay</button>
        {PaymentPortal && (
        <button>Check Status</button>
        )}
        <p className="customer_care">*if money deducted and not showing here, please wait 10 minuts, if still a problem contact <span>XXXXXXXX98</span> </p>
        </div>
        <button className={isPaid?"book success":"book"}>Book Flight</button>
      </div>
    </Layout>
  );
}
