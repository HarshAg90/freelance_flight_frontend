import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import CitySelector from "@/src/components/city_selector";
import { useSpring, animated } from "react-spring";
import Layout from "@/src/layout/Layout";
import cityData from "@/src/components/data";
import { server_url } from "@/src/config";

export default function Search() {
  let [adults, setAdults] = useState(1);
  let [children, setChildren] = useState(0);
  let [infants, setInfants] = useState(0);

  let [popup, setpopup] = useState(false);

  let [origin, setOrigin] = useState();
  let [Destination, setDestinationo] = useState();
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
    setAirlineName(extractDistinctAirlineNames(searchResponse?.Results));
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
      // console.log(data);
      const { ["Results"]: removedKey, ...rest } = searchResponse;
      // console.log(rest);

      // console.log(rest)
      setBookingData({ ...rest, ...data });
      // console.log(bookingData);
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
    console.log(origin, Destination, departure_time, arrival_time);
    // setData({
    //   ...data,
    //   Seggments: {
    //     ...data.Segments,
    //     Origin: origin,
    //     Destination: Destination,
    //     PreferredDepartureTime: departure_time,
    //     PreferredArrivalTime: arrival_time,
    //   },
    // });
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
            setIsHalfScreen(!isHalfScreen);
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

  const [isHalfScreen, setIsHalfScreen] = useState(false);

  return (
    <Layout extraClass={"pt-160"}>
      <div id="Search_page">
        <img
          src="./assets/images/flight_search/flight_search.png"
          alt=""
          className={!isHalfScreen ? "topimg " : "topimg shrink"}
        />
        <div className={!isHalfScreen ? "querry " : "querry active"}>
          <div className="pg_logo">
            <svg
              width="90"
              height="90"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.4707 71.3086L29.9707 76.9336V82.5586L43.0957 78.8086L56.2207 82.5586V76.9336L48.7207 71.3086V50.6836L78.7207 60.0586V52.5586L48.7207 33.8086V13.1836C48.7207 10.0711 46.2082 7.55859 43.0957 7.55859C39.9832 7.55859 37.4707 10.0711 37.4707 13.1836V33.8086L7.4707 52.5586V60.0586L37.4707 50.6836V71.3086Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="">
            <div className="top">
              <div className="logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              {/* <div className="search">
                <input
                  type="text"
                  value={origin?.city ? origin.city : ""}
                  onChange={(e) =>
                    setOrigin({ done: false, city: e.target.value })
                  }
                  placeholder="Source City"
                />
                {origin?.city && !origin?.done && (
                  <ul className="search_list">
                    {Object.keys(cityData)
                      .filter((cityCode) =>
                        cityData[cityCode]
                          .toLowerCase()
                          .includes(origin.city.toLowerCase())
                      )
                      .map((city) => (
                        <li
                          key={city}
                          onClick={() => {
                            // i should probably add more than a name to improve future search filter
                            setData({
                              ...data,
                              Segments: { ...data.Segments, Origin: city },
                            });
                            setOrigin({
                              ...InputBox,
                              city: cityData[cityCode],
                              done: true,
                            });
                          }}
                        >
                          {cityData[city]}
                        </li>
                      ))}
                  </ul>
                )}
              </div> */}
              <CitySelector
                className="start"
                cityData={cityData}
                setSelectedOption={setOrigin}
                str_desp={"From where?"}
              />
              <div className="logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </div>
              <CitySelector
                cityData={cityData}
                setSelectedOption={setDestinationo}
                str_desp={"To where?"}
              />
              <div className="logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
              </div>
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
                    <p>Adults</p>
                    <div>
                      <button onClick={() => decrementCount("adult")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>
                      <p>{adults}</p>
                      <button onClick={() => incrementCount("adult")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="section">
                    <p>Children</p>
                    <div>
                      <button onClick={() => decrementCount("children")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>
                      <p>{children}</p>
                      <button onClick={() => incrementCount("children")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="section">
                    <p>Infants</p>
                    <div>
                      <button onClick={() => decrementCount("infants")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14"
                          />
                        </svg>
                      </button>
                      <p>{infants}</p>
                      <button onClick={() => incrementCount("infants")}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="datePicker">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
            <div className={"down " + (allOptions ? "show" : "")}>
              {/* <label>Cabin Class:</label> */}
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
              {/* <label>flight type:</label> */}
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
        {search ? (
          <div className="main">
            <div className="res">
              <div className="sidebar">
                <h1>Filter By</h1>
                <h2>Results</h2>
                <p>
                  {searchResponse?.Results
                    ? searchResponse.Results[0].length
                    : "--"}{" "}
                  number of results
                </p>
                <h2>Range</h2>
                <div className="time">
                  <p>
                    From - {breakdownDateTime(departure_time).date} -{" "}
                    {breakdownDateTime(departure_time).time}
                  </p>
                  <p>
                    To - {breakdownDateTime(arrival_time).date} -{" "}
                    {breakdownDateTime(arrival_time).time}
                  </p>
                </div>
                <h2>Flight Duration</h2>
                <p>-</p>
                <h2>From - To</h2>
                <div className="time">
                  <p>
                    {origin} - {Destination}
                  </p>
                </div>
                <h2>Dates</h2>
                <div className="checkBox">
                  <input type="checkbox" name="" id="" />
                  <p> Alternate Dates</p>
                </div>
                <h2>Arilines</h2>
                <ul>
                  {airlineNames.map((item, index) => (
                    <li key={index}>
                      {/* Render your item properties here */}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="search_res">
                <h1>
                  Choose your Flight -{" "}
                  {searchResponse?.Results
                    ? searchResponse.Results[0].length
                    : "--"}{" "}
                  results
                </h1>
                {searchResponse.Results.map((resultGroup, index) => (
                  <div key={index} className="fly_results">
                    {resultGroup
                      .filter(
                        (flight) => flight.FareDataMultiple[0].IsLCC === true
                      )
                      .map((result) => (
                        <div
                          key={result.ResultIndex}
                          style={{}}
                          className="results_tile"
                          onClick={() => book_req_Fn(result)}
                        >
                          <div className="top">
                            <h2>
                              {/* Airline:{" "} */}
                              {result.Segments[0][0].Airline.AirlineName}
                              {/* <span></span>{" "} */}
                            </h2>
                          </div>
                          <p>
                            {result.Segments[0][0].Origin.CityName}{" "}
                            <span>
                              {" "}
                              {
                                breakdownDateTime(result.Segments[0][0].DepTime)
                                  .time
                              }
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                              />
                            </svg>
                            {result.Segments[0][0].Destination.CityName}{" "}
                            <span>
                              {
                                breakdownDateTime(result.Segments[0][0].ArrTime)
                                  .time
                              }
                            </span>
                          </p>
                          <div className="down">
                            <h2>
                              {result.FareDataMultiple[0].Fare.Currency}{" "}
                              <span>
                                {result.Fare?.PublishedFare
                                  ? result.Fare.PublishedFare
                                  : result.OfferedFare
                                  ? result.OfferedFare
                                  : ""}
                              </span>
                            </h2>
                            <h2>{result.Segments[0][0].FlightStatus}</h2>
                            {/* <button>
                                View Details
                              </button> */}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
                <h1>... No more results</h1>
              </div>
              {/* <div className="sidebar">
                <img
                  src="/assets/images/search/fairflyings_sidebar.png"
                  alt="this is an img"
                />
              </div> */}
            </div>
          </div>
        ) : (
          <div className="beforeContent">
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t1.png" alt="" />
              <div className="cnt">
                <h1>Chennai Flights</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t2.png" alt="" />
              <div className="cnt">
                <h1>Chennai Flights</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t3.png" alt="" />
              <div>
                <h1>Chennai Flights</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t4.png" alt="" />
              <div className="cnt">
                <h1>Chennai Flights</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t5.png" alt="" />
              <div className="cnt">
                <h1>Chennai Flights</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t6.png" alt="" />
              <div className="cnt">
                <h1>Chennai Flights</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
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
  // const handleSelect = (event) => {
  //   changeTime(event.target.value);
  //   setSelectedDateTime(`${date}T${event.target.value}`);
  //   console.log(`${date}T${event.target.value}`);
  //   console.log(selectedDateTime);
  // };
  const handleDateTimeChange = (event) => {
    changeDate(event.target.value);
    setSelectedDateTime(`${event.target.value}T${time}`);
    console.log(selectedDateTime);
  };
  const convertToSlashFormat = (dateString) => {
    const parts = dateString.split("-");
    if (parts.length !== 3) {
      throw new Error(
        "Invalid date format. Please provide a date in DD-MM-YYYY format."
      );
    }
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Ensure month and day are in two digits format
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    return `${year}-${month}-${day}`;
  };
  return (
    <input
      type="date"
      value={date}
      onChange={handleDateTimeChange}
      min={getCurrentDate()}
    />
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
    console.log(item?.Segments);
    if (item && item.Segments) {
      const airlineName = item.Segments[0][0].Airline.AirlineName;
      console.log(airlineName);

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
