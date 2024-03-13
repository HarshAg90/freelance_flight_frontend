import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BusSelector from "@/src/components/bus_selector";
import Layout from "@/src/layout/Layout";
import { server_url } from "@/src/config";
import { useSpring, animated } from "react-spring";

const FlightSearchResults = ({ results, onResultClick }) => {
  const handleResultClick = (resultIndex) => {
    onResultClick(resultIndex);
  };

  return (
    <div className="search_res">
      <h1>Available Flights</h1>
      {results.map((resultGroup, index) => (
        <div key={index} className="results">
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
  return <input type="date" value={date} onChange={handleDateTimeChange} />;
};

export default function Search() {
  let [SourceCity, setSourceCity] = useState("Mumbai");
  let [SourceCityCode, setSourceCityCode] = useState("3534");
  let [Destination, setDestination] = useState("Pune");
  let [DestinationCode, setDestinationoCode] = useState("9771");
  let [departure_time, setDepTime] = useState("2020-06-14");

  let [search, setSearch] = useState(false);
  let [searchResponse, setSearchResponse] = useState();
  let [busList, setBusList] = useState();
  let [bookingData, setBookingData] = useState();
  let [loading, setloading] = useState(false);
  // const [uid, setUid] = useState("");
  const router = useRouter();

  useEffect(() => {}, [searchResponse]);

  useEffect(() => {
    // ======= uid

    //   const storedUid = localStorage.getItem("uid");
    //   if (storedUid) {
    //     setUid(storedUid);
    //   } else {
    //     window.location.href = "/AuthPage";
    //   }

    const getBusList = async (requestData) => {
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
        setBusList(data);
        console.log(data);
        // // console.log('API Response:', data);
        // if (data.Error.ErrorCode === "100") {
        //   alert("no result found, please select different city");
        // } else {
        // }
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
    getBusList(data);
  }, []);

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
    source_city: SourceCity.toString(),
    source_code: SourceCityCode.toString(),
    destination_city: Destination.toString(),
    destination_code: DestinationCode.toString(),
    depart_date: departure_time,
  };

  let Search_function = () => {
    if (!SourceCity || !Destination) {
      alert("Please select origin and destination");
      return false;
    }
    if (!departure_time) {
      alert("Please select departure");
      return false;
    }
    setloading(true);
    const performApiCall = async (requestData) => {
      try {
        console.log(data);
        const response = await fetch(`${server_url}/search_buses`, {
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

  const [isHalfScreen, setIsHalfScreen] = useState(false);

  const { height } = useSpring({
    height: isHalfScreen ? "50vh" : "100vh",
    config: { duration: 300 },
  });

  const toggleSize = () => {
    setIsHalfScreen(!isHalfScreen);
  };
  return (
    <Layout extraClass={"pt-160"}>
      <div id="Search_page">
        <animated.div className="fullscreen page_title bus" style={{ height }}>
          <h1>Bus Search</h1>
          <div className="querry">
            <div className="top">
              <BusSelector
                className="start"
                cityData={busList}
                majorCities={["1"]}
                setSelectedOption={setSourceCity}
                str_desp={"From where?"}
              />
              <BusSelector
                cityData={busList}
                majorCities={["1"]}
                setSelectedOption={setDestination}
                str_desp={"To where?"}
              />
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
            </div>
          </div>
        </animated.div>
        {loading && <div className="loader"></div>}
        {search && (
          <div className="main">
            {/* <div className="sidebar one">
            <a href="">Get Fair alert</a>
            <br />
            <h2>Filter Your Results</h2>
            <p>number of results</p>
            <br />
            <h2>Flight Time</h2>
            <div className="time">
              {/* <p>{departure_time}</p>
              <p>{arrival_time}</p>
            </div>
            <br />
            <h2>Flight Duration</h2>
            <p>addduration slider</p>
            <br />
            <h2>From - To</h2>
            <div className="time">
              {/* <p>{origin}</p>
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
            {/* <ul>
              {airlineNames.map((item, index) => (
                <li key={index}>{/* Render your item properties here}</li>
              ))}
            </ul>
            <br />
          </div> */}
            <FlightSearchResults
              results={searchResponse.Results}
              onResultClick={book_req_Fn}
            />
            {/* <div className="sidebar">
            <img
              src="/assets/images/search/fairflyings_sidebar.png"
              alt="this is an img"
            />
          </div> */}
          </div>
        )}
      </div>
    </Layout>
  );
}
