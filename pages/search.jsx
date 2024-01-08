import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import CitySelector from "@/src/components/city_selector";
import Layout from "@/src/layout/Layout";
import cityData from "@/src/components/data";
import { server_url } from "@/src/config";


const SelectOptionsExample = ({
  selectedOption,
  setSelectedOption,
  str_desp,
}) => {
  const optionsData = [
    { name: "Andhra Pradesh", value: "AND" },
    { name: "Arunachal Pradesh", value: "ARU" },
    { name: "Assam", value: "ASM" },
    { name: "Bihar", value: "BIH" },
    { name: "Chhattisgarh", value: "CHG" },
    { name: "Goa", value: "GOA" },
    { name: "Gujarat", value: "GUJ" },
    { name: "Haryana", value: "HAR" },
    { name: "Himachal Pradesh", value: "HIM" },
    { name: "Jharkhand", value: "JHA" },
    { name: "Karnataka", value: "KAR" },
    { name: "Kerala", value: "KER" },
    { name: "Madhya Pradesh", value: "MAD" },
    { name: "Maharashtra", value: "MAH" },
    { name: "Manipur", value: "MAN" },
    { name: "Meghalaya", value: "MEG" },
    { name: "Mizoram", value: "MIZ" },
    { name: "Nagaland", value: "NAG" },
    { name: "Odisha", value: "ODI" },
    { name: "Punjab", value: "PUN" },
    { name: "Rajasthan", value: "RAJ" },
    { name: "Sikkim", value: "SIK" },
    { name: "Tamil Nadu", value: "TAM" },
    { name: "Telangana", value: "TEL" },
    { name: "Tripura", value: "TRI" },
    { name: "Uttar Pradesh", value: "UTT" },
    { name: "Uttarakhand", value: "UTK" },
    { name: "West Bengal", value: "WES" },
    { name: "Andaman and Nicobar Islands", value: "ANI" },
    { name: "Chandigarh", value: "CHD" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", value: "DNH" },
    { name: "Lakshadweep", value: "LAK" },
    { name: "Delhi", value: "DEL" },
    { name: "Puducherry", value: "PUD" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <select
      class="display-block"
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <option value="">{str_desp}</option>
      {optionsData.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const FlightSearchResults = ({ results, onResultClick }) => {
  const handleResultClick = (resultIndex) => {
    onResultClick(resultIndex);
  };

  return (
    <div className="search_res">
      <h2>Available flights</h2>
      {results.map((resultGroup, index) => (
        <div key={index} className="results">
          {/* <h3>Result Group {index + 1}</h3> */}
          {resultGroup.map((result) => (
            <div
              key={result.ResultIndex}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px",
              }}
              className="results_tile"
            >
              {/* {console.log(result)} */}

              <div className="top">
                <h2>{result.Segments[0][0].FlightStatus}</h2>
                <p>
                  Airline:{" "}
                  <span>{result.Segments[0][0].Airline.AirlineName}</span>,
                  Code: <span>{result.Segments[0][0].Airline.AirlineCode}</span>
                </p>
                <p></p>
              </div>
              <div className="mid">
                <p>
                  {result.Segments[0][0].Origin.CityName},
                  {result.Segments[0][0].Origin.CountryName} @{" "}
                  {breakdownDateTime(result.Segments[0][0].DepTime).time} {">"}{" "}
                  {result.Segments[0][0].Destination.CityName},
                  {result.Segments[0][0].Destination.CountryName} @{" "}
                  {breakdownDateTime(result.Segments[0][0].ArrTime).time}
                </p>
                {/* <p>
                  takeoff:{" "}
                  {breakdownDateTime(result.Segments[0][0].DepTime).date} @{" "}
                  {breakdownDateTime(result.Segments[0][0].DepTime).time}
                </p>
                <p>
                  landing:{" "}
                  {breakdownDateTime(result.Segments[0][0].ArrTime).date} @{" "}
                  {breakdownDateTime(result.Segments[0][0].ArrTime).time}
                  {}
                </p> */}
              </div>
              <div className="down">
                <p>
                  Fare - {result.FareDataMultiple[0].Fare.Currency}{" "}
                  {result.Fare?.PublishedFare ? result.Fare.PublishedFare : (result.OfferedFare? result.OfferedFare:'')}
                  {/* FareDataMultiple */}
                </p>
                <button onClick={() => handleResultClick(result)}>
                  Book Flight
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

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

const DateTimePicker = ({ selectedDateTime, setSelectedDateTime }) => {
  let [date, changeDate] = useState("");
  let [time, changeTime] = useState("00:00:00");
  const list = {
    Anytime: "00:00:00",
    Morning: "08:00:00",
    AfterNoon: "14:00:00",
    Evening: "19:00:00",
    Night: "01:00:00",
  };
  const handleSelect = (event) => {
    changeTime(event.target.value);
    setSelectedDateTime(`${date}T${event.target.value}`);
    console.log(`${date}T${event.target.value}`);
    console.log(selectedDateTime);
  };
  const handleDateTimeChange = (event) => {
    changeDate(event.target.value);
    setSelectedDateTime(`${event.target.value}T${time}`);
    console.log(selectedDateTime);
  };
  return (
    <div className="">
      <input type="date" value={date} onChange={handleDateTimeChange} />
    </div>
  );
};

export default function Search() {
  let [adults, setAdults] = useState(1);
  let [children, setChildren] = useState(0);
  let [infants, setInfants] = useState(0);

  let [popup, setpopup] = useState(false);

  let [origin, setOrigin] = useState("");
  let [Destination, setDestinationo] = useState("");
  let [seat_class, setSeat_Class] = useState("1");
  let [departure_time, setDepTime] = useState("");
  let [arrival_time, setArrTime] = useState("");
  let [selectValue, setSelectValue] = useState("1");

  let [search, setSearch] = useState(false);
  let [searchResponse, setSearchResponse] = useState();

  let [bookingData, setBookingData] = useState();
  let [loading, setloading] = useState(false);

  const router = useRouter();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
  };
  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSeat_Class(selectedValue);
  };
  var book_req_Fn = async (data) => {
    // console.log(data)
    console.log(data);
    const { ["Results"]: removedKey, ...rest } = searchResponse;
    console.log(rest);

    // console.log(rest)
    setBookingData({ ...rest, ...data });
    console.log(bookingData);
    if (bookingData) {

      router.push({
        pathname: "/book",
        query: { data: JSON.stringify(bookingData) },
      });
    }
  };
  var data = {
    AdultCount: adults.toString(),
    ChildCount: children.toString(),
    InfantCount: infants.toString(),
    JourneyType: selectValue,
    // 1 - oneway , 2 - return, 3 - multiCity, 4- advance search
    Segments: [
      {
        Origin: origin,
        Destination: Destination,
        FlightCabinClass: seat_class,
        // 1 - all, 2 - economy, 3 - premium eco , 4 - business, 5 - premium, 6 -  First
        PreferredDepartureTime: departure_time,
        PreferredArrivalTime: arrival_time,
      },
    ],
  };

  let Search_function = () => {
    if (!origin || !Destination) {
      alert("Please select origin and destination");
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
        const response = await fetch(`${server_url}/search_flights`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authentication: "random_id",
          },
          body: JSON.stringify({ data: requestData }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setloading(false)
          // console.log('API Response:', data);
          if (data.Error.ErrorCode === "100") {
            alert("no result found, please select different city");
          } else {
            console.log(data)
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

  const toggleSection = (section) => {
    if (popup) {
      setpopup(false);
    } else {
      setpopup(true);
    }
  };

  const incrementCount = (section) => {
    switch (section) {
      case "adults":
        setAdults(adults + 1);
        break;
      case "children":
        setChildren(children + 1);
        break;
      case "infants":
        setInfants(infants + 1);
        break;
      default:
        break;
    }
  };

  const decrementCount = (section) => {
    switch (section) {
      case "adults":
        setAdults(adults > 0 ? adults - 1 : 0);
        break;
      case "children":
        setChildren(children > 0 ? children - 1 : 0);
        break;
      case "infants":
        setInfants(infants > 0 ? infants - 1 : 0);
        break;
      default:
        break;
    }
  };

  const totalCount = adults + children + infants;

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Clicked outside the popup, close it
        setpopup(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Flight Search"} />
      <div id="Search_page">
      <div className={loading?'loader':""}></div>
        <div className="querry">
          <div className="top">
            <CitySelector
              cityData={cityData}
              setSelectedOption={setOrigin}
              str_desp={"From where?"}
            />
            <CitySelector
              cityData={cityData}
              setSelectedOption={setDestinationo}
              str_desp={"To where?"}
            />

            <div className="box">
              <label onClick={() => toggleSection("")}>
                Travelers: {totalCount}
              </label>
              <div
                className="travelers-input"
                style={{ display: popup ? "block" : "none" }}
                ref={popupRef}
              >
                <div className="section">
                  Adults
                  <div>
                    <button onClick={() => decrementCount("adults")}>-</button>
                    {adults}
                    <button onClick={() => incrementCount("adults")}>+</button>
                  </div>
                </div>
                <div className="section">
                  Children
                  <div>
                    <button onClick={() => decrementCount("children")}>
                      -
                    </button>
                    {children}
                    <button onClick={() => incrementCount("children")}>
                      +
                    </button>
                  </div>
                </div>
                <div className="section">
                  Infants
                  <div>
                    <button onClick={() => decrementCount("infants")}>-</button>
                    {infants}
                    <button onClick={() => incrementCount("infants")}>+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <label>Cabin Class:</label>
              <select
                class="display-block"
                value={seat_class}
                onChange={handleClassChange}
              >
                <option value="1">All</option>
                <option value="2">Economy</option>
                <option value="3">Premium economy</option>
                <option value="4">Business</option>
                <option value="5">Premium</option>
                <option value="6">First</option>
              </select>
            </div>
          </div>
          <div className="mid">
            {/* <SelectOptionsExample
              selectedOption={origin}
              setSelectedOption={setOrigin}
              str_desp={"From where?"}
            />
            <SelectOptionsExample
            selectedOption={Destination}
            setSelectedOption={setDestinationo}
            str_desp={"To where?"}
          /> */}
          </div>
          <div className="down">
            <div className="">
              <label>Departure Date</label>
              <DateTimePicker
                selectedDateTime={departure_time}
                setSelectedDateTime={setDepTime}
              />
            </div>
            <div className="">
              <label>Arrival Date</label>
              <DateTimePicker
                selectedDateTime={arrival_time}
                setSelectedDateTime={setArrTime}
              />
            </div>
            <select
              class="display-block"
              value={selectValue}
              onChange={handleSelectChange}
            >
              <option value="1">OneWay</option>
              <option value="2">Return</option>
              {/* <option value="3">multiCity</option> */}
            </select>
            <button
              onClick={() => {
                Search_function();
              }}
            >
              Search
            </button>
          </div>
        </div>
        {search && (
          <FlightSearchResults
            results={searchResponse.Results}
            onResultClick={book_req_Fn}
          />
        )}
      </div>
    </Layout>
  );
}
