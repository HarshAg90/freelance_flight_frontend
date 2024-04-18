import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CitySelector from "@/src/components/city_selector";
import Layout from "@/src/layout/Layout";
import { hotels_list } from "../src/components/search_hotels";
import { server_url } from "@/src/config";
import { useSpring, animated } from "react-spring";

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
  let [InputBox, setInputBox] = useState(false);

  let [searchQuerry, setSearchQuerry] = useState({
    BookingMode: "5",
    CheckInDate: "30/04/2020",
    NoOfNights: "1",
    CountryCode: "IN",
    CityId: "130443",
    ResultCount: null,
    PreferredCurrency: "INR",
    GuestNationality: "IN",
    NoOfRooms: "1",
    RoomGuests: [
      {
        NoOfAdults: "1",
        NoOfChild: "0",
        ChildAge: [],
      },
    ],
    PreferredHotel: "",
    MaxRating: "5",
    MinRating: "0",
    ReviewScore: null,
    IsNearBySearchAllowed: false,
  });

  const router = useRouter();
  const handleClick = (body, rec = null) => {
    router.push({
      pathname: "/hotel",
      query: { body: body, recomentaion: rec },
    });
  };

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
    performApiCall(searchQuerry);
    // console.log(data)
  };

  const [isHalfScreen, setIsHalfScreen] = useState(false);

  const { height } = useSpring({
    height: isHalfScreen ? "50vh" : "100vh",
    config: { duration: 300 },
  });

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
              <div className="search">
                {/* <CustomInput
                  inputValue={
                    searchQuerry.CityId ? searchQuerry.CityId : InputBox.city
                  }
                  setInputValue={setInputBox}
                  placeholder="City or Hotel Name"
                /> */}
                <p>Where do you want to stay?</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="citySearch"
                  placeholder="Enter destination or hotel name"
                  value={
                    searchQuerry.CityId ? searchQuerry.CityId : InputBox.city
                  }
                  onChange={(e) => setInputBox({ city: e.target.value })}
                />
                {/* {console.log(hotels_list)} */}
                {InputBox?.city && hotels_list && (
                  <ul className="search_list">
                    {Object.keys(hotels_list)
                      .filter((cityCode) =>
                        hotels_list[cityCode]
                          .toLowerCase()
                          .includes(InputBox.city.toLowerCase())
                      )
                      .map((cityCode) => (
                        <li
                          key={cityCode}
                          onClick={() => {
                            // i should probably add more than a name to improve future search filter
                            setSearchQuerry({
                              ...searchQuerry,
                              CityId: cityCode,
                            });
                            setInputBox();
                          }}
                        >
                          {hotels_list[cityCode]}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="search City_search">
                {/* <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Country Code"
                  value={
                    searchQuerry.CountryCode
                      ? searchQuerry.CountryCode
                      : InputBox.country
                  }
                  onChange={(e) => setInputBox({ city: e.target.value })}
                /> */}
                {/* {console.log(hotels_list)} */}
                {/* {InputBox?.city && hotels_list && (
                  <ul className="search_list">
                    {Object.keys(hotels_list)
                      .filter((cityCode) =>
                        hotels_list[cityCode]
                          .toLowerCase()
                          .includes(InputBox.city.toLowerCase())
                      )
                      .map((cityCode) => (
                        <li
                          key={cityCode}
                          onClick={() => {
                            // i should probably add more than a name to improve future search filter
                            setSearchQuerry({
                              ...searchQuerry,
                              CityId: cityCode,
                            });
                            setInputBox();
                          }}
                        >
                          {hotels_list[cityCode]}
                        </li>
                      ))}
                  </ul>
                )} */}
              </div>
              <div className="search">
                <p>Check-in</p>
                <input type="date" name="" id="" />
                {/* <DateTimePicker
                  selectedDateTime={CheckInDate}
                  setSelectedDateTime={setCheckInDate}
                /> */}
              </div>
              <div className="search">
                <p>Check-out</p>
                <input type="date" name="" id="" />
                {/* <DateTimePicker
                  selectedDateTime={CheckInDate}
                  setSelectedDateTime={setCheckInDate}
                /> */}
              </div>
              <div className="search">
                <p>Guest and rooms</p>
                <h2>2 adults, 1 room</h2>
                <div className="search_list">
                  <div className="box">
                    <button onClick={() => setNoOfAdults(NoOfAdults - 1)}>
                      -
                    </button>
                    <p>{NoOfAdults} adults</p>
                    <button onClick={() => setNoOfAdults(NoOfAdults + 1)}>
                      +
                    </button>
                  </div>
                  <div className="box">
                    <button onClick={() => setNoOfRooms(NoOfRooms - 1)}>
                      -
                    </button>
                    <p>{NoOfRooms} rooms</p>
                    <button onClick={() => setNoOfRooms(NoOfRooms + 1)}>
                      +
                    </button>
                  </div>
                </div>
                {/* <DateTimePicker
                  selectedDateTime={CheckInDate}
                  setSelectedDateTime={setCheckInDate}
                /> */}
              </div>
            </div>
            <div className="mid">
              <p>More Filters</p>
              <div className="f">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Free Cancelation</label>
              </div>
              <div className="f">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">4 star</label>
              </div>
              <div className="f">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">3 star</label>
              </div>
              <button
                className="submit"
                onClick={() => {
                  Search_function();
                }}
              >
                Search Hotel
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
          <div className="main">
            {console.log(searchResponse.Results)}
            <div className="hotel_search_res">
              <div className="topBar">
                <div className="t">
                  <button>Filter</button>
                  <h2> - hotels found in -</h2>
                  <a href=""> lean about low prices</a>
                </div>
                <div className="b">
                  <button className="selected">Recomended</button>
                  <button>Top review</button>
                  <button>Most Stars</button>
                  <button>Nearest First</button>
                </div>
              </div>
              {/* // {searchResponse.Results.map((result, index) => ( */}
              {searchResponse.Results.filter((res) => res.ResultIndex == 9).map(
                (result, index) => (
                  <div key={index} className="results">
                    <div className="top">
                      <img src={result.HotelPicture} alt="" />
                    </div>
                    <div className="mid">
                      <h2>{result.HotelName}</h2>
                      {/* <h2>{result.HotelDescription}</h2> */}
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
                      </p>
                      <button
                        onClick={() => {
                          router.push({
                            pathname: "/hotel-details",
                            query: {
                              data: JSON.stringify({
                                ...result,
                                TraceId: searchResponse.TraceId,
                                SrdvType: searchResponse.SrdvType,
                              }),
                            },
                          });
                          // handleResultClick(result);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )
              )}
              <h1>... No more results</h1>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
