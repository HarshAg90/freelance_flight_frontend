import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";
import { server_url } from "@/src/config";
import { Dropdown } from "react-bootstrap";

export default function book() {
  const router = useRouter();
  const data = JSON.parse(router.query.data);

  // console.log(data);
  var reusable_data = {
    SrdvType: data["SrdvType"],
    SrdvIndex: data["FareDataMultiple"][0]["SrdvIndex"],
    TraceId: data["TraceId"],
    ResultIndex: data["FareDataMultiple"][0]["ResultIndex"],
  };
  let flight_details = data.Segments[0][0];

  const [SSR, setSSR] = useState();

  const [SeatMap, setSeatMap] = useState();
  const [FareRules, setFareRules] = useState();
  const [FareQuote, setFareQuote] = useState();
  const [passengerData, setPassengerData] = useState([]);
  const [choosenSeat, setchoosenSeat] = useState();
  const [choosenMeal, setchoosenMeal] = useState();
  const [choosenBagage, setchoosenBagage] = useState();
  const [bookingData, setBookingData] = useState({
    ...reusable_data,
    Passengers: passengerData,
  });

  const [loading, setloading] = useState(false);
  const [isAddingPassenger, setIsAddingPassenger] = useState(false);

  useEffect(() => {
    setBookingData({ ...bookingData, Passengers: passengerData });
    // console.log(data.FareDataMultiple[0].Fare)
    // console.log(bookingData);
  }, [passengerData]);

  let getFlightDetails = async () => {
    const response = await fetch(`${server_url}/get-flight-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authentication: "random_id",
      },
      body: JSON.stringify({ data: reusable_data }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("data Fetch");
      console.log(data);
      setSSR(data.ssr);
      setFareQuote(data.quote);
      setFareRules(data.rule);
      setSeatMap(data.seatMap);
      setloading(false);
    } else {
      setloading(false);
      alert("API Request Failed:", response.status, response.statusText);
    }
  };
  useEffect(() => {
    getFlightDetails();
  }, []);

  const addPassenger = (newPassenger) => {
    setPassengerData([...passengerData, newPassenger]);
  };

  const handleAddPassenger = () => {
    setIsAddingPassenger(true);
  };

  const handlePassengerClose = () => {
    setIsAddingPassenger(false);
  };

  const redirreect = () => {
    if (bookingData.Passengers.length <= 0) {
      alert("data Incomplete, please add passengers");
      return false;
    }
    console.log(bookingData);
    router.push({
      pathname: "/bookingPayment",
      query: {
        data: JSON.stringify({ booking_data: bookingData, flight_data: data }),
      },
    });
  };
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner
        pageTitle={"Flight Booking - User details"}
        url={"./assets/images/flight_search/flight_search.png"}
      />
      <div id="Booking_page">
        <div className="top">
          <p className="selected">Enter Your details</p>
          <p className="">Complete Payment</p>
          <p className="">Book Your Flight</p>
        </div>
        <div className="flight_info">
          <h1>Flight Details and User Form</h1>
          <div className="name">
            <p>
              Airline Code: <span>{flight_details.Airline.AirlineCode}</span>
            </p>
            <h2>
              Airline Name: <span>{flight_details.Airline.AirlineName}</span>
            </h2>
            <h2>
              Class: <span>{flight_details.Airline.FareClass}</span>
            </h2>
            <p>
              Flight Number <span>{flight_details.Airline.FlightNumber}</span>
            </p>
            {flight_details.Airline.OperatingCarrier && (
              <p>
                Opperating carrier:{" "}
                <span>{flight_details.Airline.OperatingCarrier}</span>
              </p>
            )}
          </div>
          <div className="details">
            <div className="ori_dest">
              <div className="origin">
                <h2>Origin</h2>
                <h1>
                  {flight_details.Origin.CityName},{" "}
                  <span>{flight_details.Origin.CityCode}</span>
                </h1>
                <p>{flight_details.Origin.AirportName}</p>
                <p>
                  {flight_details.Origin.CountryName},{" "}
                  {flight_details.Origin.CountryCode}
                </p>
              </div>
              <div className="Destination">
                <h2>Destination</h2>
                <h1>
                  {flight_details.Destination.CityName},{" "}
                  <span>{flight_details.Destination.CityCode}</span>
                </h1>
                <p>{flight_details.Destination.AirportName}</p>
                <p>
                  {flight_details.Destination.CountryName},{" "}
                  {flight_details.Origin.CountryCode}
                </p>
              </div>
            </div>
            <div className="departure">
              <p>
                Departure time:{" "}
                <span>
                  {breakdownDateTime(flight_details.DepTime).date} @{" "}
                  {breakdownDateTime(flight_details.DepTime).time}
                </span>
              </p>
              <p>
                Arrival time:{" "}
                <span>
                  {breakdownDateTime(flight_details.ArrTime).date} @{" "}
                  {breakdownDateTime(flight_details.ArrTime).time}
                </span>
              </p>
              <p>
                Flight Duration: <span>{flight_details.Duration} minutes</span>
              </p>
              <p>Baggage: {flight_details.Baggage}</p>
              <p>CabbinBaggage: {flight_details.CabinBaggage}</p>
              <p>
                Fare -{" "}
                <span>
                  {data.FareDataMultiple[0].Fare.Currency}{" "}
                  {data.Fare?.PublishedFare
                    ? data.Fare.PublishedFare
                    : data.OfferedFare
                    ? data.OfferedFare
                    : ""}
                </span>
              </p>
            </div>
          </div>
        </div>

        {bookingData.Passengers.map((passenger, index) => (
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
            // meal ={choosenMeal}
            // baggage={choosenBagage}
            // seat={choosenSeat}
            // fare={FareQuote.Result.Fare}
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
        )}
      </div>
    </Layout>
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

const Passenger = ({ addPassenger, fair, onClose }) => {
  const [formData, setFormData] = useState({
    Title: "",
    FirstName: "",
    LastName: "",
    PaxType: "1",
    DateOfBirth: "",
    Gender: "",
    PassportNo: "",
    PassportExpiry: "",
    PassportIssueDate: "",
    AddressLine1: "",
    City: "",
    CountryCode: "",
    CountryName: "",
    ContactNo: null,
    Email: "",
    IsLeadPax: 1,
  });

  let [Dropdown, setDropdown] = useState(false);

  const handleInputChange = (e) => {
    console.log("change hitting");
    const { name, value } = e.target;
    console.log(`${name},${value}`);
    if (name === "ContactNo") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    addPassenger({ ...formData });
    setFormData({
      Title: "",
      FirstName: "",
      LastName: "",
      PaxType: "",
      DateOfBirth: "",
      Gender: "",
      PassportNo: "",
      PassportExpiry: "",
      PassportIssueDate: "",
      AddressLine1: "",
      City: "",
      CountryCode: "",
      CountryName: "",
      ContactNo: 0,
      Email: "",
      IsLeadPax: 1,
      Fare: fair,
    });
    onClose();
  };
  return (
    <div className="input_form">
      <h1>Please enter your info to continue booking</h1>
      <div className="gr">
        <div className="radio">
          <span>Title</span>
          <select name="Title" id="" onChange={(e) => handleInputChange(e)}>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
          </select>
        </div>
        <div>
          <span>First Name*</span>
          <input
            type="text"
            name="FirstName"
            placeholder="value..."
            value={formData.FirstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Last Name*</span>

          <input
            type="text"
            name="LastName"
            placeholder="value..."
            value={formData.LastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Date of Birth *</span>
          <input
            type="date"
            name="DateOfBirth"
            placeholder="Date Of Birth*"
            value={formData.DateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Gender</span>
          <select name="Gender" id="" onChange={(e) => handleInputChange(e)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <span>Address Line - 1</span>
          <input
            type="text"
            name="AddressLine1"
            placeholder="Address Line*"
            value={formData.AddressLine1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>City</span>
          <input
            type="text"
            name="City"
            placeholder="City*"
            value={formData.City}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Country *</span>
          <input
            type="text"
            name="CountryName"
            placeholder="Country Name*"
            value={formData.CountryName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Country Code</span>
          <input
            type="text"
            name="CountryCode"
            placeholder="2 Character Code"
            value={formData.CountryCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Contact Number</span>
          <input
            type="number"
            name="Number"
            placeholder="Contact Number*"
            value={formData.ContactNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Email</span>
          <input
            type="text"
            name="Email"
            placeholder="Email*"
            value={formData.Email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className="expand" onClick={() => setDropdown(!Dropdown)}>
        {!Dropdown ? (
          <>
            More Options{" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </>
        ) : (
          "Hide More options"
        )}
      </button>
      {Dropdown && (
        <div className="gr">
          <div>
            <span>Passport Numeber</span>

            <input
              type="text"
              name="PassportNo"
              placeholder="Required for international flights"
              value={formData.PassportNo}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>Passport Expiry</span>
            <input
              type="text"
              name="PassportExpiry"
              placeholder="Required for international flights"
              value={formData.PassportExpiry}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>Passport Issue Date</span>
            <input
              type="text"
              name="PassportIssueDate"
              placeholder="* for international flights"
              value={formData.PassportExpiry}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>Is Lead Pax</span>

            <input
              type="text"
              name="IsLeadPax"
              placeholder="Optional"
              value={formData.IsLeadPax}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <span>Pax Type</span>
            <input
              type="text"
              name="PaxType"
              placeholder="Optional"
              value={formData.PaxType}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
