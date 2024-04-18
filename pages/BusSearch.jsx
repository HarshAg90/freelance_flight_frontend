import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "@/src/layout/Layout";
import { server_url } from "@/src/config";
import { useSpring, animated } from "react-spring";
import Payment from "@/src/components/payment";

export default function Search() {
  let [SourceCity, setSourceCity] = useState();
  let [Destination, setDestination] = useState();
  let [departure_time, setDepTime] = useState();

  let [search, setSearch] = useState(false);
  let [searchResponse, setSearchResponse] = useState();
  let [busList, setBusList] = useState();
  let [loading, setloading] = useState(false);

  useEffect(() => {
    const getBusList = async () => {
      // try {
      const response = await fetch(`${server_url}/bus_city_list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setloading(false);
        // console.log(data);
        if (data.Error.ErrorCode === 1) {
          setBusList(data.Result.CityList);
        } else {
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

  let [SearchQuerry, setSearchQuerry] = useState({
    source_city: "Mumbai",
    source_code: "3534",
    destination_city: "Pune",
    destination_code: "9771",
    depart_date: "2020-06-14",
  });

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
            alert("no result found, please select different city");
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

  return (
    <Layout extraClass={"pt-160"}>
      <div id="Search_page">
        <animated.div
          className={`fullscreen page_title bus ${isHalfScreen && "half"}`}
          style={{ height }}
        >
          {/* <div className="overlay"></div> */}
          <h1>Bus Search</h1>
          <div className="querry hotels">
            <div className="top">
              <div className="search">
                <p>Where from?</p>
                <input
                  type="text"
                  value={
                    SearchQuerry.source_city
                      ? SearchQuerry.source_city
                      : SourceCity
                  }
                  onChange={(e) => setSourceCity(e.target.value)}
                />
                {SourceCity && (
                  <ul className="search_list">
                    {/* {console.log(busList)} */}
                    {busList
                      .filter((city) =>
                        city.CityName.toLowerCase().includes(
                          SourceCity.toLowerCase()
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
                            setSourceCity();
                          }}
                        >
                          {city.CityName}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="search">
                <p>where to?</p>
                <input
                  type="text"
                  value={
                    SearchQuerry.destination_city
                      ? SearchQuerry.destination_city
                      : Destination
                  }
                  onChange={(e) => setDestination(e.target.value)}
                />
                {Destination && (
                  <ul className="search_list">
                    {/* {console.log(busList)} */}
                    {busList
                      .filter((city) =>
                        city.CityName.toLowerCase().includes(
                          Destination.toLowerCase()
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
                            setDestination();
                          }}
                        >
                          {city.CityName}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="search">
                <p>when?</p>
                <input
                  type="date"
                  name=""
                  value={departure_time}
                  onChange={(e) => setDepTime(e.target.value)}
                  id=""
                />
              </div>
              <div className="search">
                <p>🚌</p>
                <button
                  className="submit"
                  onClick={() => {
                    Search_function();
                  }}
                >
                  Search bus
                </button>
              </div>
            </div>
          </div>
        </animated.div>
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
        {search && (
          <div className="bus-search-res">
            <div className="topBar">
              <div className="t">
                <h2>
                  {" "}
                  <span>{searchResponse.Result.BusResults.length}</span> Bus
                  found for <span>{SearchQuerry.source_city}</span> to{" "}
                  <span>{SearchQuerry.destination_city}</span>
                </h2>
                <a href="">*lean about low prices</a>
                <button>Filter</button>
                <button
                  onClick={(e) => {
                    setIsHalfScreen(false);
                    setSearch(false);
                    setSearchResponse();
                  }}
                >
                  Modify
                </button>
              </div>
              <div className="b">
                <button className="selected">Recomended</button>
                <button>Top review</button>
                <button>Most Stars</button>
                <button>Nearest First</button>
              </div>
            </div>
            {searchResponse.Result.BusResults.map((result, index) => (
              <Buses
                result={result}
                index={index}
                TraceId={searchResponse.Result.TraceId}
                loading={loading}
                setloading={setloading}
              />
            ))}
            <p>🚌.o0O° </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Buses({ result, index, TraceId, loading, setloading }) {
  // old code
  const router = useRouter();
  function handleClick(body, rec = null) {
    router.push({
      pathname: "/busProfile",
      query: { body: JSON.stringify(body) },
    });
  }

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
        <div className="top">
          <div className="a">
            <h2>{result.BusType}</h2>
            <p className="price">
              Fare per seat -{" "}
              <span>
                {result.Price.CurrencyCode}{" "}
                {result.Price?.PublishedPrice
                  ? result.Price.PublishedPrice
                  : result.Price.OfferedPrice
                  ? result.Price.OfferedPrice
                  : ""}
              </span>
            </p>
          </div>
          <div className="a">
            <p>
              <span>{breakdownDateTime(result.DepartureTime).time}</span>
              {" > "}
              {result.BoardingPoints[0].CityPointName}
            </p>
            <p className="date">
              {breakdownDateTime(result.DepartureTime).date}
            </p>
          </div>
          <div className="a">
            <p>
              <span>{breakdownDateTime(result.ArrivalTime).time}</span>
              {" > "}
              {
                result.DroppingPoints[result.DroppingPoints.length - 1]
                  ?.CityPointName
              }
            </p>
            <p className="date">{breakdownDateTime(result.ArrivalTime).date}</p>
          </div>
          <div className="a">
            {SelectedBusSeats.length <= 0 ? (
              <button onClick={() => setToggleDetails(!toggleDetails)}>
                {!toggleDetails ? "View Details" : "Hide Details"}
              </button>
            ) : (
              <button onClick={() => settoggleSearch(!toggleSearch)}>
                Book Seat
              </button>
            )}
          </div>
        </div>
        {/* bus seat layout */}
        {toggleDetails && (
          <div className="down">
            <div className="details">
              <p>*driver this side</p>
              <p>*click to select</p>
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
