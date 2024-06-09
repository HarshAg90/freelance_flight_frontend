import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "@/src/layout/Layout";
import { server_url } from "@/src/config";
import { useSpring, animated } from "react-spring";
import Payment from "@/src/components/payment";

import { isMobile } from "react-device-detect";

export default function Search() {
  let [SourceCity, setSourceCity] = useState();
  let [Destination, setDestination] = useState();
  let [departure_time, setDepTime] = useState();

  let [search, setSearch] = useState(false);
  let [searchResponse, setSearchResponse] = useState();
  let [loading, setloading] = useState(false);

  let [busList, setBusList] = useState();
  useEffect(() => {
    const getBusList = async () => {
      setloading(true);
      // try {
      const response = await fetch(`${server_url}/bus_city_list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.Error.ErrorCode === 1) {
          setBusList(data.Result.CityList);
          setloading(false);
        } else {
          setloading(false);
          alert(
            `Unable to Retrive Bus City List, error code: ${data.Error.ErrorCode}`
          );
          console.log(data.Error.ErrorCode);
          console.log(data);
          // alert("Unable to Retrive Bus City List");
        }
        // console.log(data);
        // // console.log('API Response:', data);
      } else {
        setloading(false);
        alert("API Request Failed:", response.status, response.statusText);
      }
    };
    getBusList();
  }, []);

  let data = {
    source_city: "Mumbai",
    source_code: "3534",
    destination_city: "Pune",
    destination_code: "9771",
    depart_date: "2020-06-14",
  };

  let [SearchQuerry, setSearchQuerry] = useState({
    source_city: null,
    source_code: null,
    destination_city: null,
    destination_code: null,
    depart_date: "",
  });
  // let [SearchQuerry, setSearchQuerry] = useState({
  //   source_city: "Mumbai",
  //   source_code: "3534",
  //   destination_city: "Pune",
  //   destination_code: "9771",
  //   depart_date: "2020-06-14",
  // });

  let Search_function = () => {
    if (!SearchQuerry.source_city || !SearchQuerry.destination_city) {
      alert("Please select origin and destination");
      return false;
    }
    if (!SearchQuerry.depart_date) {
      alert("Please select departure");
      return false;
    }
    setloading(true);
    const performApiCall = async (requestData) => {
      try {
        console.log("requestData");
        console.log(requestData);
        const response = await fetch(`${server_url}/search_bus`, {
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
            alert("Backend Facing Problems, please try later");
            // } else if (data.Error.ErrorCode === 25) {
            //   alert("no Results found, please select different city");
          } else {
            console.log(data);
            setSearchResponse(data);
            setSearch(true);
            // setIsHalfScreen(!isHalfScreen);
            setIsHalfScreen(true);
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
    performApiCall(SearchQuerry);
    // console.log(data)
  };

  const [isHalfScreen, setIsHalfScreen] = useState(false);
  const { height } = useSpring({
    height: isHalfScreen ? "0vh" : "100vh",
    config: { duration: 300 },
  });
  let [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);
  return (
    <Layout extraClass={"pt-160"}>
      <div id="Search_page">
        <img
          src="./assets/images/busSearch/bus_search.png"
          alt=""
          className={!isHalfScreen ? "topimg " : "topimg shrink"}
        />
        {/* <animated.div
          className={`fullscreen page_title bus ${isHalfScreen && "half"}`}
          style={{ height }}
        >
          <h1>Bus Search</h1>
        </animated.div> */}
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
                d="M78.75 22.5787C78.7613 22.0312 78.7238 17.085 73.875 12.3225C69.1013 7.635 64.2863 7.5 63.75 7.5H26.235C25.3387 7.5 20.6363 7.73625 16.08 12.3825C11.385 17.1675 11.25 21.9712 11.25 22.5V33.75H7.5V45H11.25V67.5C11.25 70.2525 12.7725 72.6488 15 73.9538V78.75C15 79.7446 15.3951 80.6984 16.0984 81.4017C16.8016 82.1049 17.7554 82.5 18.75 82.5H22.5C23.4946 82.5 24.4484 82.1049 25.1516 81.4017C25.8549 80.6984 26.25 79.7446 26.25 78.75V75H63.75V78.75C63.75 79.7446 64.1451 80.6984 64.8483 81.4017C65.5516 82.1049 66.5054 82.5 67.5 82.5H71.25C72.2446 82.5 73.1984 82.1049 73.9017 81.4017C74.6049 80.6984 75 79.7446 75 78.75V73.9613C76.1377 73.3088 77.0834 72.368 77.7417 71.2337C78.4001 70.0993 78.7478 68.8115 78.75 67.5V45H82.5V33.75H78.75V22.5787ZM33.75 15H56.25V22.5H33.75V15ZM24.375 67.5C22.8827 67.4995 21.4516 66.9062 20.3967 65.8506C19.3419 64.795 18.7495 63.3636 18.75 61.8713C18.7505 60.3789 19.3438 58.9479 20.3994 57.893C21.455 56.8381 22.8864 56.2458 24.3787 56.2463C25.8711 56.2467 27.3021 56.8401 28.357 57.8956C29.4119 58.9512 30.0042 60.3827 30.0038 61.875C30.0033 63.3673 29.4099 64.7984 28.3544 65.8533C27.2988 66.9081 25.8673 67.5005 24.375 67.5ZM41.25 48.75H18.75V30H41.25V48.75ZM65.625 67.5C64.1327 67.4995 62.7016 66.9062 61.6467 65.8506C60.5919 64.795 59.9995 63.3636 60 61.8713C60.0005 60.3789 60.5938 58.9479 61.6494 57.893C62.705 56.8381 64.1364 56.2458 65.6287 56.2463C67.1211 56.2467 68.5521 56.8401 69.607 57.8956C70.6619 58.9512 71.2542 60.3827 71.2537 61.875C71.2533 63.3673 70.66 64.7984 69.6044 65.8533C68.5488 66.9081 67.1173 67.5005 65.625 67.5ZM71.25 48.75H48.75V30H71.25V48.75Z"
                fill="black"
              />
            </svg>
          </div>

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

            <div className="search">
              <p>Where from?</p>
              <input
                type="text"
                value={SourceCity?.city ? SourceCity.city : ""}
                onChange={(e) =>
                  setSourceCity({ done: false, city: e.target.value })
                }
                placeholder="place name"
              />
              {SourceCity?.city && !SourceCity?.done && busList && (
                <ul className="search_list">
                  {/* {console.log(busList)} */}
                  {busList
                    .filter((city) =>
                      city.CityName.toLowerCase().includes(
                        SourceCity.city.toLowerCase()
                      )
                    )
                    .map((city) => (
                      <li
                        key={city.CityId}
                        onClick={() => {
                          // i should probably add more than a name to improve future search filter
                          setSearchQuerry({
                            ...SearchQuerry,
                            source_city: city.CityName,
                            source_code: city.CityId,
                          });
                          setSourceCity({ city: city.CityName, done: true });
                        }}
                      >
                        {city.CityName}
                      </li>
                    ))}
                </ul>
              )}
            </div>
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

            <div className="search">
              <p>where to?</p>
              <input
                type="text"
                value={Destination?.city ? Destination.city : ""}
                onChange={(e) =>
                  setDestination({ done: false, city: e.target.value })
                }
                placeholder="place name"
              />
              {Destination?.city && !Destination?.done && (
                <ul className="search_list">
                  {/* {console.log(busList)} */}
                  {busList
                    .filter((city) =>
                      city.CityName.toLowerCase().includes(
                        Destination.city.toLowerCase()
                      )
                    )
                    .map((city) => (
                      <li
                        key={city.CityId}
                        onClick={() => {
                          // i should probably add more than a name to improve future search filter
                          setSearchQuerry({
                            ...SearchQuerry,
                            destination_city: city.CityName,
                            destination_code: city.CityId,
                          });
                          setDestination({ done: true, city: city.CityName });
                        }}
                      >
                        {city.CityName}
                      </li>
                    ))}
                </ul>
              )}
            </div>
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </div>

            <div className="search">
              <p>when?</p>
              <input
                type="date"
                name=""
                onChange={(e) =>
                  setSearchQuerry({
                    ...SearchQuerry,
                    depart_date: e.target.value,
                  })
                }
                id=""
                min={getCurrentDate()}
              />
            </div>
            <div className="search">
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
          </div>
        </div>
        {loading && (
          <div className="loader">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
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
            </svg> */}
            <div class="container">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        )}
        {search ? (
          <div className="main">
            <div className="res">
              <div className="sidebar">
                <h1>Filter By</h1>
                <h2> Result count</h2>
                <p>{searchResponse.Result.BusResults.length}</p>
                <h2>Paces</h2>
                <p>
                  {SearchQuerry.source_city} to {SearchQuerry.destination_city}
                </p>
                <h2>Sort</h2>
                <div className="checkBox">
                  <input type="radio" name="sort" id="sort" />
                  <p> Recomended</p>
                </div>
                <div className="checkBox">
                  <input type="radio" name="sort" id="sort" />
                  <p> Top Review</p>
                </div>
                <div className="checkBox">
                  <input type="radio" name="sort" id="sort" />
                  <p> Most Stars</p>
                </div>
                <div className="checkBox">
                  <input type="radio" name="sort" id="sort" />
                  <p> Nearest First</p>
                </div>
              </div>
              <div className="search_res">
                <h1>Select Your Bus</h1>
                {searchResponse.Result.BusResults.map((result, index) => (
                  <Buses
                    result={result}
                    index={index}
                    TraceId={searchResponse.Result.TraceId}
                    loading={loading}
                    setloading={setloading}
                  />
                ))}
                {/* <p>🚌.o0O° </p> */}
              </div>
            </div>
          </div>
        ) : (
          <div className="beforeContent">
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t1.png" alt="" />
              <div className="cnt">
                <h1>Chennai</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t2.png" alt="" />
              <div className="cnt">
                <h1>Uttrakhand</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t3.png" alt="" />
              <div>
                <h1>Delhi</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t4.png" alt="" />
              <div className="cnt">
                <h1>Mumbai</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t5.png" alt="" />
              <div className="cnt">
                <h1>Himachal</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
            <div className="tile">
              <img src="./assets/images/flight_search/flight_t6.png" alt="" />
              <div className="cnt">
                <h1>Agra</h1>
                <p>Via Delhi, Mumbai, Coimbatore</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Buses({ result, index, TraceId, loading, setloading }) {
  // new code
  let [toggleDetails, setToggleDetails] = useState(false);
  let [toggleSearch, settoggleSearch] = useState(false);
  let [SelectedBusSeats, setSelectedBusSeats] = useState([]);
  let [PassengerInfo, setPassengerInfo] = useState([]);
  let [SelectedPoints, setSelectedPoints] = useState({});
  let [Points, setPoints] = useState();
  let [pointPg, setPointPg] = useState(true);

  let [page, setPage] = useState("points");
  const handleInputChange = (index, field, value) => {
    const updatedPassengerInfo = [...PassengerInfo];
    updatedPassengerInfo[index] = {
      LeadPassenger: true,
      PassengerId: 0,
      Title: "Mr",
      LastName: "",
      IdType: null,
      IdNumber: null,
      ...updatedPassengerInfo[index],
      [field]: value,
    };
    setPassengerInfo(updatedPassengerInfo);
  };

  useEffect(() => {
    if (toggleSearch) {
      const getBusPoint = async () => {
        const response = await fetch(`${server_url}/bus_points`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TraceId: TraceId,
            ResultIndex: result.ResultIndex,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPoints(data);
        } else {
          alert("API Request Failed:", response.status, response.statusText);
        }
      };
      getBusPoint();
    }
  }, [toggleSearch]);

  let getFare = () => {
    return {
      base: SelectedBusSeats.reduce(
        (total, currentSeat) => total + parseInt(currentSeat.SeatFare),
        0
      ),
      total:
        SelectedBusSeats.reduce(
          (total, currentSeat) => total + parseInt(currentSeat.SeatFare),
          0
        ) +
        SelectedBusSeats.reduce(
          (total, currentSeat) => total + parseInt(currentSeat.SeatFare),
          0
        ) *
          0.1,
    };
  };

  let bookingReqData = () => {
    let passenger = [];
    for (let i = 0; i < SelectedBusSeats.length; i++) {
      passenger.push({ ...PassengerInfo[i], seat: SelectedBusSeats[i] });
    }
    let data = {
      ResultIndex: result.ResultIndex,
      TraceId: TraceId,
      BoardingPointId: SelectedPoints.pickup.CityPointIndex,
      DroppingPointId: SelectedPoints.drop.CityPointIndex,
      RefID: "",
      Passenger: passenger,
      // total: getFare().total,
    };
    console.log(data);
    return data;
  };

  // let bookingReq = async () => {
  //   let data = bookingReqData();
  //   console.log(data);
  //   const response = await fetch(`${server_url}/busbooking`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authentication: "random_id",
  //     },
  //     body: JSON.stringify({ data: data }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     setloading(false);
  //     console.error("Booking Success");
  //     console.log(data);
  //     router.push({
  //       pathname: "/bus-booking-successfull",
  //       query: { data: JSON.stringify(data) },
  //     });
  //   } else {
  //     setloading(false);
  //     alert("API Request Failed:", response.status, response.statusText);
  //   }
  // };

  return (
    <div key={index} className="results">
      <div className="t">
        <div
          className="top"
          onClick={
            SelectedBusSeats.length <= 0
              ? () => setToggleDetails(!toggleDetails)
              : () => settoggleSearch(!toggleSearch)
          }
        >
          <div className="a">
            <h2>
              {breakdownDateTime(result.DepartureTime).time} -{" "}
              {breakdownDateTime(result.ArrivalTime).time}
            </h2>
            <h3>
              {breakdownDateTime(result.DepartureTime).date} -{" "}
              {breakdownDateTime(result.ArrivalTime).date}
            </h3>
            <h3>{result.BusType}</h3>
          </div>
          <div className="a">
            <p>
              {result.BoardingPoints[0].CityPointName} {" > "}
              {
                result.DroppingPoints[result.DroppingPoints.length - 1]
                  ?.CityPointName
              }
            </p>
          </div>
          <div className="a">
            <p className="price">
              <span>
                {result.Price.CurrencyCode}{" "}
                {result.Price?.PublishedPrice
                  ? result.Price.PublishedPrice
                  : result.Price.OfferedPrice
                  ? result.Price.OfferedPrice
                  : ""}
              </span>{" "}
              per seat
            </p>
          </div>
        </div>
        {/* bus seat layout */}
        {toggleDetails && (
          <div className="down">
            <div className="details">
              <p>(front of bus this side, click to select)</p>
            </div>
            <BusSeatLayout
              data={{ TraceId: TraceId, ResultIndex: result.ResultIndex }}
              SelectedBusSeats={SelectedBusSeats}
              setSelectedBusSeats={setSelectedBusSeats}
            />
          </div>
        )}
      </div>
      {/* sidebar */}
      {toggleSearch && (
        <div className="fp">
          {page == "points" &&
            (Points ? (
              <div className="bookingPg">
                <div className="tpBtn">
                  <button onClick={() => settoggleSearch(!toggleSearch)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                    </svg>
                  </button>
                </div>
                <div className="top">
                  <button
                    className={pointPg ? "selected" : ""}
                    onClick={() => setPointPg(!pointPg)}
                  >
                    Boaring Points
                  </button>
                  <button
                    className={!pointPg ? "selected" : ""}
                    onClick={() => setPointPg(!pointPg)}
                  >
                    Droping Points
                  </button>
                </div>
                {pointPg ? (
                  <div className="points">
                    {Points.GetBusRouteDetailResult.BoardingPointsDetails.map(
                      (pt) => {
                        // {
                        //   console.log(pt);
                        // }

                        return (
                          <div
                            className={
                              SelectedPoints.pickup?.CityPointTime ===
                              pt.CityPointTime
                                ? "point selected"
                                : "point"
                            }
                            onClick={() => {
                              setSelectedPoints({
                                ...SelectedPoints,
                                pickup: pt,
                              });
                              setPointPg(!pointPg);
                            }}
                          >
                            <div>
                              <h2>
                                <span>
                                  {breakdownDateTime(pt.CityPointTime).time}
                                </span>
                              </h2>
                              <p>{breakdownDateTime(pt.CityPointTime).date}</p>
                            </div>
                            <div>
                              <h2>
                                <span> {pt.CityPointName}</span>
                              </h2>
                              <p className="end">{pt.CityPointAddress}</p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <>
                    <div className="points">
                      {Points.GetBusRouteDetailResult.DroppingPointsDetails.map(
                        (pt) => {
                          // {
                          //   console.log(pt);
                          // }

                          return (
                            <div
                              // className="point"
                              onClick={() => {
                                setSelectedPoints({
                                  ...SelectedPoints,
                                  drop: pt,
                                });
                                setPointPg(!pointPg);
                              }}
                              className={
                                SelectedPoints.drop?.CityPointTime ===
                                pt.CityPointTime
                                  ? "point selected"
                                  : "point"
                              }
                            >
                              <div>
                                <h2>
                                  <span>
                                    {breakdownDateTime(pt.CityPointTime).time}
                                  </span>
                                </h2>
                                <p>
                                  {breakdownDateTime(pt.CityPointTime).date}
                                </p>
                              </div>
                              <div>
                                <h2>
                                  <span> {pt.CityPointName}</span>
                                </h2>
                                <p className="end">{pt.CityPointAddress}</p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </>
                )}
                <p classNamxe="sub">*click to select</p>
                <div className="down">
                  <div className="">
                    <p>base fare - ₹ {getFare().base}</p>
                    <h2>
                      Total fare - <span>₹ {getFare().total}</span>
                    </h2>
                    <p classNamxe="sub">*10% service charge</p>
                  </div>
                  {SelectedPoints.pickup && SelectedPoints.drop ? (
                    <button
                      className="success"
                      onClick={() => {
                        setPage("details");
                      }}
                    >
                      CONTINUE
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        settoggleSearch(false);
                        setPoints();
                      }}
                    >
                      Go back
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <h1>Loading..</h1>
            ))}
          {page === "details" && (
            <div className="bookingPg details">
              <div className="tpBtn">
                <button onClick={() => settoggleSearch(!toggleSearch)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                  </svg>
                </button>
              </div>
              <h1>Boarding & Dropping</h1>
              <div className="points">
                <div>
                  <h2>
                    <span>
                      {
                        breakdownDateTime(SelectedPoints.pickup.CityPointTime)
                          .time
                      }
                    </span>
                  </h2>
                  <p>
                    {
                      breakdownDateTime(SelectedPoints.pickup.CityPointTime)
                        .date
                    }
                  </p>
                </div>
                <div>
                  <h2>
                    <span> {SelectedPoints.pickup.CityPointName}</span>
                  </h2>
                  <p className="end">
                    {SelectedPoints.pickup.CityPointAddress}
                  </p>
                </div>
              </div>
              <div className="points">
                <div>
                  <h2>
                    <span>
                      {
                        breakdownDateTime(SelectedPoints.drop.CityPointTime)
                          .time
                      }
                    </span>
                  </h2>
                  <p>
                    {breakdownDateTime(SelectedPoints.drop.CityPointTime).date}
                  </p>
                </div>
                <div>
                  <h2>
                    <span> {SelectedPoints.drop.CityPointName}</span>
                  </h2>
                  <p className="end">{SelectedPoints.drop.CityPointAddress}</p>
                </div>
              </div>
              <h1>Seats</h1>
              <div className="seats">
                {SelectedBusSeats.map((seat) => (
                  <p>{seat.SeatName}</p>
                ))}
              </div>
              <h1>Fair</h1>
              <div className="fair">
                <p>base fare - ₹ {getFare().base}</p>
                <h2>
                  Total fare - <span>₹ {getFare().total}</span>
                </h2>
                <p className="sub">*10% service charge</p>
              </div>
              <div className="down">
                <div className="btns">
                  <button
                    className=""
                    onClick={() => {
                      setPage("points");
                    }}
                  >
                    Go Back
                  </button>
                  <button
                    className="success"
                    onClick={() => {
                      setPage("personalInfo");
                    }}
                  >
                    Procede to Booking
                  </button>
                </div>
              </div>
            </div>
          )}
          {page === "personalInfo" && (
            <div className="bookingPg infoPg">
              <div className="tpBtn">
                <button onClick={() => settoggleSearch(!toggleSearch)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                  </svg>
                </button>
              </div>
              <div className="info">
                <h1>Passengers Info</h1>
                {Array.from({ length: SelectedBusSeats.length }, (_, index) => (
                  <div key={index} className="passenger">
                    <h2>Passenger {index + 1}</h2>
                    <input
                      type="text"
                      placeholder="Name"
                      value={PassengerInfo[index]?.FirstName || ""}
                      onChange={(e) =>
                        handleInputChange(index, "FirstName", e.target.value)
                      }
                    />
                    <div className="mid">
                      <div>
                        <input
                          type="radio"
                          className="radio"
                          id={`Male${index}`}
                          name={`gender${index}`}
                          value="1"
                          checked={PassengerInfo[index]?.Gender === "1"}
                          onChange={(e) =>
                            handleInputChange(index, "Gender", e.target.value)
                          }
                        />
                        <label htmlFor={`Male${index}`}>Male</label>
                        {/* <div></div> */}

                        <input
                          type="radio"
                          className="radio"
                          id={`Female${index}`}
                          name={`gender${index}`}
                          value="2"
                          checked={PassengerInfo[index]?.Gender === "2"}
                          onChange={(e) =>
                            handleInputChange(index, "Gender", e.target.value)
                          }
                        />
                        <label htmlFor={`Female${index}`}>Female</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Age"
                          value={PassengerInfo[index]?.Age || ""}
                          onChange={(e) =>
                            handleInputChange(index, "Age", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mid">
                      <div>
                        <input
                          type="text"
                          placeholder="Phone number"
                          value={PassengerInfo[index]?.Phoneno || ""}
                          onChange={(e) =>
                            handleInputChange(index, "Phoneno", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Email"
                          value={PassengerInfo[index]?.Email || ""}
                          onChange={(e) =>
                            handleInputChange(index, "Email", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="State of residence"
                      value={PassengerInfo[index]?.Address || ""}
                      onChange={(e) =>
                        handleInputChange(index, "Address", e.target.value)
                      }
                    />
                  </div>
                ))}

                <div className="down">
                  <div className="">
                    <h2>
                      Total fare - <span>₹ {getFare().total}</span>
                    </h2>
                  </div>
                  <div className="btns">
                    <button
                      className=""
                      onClick={() => {
                        setPage("details");
                      }}
                    >
                      Go Back
                    </button>

                    <Payment
                      data={bookingReqData()}
                      amount={
                        SelectedBusSeats.reduce(
                          (total, currentSeat) =>
                            total + parseInt(currentSeat.SeatFare),
                          0
                        ) +
                        SelectedBusSeats.reduce(
                          (total, currentSeat) =>
                            total + parseInt(currentSeat.SeatFare),
                          0
                        ) *
                          0.1
                      }
                      type="bus"
                      setLoading={setloading}
                      btnClass={"success"}
                    />
                    {/* <button
                      className="success"
                      onClick={() => {
                        bookingReq();
                      }}
                    >
                      Procede to Book
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function BusSeatLayout({ data, SelectedBusSeats, setSelectedBusSeats }) {
  const [selectedSeats, setSelectedSeats] = useState(SelectedBusSeats);
  const [seatLayout, setSeatLayout] = useState();
  const [loading, setloading] = useState(false);
  // handle seat select
  const handleSeatClick = (seat) => {
    const seatIndex = SelectedBusSeats.indexOf(seat);
    if (seatIndex === -1) {
      setSelectedBusSeats([...SelectedBusSeats, seat]);
      setSelectedSeats([...selectedSeats, seat.SeatName]);
    } else {
      setSelectedBusSeats(
        SelectedBusSeats.filter(
          (selectedSeat) => selectedSeat.SeatName !== seat.SeatName
        )
      );
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat.SeatName)
      );
    }
  };

  // search for seating
  useEffect(() => {
    const getBusList = async () => {
      try {
        const response = await fetch(`${server_url}/bus_seat_layout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const data = await response.json();
          setloading(false);
          if (data.Error.ErrorCode === 0) {
            setSeatLayout(data);
          } else {
            // alert(
            //   `Unable to Retrive Bus City List, error code: ${data.Error.ErrorCode}`
            // );
            // console.log(bodyContent);
            console.log(data);
            setSeatLayout("failed");
            // console.log(data.Error.ErrorCode);
          }
        } else {
          setloading(false);
          alert("API Request Failed:", response.status, response.statusText);
        }
      } catch {
        console.error("error in fetching city list");
      }
    };
    getBusList();
  }, []);

  if (loading || !seatLayout)
    return (
      <div className="seats">
        <h1>Loading...</h1>
      </div>
    );
  if (seatLayout == "failed")
    return (
      <div className="seats">
        <h1>Error - Seat info Unavailable for this bus</h1>
      </div>
    );

  return (
    <div
      className="seats"
      // dangerouslySetInnerHTML={{
      //   __html: seatLayout.Result.SeatLayout.SeatLayoutDetails.HTMLLayout,
      // }}
    >
      {/* {seatLayout.Result.SeatLayout.SeatLayoutDetails.HTMLLayout} */}
      {seatLayout.Result.SeatLayout.SeatLayoutDetails.Layout.seatDetails.map(
        (rows) => {
          return (
            <div className="row">
              {rows.map((seat) => {
                return (
                  <div
                    key={seat.SeatIndex}
                    // className={`seat`}
                    className={
                      selectedSeats.includes(seat.SeatName)
                        ? "seat selected"
                        : "seat"
                    }
                    onClick={() => handleSeatClick(seat)}
                  >
                    <div className="hover">
                      <p>{`Seat No: ${seat.SeatName} | C: ${seat.ColumnNo} | R: ${seat.RowNo} | price: ${seat.SeatFare}`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
      )}
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
// const convertToSlashFormat = (dateString) => {
//   const parts = dateString.split("-");
//   if (parts.length !== 3) {
//     throw new Error(
//       "Invalid date format. Please provide a date in DD-MM-YYYY format."
//     );
//   }
//   return parts.join("/");
// };
// const convertToSlashFormat = (dateString) => {
//   const parts = dateString.split("-");
//   if (parts.length !== 3) {
//     throw new Error(
//       "Invalid date format. Please provide a date in DD-MM-YYYY format."
//     );
//   }
//   return parts[2] + "/" + parts[1] + "/" + parts[0];
// };
