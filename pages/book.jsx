import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";

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
// title: '',
// name: '',
// lastName: '',
// PaxType: '',
// dob: '',
// gender: '',
// passportNum: '',
// passportExpiry: '',
// Add1: '',
// city: '',
// countryCode: '',
// contactNum: '',
// email: '',
// isLeadPax: '',
// fair:fair,

const Passenger = ({addPassenger, fair, onClose})=>{
  const [formData, setFormData] = useState({
    Title: 'Mr',
    FirstName: 'SRDV',
    LastName: 'Support',
    PaxType: '1',
    DateOfBirth: '1992-03-12',
    Gender: '1',
    PassportNo: '',
    PassportExpiry: '',
    PassportIssueDate: "",
    AddressLine1: 'Test',
    City: 'Kolkata',
    CountryCode: 'IN',
    CountryName: 'India',
    ContactNo: 9632587410,
    Email: 'support@srdvtechnologies.com',
    IsLeadPax: 1,
    Fare:fair,
  });

  const handleInputChange = (e) => {
    console.log("change hitting")
    const { name, value } = e.target;
    console.log(`${name},${value}`)
    if(name==='ContactNo'){
      setFormData({ ...formData, [name]: parseInt(value) });
    }else{
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    addPassenger({ ...formData });
    setFormData({
      Title: 'Mr',
      FirstName: 'SRDV',
      LastName: 'Support',
      PaxType: '1',
      DateOfBirth: '1992-03-12',
      Gender: '1',
      PassportNo: '',
      PassportExpiry: '',
      PassportIssueDate: "",
      AddressLine1: 'Test',
      City: 'Kolkata',
      CountryCode: 'IN',
      CountryName: 'India',
      ContactNo: 9632587410,
      Email: 'support@srdvtechnologies.com',
      IsLeadPax: 1,
      Fare:fair,
    });
    onClose();
  };
  return(
    <div className="input_form">
        <h1>Please enter your info to continue booking</h1>
        <div className="gr">
          <input type="text" name="Title" placeholder="Title*" value={formData.Title} onChange={handleInputChange} />
          <input type="text" name="FirstName" placeholder="First Name*" value={formData.FirstName} onChange={handleInputChange} />
          <input type="text" name="Support" placeholder="Last Name*" value={formData.LastName} onChange={handleInputChange} />
          <input type="text" name="PaxType" placeholder="Pax Type*" value={formData.PaxType} onChange={handleInputChange} />
          <input type="text" name="DateOfBirth" placeholder="Date Of Birth*" value={formData.DateOfBirth} onChange={handleInputChange} />
          <input type="text" name="Gender" placeholder="Gender*" value={formData.Gender} onChange={handleInputChange} />
          <input type="text" name="PassportNo" placeholder="Passport Number" value={formData.PassportNo} onChange={handleInputChange} />
          
          <input type="text" name="PassportExpiry" placeholder="Passport Expiry" value={formData.PassportExpiry} onChange={handleInputChange} />
          <input type="text" name="PassportIssueDate" placeholder="Passport Issue Date" value={formData.PassportExpiry} onChange={handleInputChange} />
          <input type="text" name="AddressLine1" placeholder="Address Line*" value={formData.AddressLine1} onChange={handleInputChange} />
          <input type="text" name="City" placeholder="City*" value={formData.City} onChange={handleInputChange} />
          <input type="text" name="CountryCode" placeholder="Country Code*" value={formData.CountryCode} onChange={handleInputChange} />
          <input type="text" name="CountryName" placeholder="Country Name*" value={formData.CountryName} onChange={handleInputChange} />
          <input type="number" name="ContactNo" placeholder="Contact Number*" value={formData.ContactNo} onChange={handleInputChange} />
          <input type="text" name="Email" placeholder="Email*" value={formData.Email} onChange={handleInputChange} />
          <input type="text" name="IsLeadPax" placeholder="Is Lead Pax" value={formData.IsLeadPax} onChange={handleInputChange} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
export default function book() {
  const router = useRouter();
  const data = JSON.parse(router.query.data);

  console.log(data);
  let flight_details = data.Segments[0][0];

  const [passengerData, setPassengerData] = useState([]);
  const [bookingData, setBookingData] = useState({
    SrdvType: data['SrdvType'],
    SrdvIndex: data['FareDataMultiple'][0]['SrdvIndex'],
    TraceId: data['TraceId'],
    ResultIndex: data['FareDataMultiple'][0]['ResultIndex'],
    Passengers:passengerData
  });
  const [isAddingPassenger, setIsAddingPassenger] = useState(false);

  useEffect(()=>{
    setBookingData({...bookingData, 'Passengers':passengerData})
    // console.log(data.FareDataMultiple[0].Fare)
    console.log(bookingData)
  },[passengerData])

  const addPassenger = (newPassenger) => {
    setPassengerData([...passengerData, newPassenger]);
  };

  const handleAddPassenger = () => {
    setIsAddingPassenger(true);
  };

  const handlePassengerClose = () => {
    setIsAddingPassenger(false);
  };

  const redirreect = ()=>{
    if (bookingData.Passengers.length <=0) {
      alert("data Incomplete, please add passengers");
      return false;
    }
    router.push({
      pathname: "/bookingPayment",
      query: { data: JSON.stringify({"booking_data":bookingData,"flight_data":data}) },
    });
  }
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Flight Booking Fourm"} />
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
            <p>Opperating carrier: <span>{flight_details.Airline.OperatingCarrier}</span></p>
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
            <p>Departure time: <span>{breakdownDateTime(flight_details.DepTime).date} @ {breakdownDateTime(flight_details.DepTime).time}</span></p>
            <p>Arrival time: <span>{breakdownDateTime(flight_details.ArrTime).date} @ {breakdownDateTime(flight_details.ArrTime).time}</span></p>
            <p>Flight Duration: <span>{flight_details.Duration} minuts</span></p>
            <p>Baggage: {flight_details.Baggage}</p>
            <p>CabbinBaggage: {flight_details.CabinBaggage}</p>
            <p>Fare - <span>{data.FareDataMultiple[0].Fare.Currency} {data.Fare?.PublishedFare ? data.Fare.PublishedFare : (data.OfferedFare? data.OfferedFare:'')}</span></p>
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
        
        {isAddingPassenger?(
          <Passenger addPassenger={addPassenger} onClose={handlePassengerClose} fair={data.FareDataMultiple[0].Fare} />
        ):(
          <div className="btns">
            <button className="addP" onClick={handleAddPassenger}>Add Passenger</button>
            {(bookingData.Passengers.length >0) && (<button className="submit"  onClick={()=>redirreect()}>Continue to payment page</button>)}
          </div>
          )}
      </div>
    </Layout>
  );
}
