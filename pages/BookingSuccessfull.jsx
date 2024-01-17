import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";

export default function BookingSuccessfull() {
  var [data, setData] = useState();
  const router = useRouter();
  useEffect(() => {
    const resp = JSON.parse(router.query.data);
    setData(resp);
    // console.log(data)

    console.log(data.Response.FlightItinerary.Passenger[0].Ticket.TicketNumber);
    // console.log((data.Response.FlightItinerary.Passenger[0]))
  }, []);
  if (!data) {
    return <h1>hi</h1>;
  }
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Book Flight"} />
      <div className="top1">
        <p className="">Enter Your details</p>
        <p className="">Complete Payment</p>
        <p className="selected">Book Your Flight</p>
      </div>
      <div id="BookingSuccess">
        <h1>Booking Succesfull 🎊</h1>
        <br />
        <h2>Flight details</h2>
        <br />
        <div className="top">
          <div className="">
            <p>
              Tickent Number:{" "}
              <span>
                {" "}
                {data.Response.FlightItinerary.Passenger[0].Ticket.TicketNumber}
              </span>
            </p>
            <p>
              PNR: <span>{data.Response.PNR}</span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              Invoice Number:{" "}
              <span> {data.Response.FlightItinerary.InvoiceNo}</span>
            </p>
            <p>
              Creation Date:{" "}
              <span>{data.Response.FlightItinerary.InvoiceCreatedOn}</span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              From: <span> {data.Response.FlightItinerary.Origin}</span>
            </p>
            <p>
              to: <span>{data.Response.FlightItinerary.Destination}</span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              Departure:{" "}
              <span>{data.Response.FlightItinerary.Segments[0].DepTime}</span>
            </p>
            <p>
              Arrival:{" "}
              <span>{data.Response.FlightItinerary.Segments[0].ArrTime}</span>
            </p>
          </div>
        </div>
        <br />
        <h2>Passenger Information</h2>
        <br />
        {data.Response.FlightItinerary.Passenger.map((passenger, index) => (
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
        </div>

        <div className="btns">
          <button>Download Invoice</button>
          <button>Download Ticket</button>
        </div>
      </div>
    </Layout>
  );
}
