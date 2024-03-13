import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CitySelector from "@/src/components/city_selector";
import Layout from "@/src/layout/Layout";
import hotels_list from "@/src/components/search_hotels";
import { server_url } from "@/src/config";
import { useSpring, animated } from "react-spring";

const FlightSearchResults = ({ results, onResultClick }) => {
  const handleResultClick = (resultIndex) => {
    onResultClick(resultIndex);
  };
  console.log(results);

  return (
    <div className="search_res">
      <h1>Available Hotels</h1>
      {results.map((resultGroup, index) => (
        <div key={index} className="results">
          {resultGroup.map((result) => (
            <div key={result.ResultIndex} className="results_tile">
              {/* {console.log(result)} */}

              <div className="top">
                <img src={result.HotelPicture} alt="" />
              </div>
              <div className="mid">
                <h2>{result.HotelName}</h2>
                <h2>{result.HotelDescription}</h2>
                <p>{result.HotelPromotion}</p>
                <p>{result.HotelAddress}</p>
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
    <input
      className="date"
      type="date"
      value={date}
      onChange={handleDateTimeChange}
    />
  );
};

export default function HotelSearch() {
  let [CheckInDate, setCheckInDate] = useState("30/04/2020");
  let [NoOfNights, setNoOfNights] = useState(1);
  let [CountryCode, setCountryCode] = useState("IN");

  let [CityCode, setCityCode] = useState("130443");

  let [PreferedCurrency, setPreferedCurrency] = useState("INR");
  let GuestNationality = CountryCode;
  let [NoOfRooms, setNoOfRooms] = useState(1);
  let [NoOfAdults, setNoOfAdults] = useState(1);
  // let [NoOfChilds, setNoOfChilds] = useState("0");
  // let [ChildAge, setChildAge] = useState([]);

  let [rating, setRating] = useState(5);
  let [MinRating, setMinRating] = useState(0);

  let [search, setSearch] = useState(false);
  let [searchResponse, setSearchResponse] = useState(null);
  let [loading, setloading] = useState(false);

  const router = useRouter();

  var data = {
    BookingMode: "5",
    CheckInDate: CheckInDate,
    NoOfNights: NoOfNights,
    CountryCode: CountryCode,
    CityId: CityCode,
    ResultCount: null,
    PreferredCurrency: PreferedCurrency,
    GuestNationality: GuestNationality,
    NoOfRooms: NoOfRooms,
    RoomGuests: [
      {
        NoOfAdults: NoOfAdults,
        NoOfChild: "0",
        ChildAge: [],
      },
    ],
    PreferredHotel: "",
    MaxRating: rating,
    MinRating: "0",
    ReviewScore: null,
    IsNearBySearchAllowed: false,
  };

  let Search_function = () => {
    if (!CheckInDate) {
      alert("Please select checkin date");
      return false;
    }
    if (!CityCode || !CountryCode) {
      alert("Please select city code and country code");
      return false;
    }
    setloading(true);
    const performApiCall = async (requestData) => {
      try {
        console.log(data);
        const response = await fetch(`${server_url}/search_hotels`, {
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
      {/* <PageBanner pageTitle={"Flight Search"} /> */}
      <div id="Search_page">
        <animated.div
          className={`page_title Hotels ${!search && "fullscreen"}`}
          style={{ height }}
        >
          <h1>Hotel Search</h1>
          <div className="querry hotels">
            <div className="top">
              <CitySelector
                className="start"
                cityData={hotels_list}
                setSelectedOption={setCityCode}
                str_desp={"City"}
                type={"hotel"}
              />
              <CitySelector
                cityData={hotels_list}
                setSelectedOption={setCountryCode}
                str_desp={"Country"}
                type={"hotel"}
              />
              <div className="datePicker">
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z"/></svg> */}
                <DateTimePicker
                  selectedDateTime={CheckInDate}
                  setSelectedDateTime={setCheckInDate}
                />
              </div>
            </div>
            <div className="mid">
              <div className="box">
                <button onClick={() => setNoOfAdults(NoOfAdults - 1)}>-</button>
                <p>{NoOfAdults} adults</p>
                <button onClick={() => setNoOfAdults(NoOfAdults + 1)}>+</button>
              </div>
              <div className="box">
                <button onClick={() => setNoOfRooms(NoOfRooms - 1)}>-</button>
                <p>{NoOfRooms} rooms</p>
                <button onClick={() => setNoOfRooms(NoOfRooms + 1)}>+</button>
              </div>
              <CitySelector
                cityData={hotels_list}
                setSelectedOption={setPreferedCurrency}
                str_desp={"prefered currency"}
              />
              <div className="box">
                <button onClick={() => setNoOfNights(NoOfNights - 1)}>-</button>
                <p>{NoOfNights} nights</p>
                <button onClick={() => setNoOfNights(NoOfNights + 1)}>+</button>
              </div>

              <div className="box">
                <button
                  onClick={() => {
                    rating > 0 && setRating(rating - 1);
                  }}
                >
                  -
                </button>
                <p>{rating} stars</p>
                <button
                  onClick={() => {
                    rating < 5 && setRating(rating + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="bottom">
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
        {/* <div className={"down " + (allOptions ? "show" : "")}>

          </div> */}
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
