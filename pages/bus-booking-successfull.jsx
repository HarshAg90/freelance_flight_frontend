import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function BusBookingSuccessfull() {
  var [book, setBook] = useState();
  var [block, setBlock] = useState();
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
        window.open(pdfUrl, "_blank");
      } else {
        // Handle API request failure
        console.error(
          "Failed to generate PDF:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle network errors
      console.error("An error occurred during PDF generation:", error);
    }
  };
  if (!book || !block) {
    return <h1>loading</h1>;
  }
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Bus Booking"} />
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
          <button>Download Ticket</button>
        </div>
      </div>
    </Layout>
  );
}
