import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "@/src/layout/Layout";
import { server_url } from "@/src/config";
import { useSpring, animated } from "react-spring";

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
          // alert("Unable to Retrive Bus City List");
        }
        // console.log(data);
        // // console.log('API Response:', data);
      } else {
        setloading(false);
        alert("API Request Failed:", response.status, response.statusText);
      }
      // } catch (error) {
      //   setloading(false);
      //   console.error(error);
      //   alert("An error occurred during the API request:", error);
      // }
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
          <h1>Bus Search</h1>
          <div className="querry busSearch">
            <div className="top">
              <div className="search">
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
              <input
                type="date"
                name=""
                value={departure_time}
                onChange={(e) => setDepTime(e.target.value)}
                id=""
              />
              {/* <div className="datePicker">
              </div> */}
              <button
                className="submit"
                onClick={() => {
                  Search_function();
                }}
              >
                Search
              </button>
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
                <button>Filter</button>
                <h2>
                  {" "}
                  {searchResponse.Result.BusResults.length} Bus found in{" "}
                  {SearchQuerry.source_city}
                </h2>
                <a href=""> lean about low prices</a>
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
            {console.log(searchResponse.Result.TraceId)}
            {searchResponse.Result.BusResults.map((result, index) => (
              <Buses
                result={result}
                index={index}
                TraceId={searchResponse.Result.TraceId}
              />
            ))}
            <p>... No more results</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Buses({ result, index, TraceId }) {
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
  let [SelectedBusSeats, setSelectedBusSeats] = useState([]);

  return (
    <div key={index} className="results">
      <div className="top">
        <h2>{result.BusType}</h2>
        <p>
          {result.DepartureTime} - {result.ArrivalTime}
        </p>
        <p>
          {result.BoardingPoints[0].CityPointName} {">"}{" "}
          {result.BoardingPoints[1].CityPointName} {">"}{" "}
          {result.BoardingPoints[2].CityPointName} ...
        </p>
        <p>
          {result.DroppingPoints[0].CityPointName} {">"}{" "}
          {result.DroppingPoints[1]?.CityPointName} {">"}{" "}
          {result.DroppingPoints[2]?.CityPointName} ...
        </p>
      </div>
      <div className="down">
        <p>
          Fare -{" "}
          <span>
            {result.Price.CurrencyCode}{" "}
            {result.Price?.PublishedPrice
              ? result.Price.PublishedPrice
              : result.Price.OfferedPrice
              ? result.Price.OfferedPrice
              : ""}
          </span>
        </p>
        <button
          // onClick={() =>
          //   handleClick({
          //     ...result,
          //     TraceId: searchResponse.Result.TraceId,
          //   })
          // }
          onClick={setToggleDetails(!toggleDetails)}
        >
          {!toggleDetails ? "View Details" : "Hide Details"}
        </button>
      </div>
      {toggleDetails && (
        <BusSeatLayout
          data={{ TraceId: TraceId, ResultIndex: result.ResultIndex }}
          SelectedBusSeats={SelectedBusSeats}
          setSelectedBusSeats={setSelectedBusSeats}
        />
      )}
    </div>
  );
}

function BusSeatLayout({ data, SelectedBusSeats, setSelectedBusSeats }) {
  const [selectedSeats, setSelectedSeats] = useState(SelectedBusSeats);
  const [seatLayout, setSeatLayout] = useState();

  // handle seat select
  const handleSeatClick = (seat) => {
    const seatIndex = selectedSeats.indexOf(seat);
    if (seatIndex === -1) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    }
  };

  // search for seating
  useEffect(() => {
    let bodyContent = JSON.stringify({
      TraceId: toString(data.TraceId),
      ResultIndex: toString(result.ResultIndex),
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
    <div className="seats">
      {data.Result.SeatLayout.Layout.seatDetails[0].map((seat) => {
        const isSeatSelected = selectedSeats.includes(seat.SeatName);
        return (
          <div
            key={seat.SeatIndex}
            className={`seat ${isSeatSelected ? "selected" : ""}`}
            onClick={() => handleSeatClick(seat.SeatName)}
          >
            <div className="hover">
              <p>{`Seat No: ${seat.SeatName} | C: ${seat.ColumnNo} | R: ${seat.RowNo} | Price: ${seat.Price.SeatFare}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
