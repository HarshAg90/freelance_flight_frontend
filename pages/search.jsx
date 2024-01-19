import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import CitySelector from "@/src/components/city_selector";
import Layout from "@/src/layout/Layout";
import cityData from "@/src/components/data";
import { server_url } from "@/src/config";
// import sideimg from "@/public/assets/images/search/fairflyings_sidebar.png"
import Image from "next/image";

// const SelectOptionsExample = ({
//   selectedOption,
//   setSelectedOption,
//   str_desp,
// }) => {
//   const optionsData = [
//     { name: "Andhra Pradesh", value: "AND" },
//     { name: "Arunachal Pradesh", value: "ARU" },
//     { name: "Assam", value: "ASM" },
//     { name: "Bihar", value: "BIH" },
//     { name: "Chhattisgarh", value: "CHG" },
//     { name: "Goa", value: "GOA" },
//     { name: "Gujarat", value: "GUJ" },
//     { name: "Haryana", value: "HAR" },
//     { name: "Himachal Pradesh", value: "HIM" },
//     { name: "Jharkhand", value: "JHA" },
//     { name: "Karnataka", value: "KAR" },
//     { name: "Kerala", value: "KER" },
//     { name: "Madhya Pradesh", value: "MAD" },
//     { name: "Maharashtra", value: "MAH" },
//     { name: "Manipur", value: "MAN" },
//     { name: "Meghalaya", value: "MEG" },
//     { name: "Mizoram", value: "MIZ" },
//     { name: "Nagaland", value: "NAG" },
//     { name: "Odisha", value: "ODI" },
//     { name: "Punjab", value: "PUN" },
//     { name: "Rajasthan", value: "RAJ" },
//     { name: "Sikkim", value: "SIK" },
//     { name: "Tamil Nadu", value: "TAM" },
//     { name: "Telangana", value: "TEL" },
//     { name: "Tripura", value: "TRI" },
//     { name: "Uttar Pradesh", value: "UTT" },
//     { name: "Uttarakhand", value: "UTK" },
//     { name: "West Bengal", value: "WES" },
//     { name: "Andaman and Nicobar Islands", value: "ANI" },
//     { name: "Chandigarh", value: "CHD" },
//     { name: "Dadra and Nagar Haveli and Daman and Diu", value: "DNH" },
//     { name: "Lakshadweep", value: "LAK" },
//     { name: "Delhi", value: "DEL" },
//     { name: "Puducherry", value: "PUD" },
//   ];

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };
//   return (
//     <select
//       class="display-block"
//       value={selectedOption}
//       onChange={handleOptionChange}
//     >
//       <option value="">{str_desp}</option>
//       {optionsData.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.name}
//         </option>
//       ))}
//     </select>
//   );
// };

const FlightSearchResults = ({ results, onResultClick }) => {
  const handleResultClick = (resultIndex) => {
    onResultClick(resultIndex);
  };

  return (
    <div className="search_res">
      <h1>Available Flights</h1>
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
                <h2>
                  Airline:{" "}
                  <span>{result.Segments[0][0].Airline.AirlineName}</span> |
                  Code: <span>{result.Segments[0][0].Airline.AirlineCode}</span>
                </h2>
                <p>
                  {result.Segments[0][0].Origin.CityName},
                  {result.Segments[0][0].Origin.CountryName} @{" "}
                  <span>
                    {" "}
                    {breakdownDateTime(result.Segments[0][0].DepTime).time}
                  </span>{" "}
                  {">"} {result.Segments[0][0].Destination.CityName},
                  {result.Segments[0][0].Destination.CountryName} @{" "}
                  <span>
                    {breakdownDateTime(result.Segments[0][0].ArrTime).time}
                  </span>
                </p>
              </div>
              {/* <div className="mid">
                <p>
                  takeoff:{" "}
                  {breakdownDateTime(result.Segments[0][0].DepTime).date} @{" "}
                  {breakdownDateTime(result.Segments[0][0].DepTime).time}
                </p>
                <p>
                  landing:{" "}
                  {breakdownDateTime(result.Segments[0][0].ArrTime).date} @{" "}
                  {breakdownDateTime(result.Segments[0][0].ArrTime).time}
                  {}
                </p>
              </div> */}
              <div className="down">
                <p>
                  Fare -{" "}
                  <span>
                    {result.FareDataMultiple[0].Fare.Currency}{" "}
                    {result.Fare?.PublishedFare
                      ? result.Fare.PublishedFare
                      : result.OfferedFare
                      ? result.OfferedFare
                      : ""}
                  </span>
                  {/* FareDataMultiple */}
                </p>
                <button onClick={() => handleResultClick(result)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <h1>... No more results</h1>
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

function findMinMaxTime(data) {
  let minDepartureTime = null;
  let maxArrivalTime = null;

  data?.forEach((item) => {
    if (
      item &&
      item.Segments &&
      item.Segments.length > 0 &&
      item.Segments[0].length > 0
    ) {
      const arrivalTime = item.Segments[0][0].ArrTime;
      const departureTime = item.Segments[0][0].DepTime;

      if (arrivalTime) {
        if (!maxArrivalTime || arrivalTime > maxArrivalTime) {
          maxArrivalTime = arrivalTime;
        }
      }

      if (departureTime) {
        if (!minDepartureTime || departureTime < minDepartureTime) {
          minDepartureTime = departureTime;
        }
      }
    }
  });

  return { minDepartureTime, maxArrivalTime };
}

function filterArrayByTimeRange(data, startTime, endTime) {
  return data?.filter((item) => {
    if (
      item &&
      item.Segments &&
      item.Segments.length > 0 &&
      item.Segments[0].length > 0
    ) {
      const arrivalTime = item.Segments[0][0].ArrTime;
      const departureTime = item.Segments[0][0].DepTime;

      return (
        arrivalTime >= startTime &&
        arrivalTime <= endTime &&
        departureTime >= startTime &&
        departureTime <= endTime
      );
    }

    return false;
  });
}

function calculateDuration(minDepartureTime, maxArrivalTime) {
  if (!minDepartureTime || !maxArrivalTime) {
    return null; // Handle invalid input
  }

  const minTime = new Date(minDepartureTime);
  const maxTime = new Date(maxArrivalTime);

  const durationInMilliseconds = maxTime - minTime;
  const durationInMinutes = durationInMilliseconds / (1000 * 60);

  return durationInMinutes;
}

function extractDistinctAirlineNames(data) {
  // Use a Set to store unique airline names
  const uniqueAirlineNames = new Set();

  // Iterate through the array and extract AirlineName
  data?.forEach((item) => {
    console.log(item?.Segments)
    if (item && item.Segments) {
      const airlineName = item.Segments[0][0].Airline.AirlineName;
      console.log(airlineName)
  
      if (airlineName) {
        uniqueAirlineNames.add(airlineName);
      }
    }
  });

  // Convert the Set to an array
  const distinctAirlineNames = Array.from(uniqueAirlineNames);
  console.log(distinctAirlineNames);
  return distinctAirlineNames;
}

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
  let [timeConfig, setTimeConfig] = useState({
    minDepartureTime: "",
    maxArrivalTime: "",
  });

  const [uid, setUid] = useState('');

  useEffect(() => {
    // Extract UID from local storage on component mount or page reload
    const storedUid = localStorage.getItem('uid');
    if (storedUid) {
      setUid(storedUid);
    }else{
      window.location.href = '/AuthPage';
    }
  }, []);

  useEffect(() => {
    if (departure_time) {
      console.log(departure_time);
      const originalDate = new Date(departure_time);
      const nextDay = new Date(originalDate);
      nextDay.setDate(originalDate.getDate() + 2);
      const formattedResult = `${nextDay.getFullYear()}-${(
        nextDay.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${nextDay
        .getDate()
        .toString()
        .padStart(2, "0")}T${nextDay
        .getHours()
        .toString()
        .padStart(2, "0")}:${nextDay
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${nextDay.getSeconds().toString().padStart(2, "0")}`;
      setArrTime(formattedResult);
    }
  }, [departure_time]);

  let [bookingData, setBookingData] = useState();
  let [loading, setloading] = useState(false);

  let [airlineNames, setAirlineName] = useState([]);

  let [allOptions, setAllOptions] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const res = findMinMaxTime(searchResponse?.Results[0]);
    setTimeConfig({
      minDepartureTime: res.minDepartureTime,
      maxArrivalTime: res.maxArrivalTime,
    });
    const duration = calculateDuration(
      res.minDepartureTime,
      res.maxArrivalTime
    );
    setAirlineName(extractDistinctAirlineNames(searchResponse?.Results))
    // console.log('Minimum Departure Time:', minDepalTime);
  }, [searchResponse]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
  };

  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSeat_Class(selectedValue);
  };

  var book_req_Fn = async (data) => {
    console.log(data);
    if (data.FareDataMultiple[0].IsLCC) {
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
    } else {
      alert(`please check a LLC flight${data.FareDataMultiple[0].IsLCC}`);
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
          setloading(false);
          // console.log('API Response:', data);
          if (data.Error.ErrorCode === "100") {
            alert("no result found, please select different city");
          } else {
            console.log(data);
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

  // Passanger count code
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
        setpopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Flight Search"} />
      <div id="Search_page">
        <div className={loading ? "loader" : ""}></div>
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
              <label className="tLabel" onClick={() => toggleSection("")}>
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
            <div className="datePicker">
              {/* <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg> */}
              <DateTimePicker
                selectedDateTime={departure_time}
                setSelectedDateTime={setDepTime}
              />
            </div>
            <button
              className="submit"
              onClick={() => {
                Search_function();
              }}
            >
              Search
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setAllOptions(!allOptions);
              }}
              className="moreBtn"
              height="16"
              width="10"
              viewBox="0 0 320 512"
            >
              <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
            </svg>
          </div>
          <div className={"down " + (allOptions ? "show" : "")}>
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
            <div className="datePicker">
              <label>Arrival Date</label>
              {/* <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg> */}
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
          </div>
        </div>
        <div className="main">
          <div className="sidebar one">
            <a href="">Get Fair alert</a>
            <h2>Filter Your Results</h2>
            <p>{searchResponse?.Results?searchResponse.Results[0].length:"--"} number of results</p>
            <br />
            <h2>Flight Time</h2>
            <div className="time">
              <p>{departure_time}</p>
              <p>{arrival_time}</p>
            </div>
            <br />

            <h2>Flight Duration</h2>
            <p>addduration slider</p>
            <br />

            <h2>From - To</h2>
            <div className="time">
              <p>{origin}</p>
              <p>{Destination}</p>
            </div>
            <br />
            
            <h2>Dates</h2>
            <div className="checkBox">
            <input type="checkbox" name="" id="" />
            <p> Alternate Dates</p>
            </div>
            <br />
            <h2>Arilines</h2>
            <ul>
              {airlineNames.map((item, index) => (
                <li key={index}>{/* Render your item properties here */}</li>
              ))}
            </ul>
            <br />
          </div>
          {/* <div className="content"> */}
          {search ? (
            <FlightSearchResults
              results={searchResponse.Results}
              onResultClick={book_req_Fn}
            />
          ) : (
            <div className="search_res">
              <h1 className="heading">
                {loading?("Looking for your perfect flight, Please wait...."):"Search route for your dream vacation...."}
              </h1>
            </div>
          )}
          {/* </div> */}
          <div className="sidebar">
            <img
              src="/assets/images/search/fairflyings_sidebar.png"
              alt="this is an img"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
