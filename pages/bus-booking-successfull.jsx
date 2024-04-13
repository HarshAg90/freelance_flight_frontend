import PageBanner from "@/src/components/PageBanner";
import { server_url } from "@/src/config";
import Layout from "@/src/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function BusBookingSuccessfull() {
  var [book, setBook] = useState();
  var [block, setBlock] = useState();
  var [loading, setLoading] = useState(false);
  var [orderId, setOrderId] = useState();
  const router = useRouter();
  useEffect(() => {
    setBlock(JSON.parse(router.query.block));
    setBook(JSON.parse(router.query.book));
    console.log(block);
    console.log(book);
    setOrderId(router.query.orderId);
  }, []);
  const generateAndOpenPDF = async () => {
    setLoading(true);
    try {
      // Make a POST request to Flask route to generate PDF
      const response = await fetch(server_url + "/get_pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: orderId }),
      });

      if (response.ok) {
        // If response is successful, open PDF in new tab
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        setLoading(false);
        window.open(pdfUrl, "_blank");
      } else {
        // Handle API request failure
        setLoading(false);
        console.error(
          "Failed to generate PDF:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle network errors
      setLoading(false);
      console.error("An error occurred during PDF generation:", error);
    }
  };
  if (!book || !block) {
    return (
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
    );
  }
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Bus Booking"} url={"assets/images/bg/bus.png"} />
      <div id="BookingSuccess">
        <h1>Booking Succesfull 🎊</h1>
        <br />
        <h2>Bus details</h2>
        <br />
        <div className="top">
          <div className="">
            <p>
              Tickent Number: <span> {book.TicketNo}</span>
            </p>
            <p>
              Bus ID: <span>{book.BusId}</span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              Invoice Anount: <span> {book.InvoiceAmount}</span>
            </p>
            <p>
              TravelOpperatorPNR: <span>{book.TravelOperatorPNR}</span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              From: <span> {block.BoardingPointdetails.CityPointLocation}</span>
            </p>
            {/* <p>
              At: <span>{block.DepartureTime}</span>{" "}
            </p> */}
          </div>
          <div className="">
            <p>
              Departure: <span>{block.DepartureTime}</span>
            </p>
            <p>
              Arrival: <span>{block.ArrivalTime}</span>
            </p>
          </div>
        </div>
        <br />
        {/* <h2>Passenger Information</h2>
        <br /> */}
        {/* {data.Response.FlightItinerary.Passenger.map((passenger, index) => (
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
        ))} */}
        {/* <br />
        <div className="pay">
          <h2>Paid Fee</h2>
          <br />
          <div className="details">
            <p>
              Total Price:{" "}
              <span>
                {data.Response.FlightItinerary.Fare.PublishedFare +
                  data.Response.FlightItinerary.Fare.PublishedFare * 0.1}
              </span>
            </p>
            <p>
              Flight Price:{" "}
              <span>{data.Response.FlightItinerary.Fare.PublishedFare}</span>
            </p>
            <p>
              Base Fare:{" "}
              <span>{data.Response.FlightItinerary.Fare.BaseFare}</span>
            </p>
            <p>
              Tax: <span>{data.Response.FlightItinerary.Fare.Tax}</span>
            </p>
            <p>
              Platform Charge (10%):{" "}
              <span>
                {(
                  data.Response.FlightItinerary.Fare.PublishedFare * 0.1
                ).toFixed(2)}
              </span>
            </p>
          </div>
        </div> */}

        <div className="btns">
          <button onClick={() => generateAndOpenPDF()}>Download Invoice</button>
        </div>
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
    </Layout>
  );
}
