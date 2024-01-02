import { useRouter } from "next/router";
import React from "react";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";


export default function book() {
  const router = useRouter();

  // console.log(router.query.data)
  const data = JSON.parse(router.query.data);

  console.log(data);
  let flight_details = data.Segments[0][0];
  console.log(data.Segments[0][0]);
  return (
    <Layout extraClass={"pt-160"}>
    <PageBanner pageTitle={"Flight Booking"} />
    <div id="Booking_page">
      <div className="top">
        <p className="selected">Enter Your details</p>
        <p className="">Complete Payment</p>
        <p className="">Book Your Flight</p>
      </div>
      <div className="flight_info">
        <h1>Flight Details and User Form</h1>
        <div className="name">
          <p>Airline Code: <span>{flight_details.Airline.AirlineCode}</span></p>
          <h2>Airline Name: <span>{flight_details.Airline.AirlineName}</span></h2>
          <h2>Class: <span>{flight_details.Airline.FareClass}</span></h2>
          <p>Flight Number <span>{flight_details.Airline.FlightNumber}</span></p>
          <p><span>{flight_details.Airline.OperatingCarrier}</span></p>
        </div>
        <div className="details">
          <div className="ori_dest">
            <div className="origin">
              <h2>Origin</h2>
              <h1>{flight_details.Origin.CityName}, <span>{flight_details.Origin.CityCode}</span></h1>
              <p>{flight_details.Origin.AirportName}</p>
              <p>{flight_details.Origin.CountryName}, {flight_details.Origin.CountryCode}</p>
            </div>
            <div className="Destination">
              <h2>Destination</h2>
              <h1>{flight_details.Destination.CityName}, <span>{flight_details.Destination.CityCode}</span></h1>
              <p>{flight_details.Destination.AirportName}</p>
              <p>{flight_details.Destination.CountryName}, {flight_details.Origin.CountryCode}</p>
            </div>
        </div>
        <div className="departure">
          <p>Departure time: <span>{flight_details.ArrTime}</span></p>
          <p>Arrival time: <span>{flight_details.ArrTime}</span></p>
          <p>Flight Duration: <span>{flight_details.Duration} minuts</span></p>
            <p>Baggage: {flight_details.Baggage}</p>
            <p>CabbinBaggage: {flight_details.CabinBaggage}</p>
        </div>
        </div>

      </div>
      <div className="input_form">
        <h1>Please enter your info to continue booking</h1>
        <div className="gr">
          <input type="text" placeholder="Title*" />
          <input type="text" placeholder="First Name*" />
          <input type="text" placeholder="Last Name*" />
          <input type="text" placeholder="Pax Type*" />
          <input type="text" placeholder="Date Of Birth*" />
          <input type="text" placeholder="Gender*" />
          <input type="text" placeholder="Passport Number" />
          
          <input type="text" placeholder="Passport Expiry" />
          <input type="text" placeholder="Address Line*" />
          <input type="text" placeholder="City*" />
          <input type="text" placeholder="Country Code*" />
          <input type="text" placeholder="Contact Number*" />
          <input type="text" placeholder="Email*" />
          <input type="text" placeholder="Is Lead Pax" />
        </div>
        <button>Continue to payment page</button>
      </div>
    </div>
    </Layout>
  );
}
