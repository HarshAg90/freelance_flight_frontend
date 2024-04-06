import PageBanner from "@/src/components/PageBanner";
import { server_url } from "@/src/config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function busProfile() {
  const router = useRouter();
  const bodyData = router.query.body
    ? JSON.parse(decodeURIComponent(router.query.body))
    : null;
  const recomentaion = router.query.recomentaion;

  let [seatLayout, setSeatLayout] = useState();
  let [loading, setloading] = useState(false);
  useEffect(() => {
    let bodyContent = JSON.stringify({
      TraceId: toString(bodyData.TraceId),
      ResultIndex: toString(bodyData.ResultIndex),
    });
    const getBusList = async () => {
      const response = await fetch(`${server_url}/bus_seat_layout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyContent,
      });

      if (response.ok) {
        const data = await response.json();
        setloading(false);
        if (data.Error.ErrorCode === 1) {
          setSeatLayout(data);
        } else {
          alert(
            `Unable to Retrive Bus City List, error code: ${data.Error.ErrorCode}`
          );
          setSeatLayout(data);
          // console.log(data.Error.ErrorCode);
        }
      } else {
        setloading(false);
        alert("API Request Failed:", response.status, response.statusText);
      }
    };
    getBusList();
  }, []);
  return (
    <div>
      <PageBanner pageTitle={"Bus Profile"} />
      <div id="BusProfile">
        <div className="top">
          <p className="selected">Seating Selection</p>
          <p className="">Complete Payment</p>
          <p className="">Book Your Bus</p>
        </div>
        <div className="bus_info">
          <h1>Bus Details</h1>
          <div className="details">
            <h2>
              Bus Type: <span>{bodyData.BusType}</span>
            </h2>
            <p>
              Traveler Name: <span>{bodyData.TravelName}</span>
            </p>
            <h2>
              Departure Time:{" "}
              <span>
                {breakdownDateTime(bodyData.DepartureTime).date} @{" "}
                {breakdownDateTime(bodyData.DepartureTime).time}
              </span>
            </h2>
            <h2>
              Arrival Time:{" "}
              <span>
                {breakdownDateTime(bodyData.ArrivalTime).date} @{" "}
                {breakdownDateTime(bodyData.ArrivalTime).time}
              </span>
            </h2>
            <p>
              Available Seats: <span>{bodyData.AvailableSeats}</span>
            </p>
          </div>
          <div className="routes">
            <h2>Boarding Points/Locations</h2>
            <div className="pickup">
              {bodyData.BoardingPoints && bodyData.BoardingPoints.length > 0 ? (
                bodyData.BoardingPoints.map((ro, index) => (
                  <div key={index} className="cell">
                    <h1>{ro.CityPointName}</h1>
                    <p>{ro.CityPointLocation}</p>
                    <p>
                      {breakdownDateTime(ro.CityPointTime).date} @{" "}
                      {breakdownDateTime(ro.CityPointTime).time}
                    </p>
                  </div>
                ))
              ) : (
                <p>No boarding points found</p>
              )}
            </div>
            <h2>Droping Points/Locations</h2>
            <div className="drop">
              {bodyData.DroppingPoints && bodyData.DroppingPoints.length > 0 ? (
                bodyData.DroppingPoints.map((ro, index) => (
                  <div key={index} className="cell">
                    <h1>{ro.CityPointName}</h1>
                    <p>{ro.CityPointLocation}</p>
                    <p>
                      {breakdownDateTime(ro.CityPointTime).date} @{" "}
                      {breakdownDateTime(ro.CityPointTime).time}
                    </p>
                  </div>
                ))
              ) : (
                <p>No Dropping points found</p>
              )}
              {}
            </div>
          </div>
          <div className="details">
            <p>
              Id Proof Required:{" "}
              <span>{bodyData.IdProofRequired ? "Yes" : "No"}</span>
            </p>
            <p>
              Is Drop Point Mandatory:{" "}
              <span>{bodyData.IsDropPointMandatory ? "Yes" : "No"}</span>
            </p>
            <p>
              Live Tracking Available:{" "}
              <span>{bodyData.LiveTrackingAvailable ? "Yes" : "No"}</span>
            </p>
            <p>
              Partial Cancellation Allowed:{" "}
              <span>{bodyData.PartialCancellationAllowed ? "Yes" : "No"}</span>
            </p>
            <p>
              Fare -{" "}
              <span>
                {bodyData.Price.CurrencyCode}{" "}
                {bodyData.Price.PublishedPrice
                  ? bodyData.Price.PublishedPrice
                  : bodyData.Price.OfferedPrice
                  ? bodyData.Price.OfferedPrice
                  : ""}
              </span>
            </p>
          </div>
        </div>

        {/* {bookingData.Passengers.map((passenger, index) => (
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

        {isAddingPassenger ? (
          <Passenger
            addPassenger={addPassenger}
            onClose={handlePassengerClose}
            fair={data.FareDataMultiple[0].Fare}
          />
        ) : (
          <div className="btns">
            <button className="addP" onClick={handleAddPassenger}>
              Add Passenger
            </button>
            {bookingData.Passengers.length > 0 && (
              <button className="submit" onClick={() => redirreect()}>
                Continue to payment page
              </button>
            )}
          </div>
        )} */}
      </div>
      <pre>{JSON.stringify(seatLayout, null, 2)}</pre>
      {/* <pre>{JSON.stringify(bodyData, null, 2)}</pre> */}
    </div>
  );
}

function breakdownDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Format date
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const dateFormatted = dateTime
    .toLocaleDateString("en-GB", options)
    .replace(/\//g, "-");

  // Format time
  const timeFormatted = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date: dateFormatted, time: timeFormatted };
}
