import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Layout from "@/src/layout/Layout";
import { hotels_list } from "../src/components/search_hotels_old";
import { server_url } from "@/src/config";
import { useSpring, animated } from "react-spring";

export default function HotelSearch() {
  let [NoOfRooms, setNoOfRooms] = useState(1);
  let [NoOfAdults, setNoOfAdults] = useState(1);
  let [popup, setpopup] = useState(false);
  let [search, setSearch] = useState(false);
  let [searchResponse, setSearchResponse] = useState(null);
  let [loading, setloading] = useState(false);
  let [InputBox, setInputBox] = useState(false);
  const [isHalfScreen, setIsHalfScreen] = useState(false);

  const router = useRouter();

  var data = {
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
  };

  let [searchQuerry, setSearchQuerry] = useState({
    BookingMode: "5",
    CheckInDate: "30/04/2020",
    NoOfNights: 1,
    CountryCode: "IN",
    // CityId: "130443",
    CityId: null,
    CityName: "",
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
  let Search_function = () => {
    if (!searchQuerry.CheckInDate) {
      alert("Please select checkin date");
      return false;
    }
    if (!searchQuerry.CityId || !searchQuerry.CountryCode) {
      alert("Please select city code and country code");
      return false;
    }
    setloading(true);
    const performApiCall = async (requestData) => {
      try {
        console.log(searchQuerry);
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
          } else if (data.Error.ErrorCode === 3) {
            alert(
              "This City is Unavailable for now, Please try different City"
            );
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
    <Layout extraClass={"pt-160"}>
      <div id="Search_page">
        <img
          src="./assets/images/hotelSearch/hotel_search.png"
          alt=""
          className={!isHalfScreen ? "topimg " : "topimg shrink"}
        />
        <div className={!isHalfScreen ? "querry " : "querry active"}>
          <div className="pg_logo">
            <svg
              width="76"
              height="68"
              viewBox="0 0 76 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M56.7559 60.25H64.2559V30.25H41.7559V60.25H49.2559V37.75H56.7559V60.25ZM4.25586 60.25V4C4.25586 3.00544 4.65095 2.05161 5.35421 1.34835C6.05747 0.645088 7.0113 0.25 8.00586 0.25H60.5059C61.5004 0.25 62.4543 0.645088 63.1575 1.34835C63.8608 2.05161 64.2559 3.00544 64.2559 4V22.75H71.7559V60.25H75.5059V67.75H0.505859V60.25H4.25586ZM19.2559 30.25V37.75H26.7559V30.25H19.2559ZM19.2559 45.25V52.75H26.7559V45.25H19.2559ZM19.2559 15.25V22.75H26.7559V15.25H19.2559Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="">
            <div className="top">
              {/* <div className="search"> */}
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
                <p>Where?</p>
                <input
                  type="text"
                  name=""
                  id=""
                  className="citySearch"
                  placeholder="Enter destination or hotel name"
                  value={InputBox.city}
                  onChange={(e) =>
                    setInputBox({ done: false, city: e.target.value })
                  }
                />
                {InputBox?.city && !InputBox?.done && hotels_list && (
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
                            setInputBox({
                              ...InputBox,
                              city: hotels_list[cityCode],
                              done: true,
                            });
                          }}
                        >
                          {hotels_list[cityCode]}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              {/* </div> */}
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
                <p>Check-in</p>
                <input
                  type="date"
                  name=""
                  onChange={(e) => {
                    setSearchQuerry({
                      ...searchQuerry,
                      CheckInDate: convertToSlashFormat(e.target.value),
                    });
                    console.log(convertToSlashFormat(e.target.value));
                  }}
                  id=""
                  min={getCurrentDate()}
                />
              </div>
              {/* <span>Check-in</span> */}
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
                <p>Number of nights?</p>
                <div className="nights">
                  <button
                    onClick={() =>
                      setSearchQuerry({
                        ...searchQuerry,
                        NoOfNights: searchQuerry.NoOfNights + 1,
                      })
                    }
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <span>{searchQuerry.NoOfNights}</span>
                  <button
                    onClick={() => {
                      searchQuerry.NoOfNights > 1 &&
                        setSearchQuerry({
                          ...searchQuerry,
                          NoOfNights: searchQuerry.NoOfNights - 1,
                        });
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
                        d="M5 12h14"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* <span>Check-out</span> */}
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
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>

              <div className="box">
                <div className="tlabel" onClick={() => setpopup(!popup)}>
                  <p>Guest and rooms</p>
                  <h2>
                    {NoOfAdults} Adults, {NoOfRooms} Room
                  </h2>
                </div>
                <div
                  className="travelers-input"
                  style={{ display: popup ? "block" : "none" }}
                >
                  <div className="section">
                    <p>Adults</p>
                    <div className="box">
                      <button onClick={() => setNoOfAdults(NoOfAdults - 1)}>
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
                      <p>{NoOfAdults}</p>
                      <button onClick={() => setNoOfAdults(NoOfAdults + 1)}>
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
                    <p>Rooms</p>
                    <div className="box">
                      <button onClick={() => setNoOfRooms(NoOfRooms - 1)}>
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
                      <p>{NoOfRooms}</p>
                      <button onClick={() => setNoOfRooms(NoOfRooms + 1)}>
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
            <div className="down">
              {/* <div className="f"> */}
              {/* </div> */}
              {/* <div className="f"> */}
              <input type="checkbox" name="" id="" />
              <label htmlFor="">4 star</label>
              {/* </div> */}
              {/* <div className="f"> */}
              <input type="checkbox" name="" id="" />
              <label htmlFor="">3 star</label>
              {/* </div> */}
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
              {/* <div className="topBar">
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
              </div> */}
              <div className="sidebar">
                <h1>Filter By</h1>
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
                <h1>Hotel for your search</h1>
                {searchResponse.Results.map((result, index) => (
                  // {searchResponse.Results.filter(
                  //   (res) => res.ResultIndex == 9
                  // ).map((result, index) => (
                  <div
                    key={index}
                    className="hotel_res_tiles"
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
                    {console.log(result)}
                    <div className="top">
                      <img src={result.HotelPicture} alt="" />
                    </div>
                    <div className="mid">
                      <div className="">
                        <h1>{result.HotelName}</h1>
                        <p>{result.HotelPromotion}</p>
                        <h2>
                          <StarRating rating={result.StarRating} />
                        </h2>
                      </div>
                      <h2>
                        Fare -{" "}
                        <span>
                          {result.Price.CurrencyCode}{" "}
                          {result.Price?.PublishedPrice
                            ? result.Price.PublishedPrice
                            : result.Price.OfferedPrice
                            ? result.Price.OfferedPrice
                            : ""}
                        </span>
                      </h2>
                      <p>{result.HotelAddress}</p>
                    </div>
                  </div>
                ))}
                <span>... No more results</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="beforeContent2">
            <h1>Popular Near You</h1>
            <div className="">
              <div className="tile">
                <img src="./assets/images/hotelSearch/hotel_t1.png" alt="" />
                <div className="cnt">
                  <h1>Heaven Resort</h1>
                  <div>
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
                    <p>Varanasi, India</p>
                  </div>

                  <h2>
                    <StarRating rating={3} />
                  </h2>
                  <div className="">
                    <p>November, December</p>
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
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="tile">
                <img src="./assets/images/hotelSearch/hotel_t2.png" alt="" />
                <div className="cnt">
                  <h1>Hiking Mountains</h1>
                  <div>
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
                    <p>Himachal, India</p>
                  </div>

                  <h2>
                    <StarRating rating={2} />
                  </h2>
                  <div className="">
                    <p>November, December</p>
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
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="tile">
                <img src="./assets/images/hotelSearch/hotel_t3.png" alt="" />
                <div className="cnt">
                  <h1>Heaven Resort</h1>
                  <div>
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
                    <p>Varanasi, India</p>
                  </div>
                  <h2>
                    <StarRating rating={5} />
                  </h2>
                  <div className="">
                    <p>November, December</p>
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
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function StarRating({ rating }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="yellow" // Change the fill color as desired
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div>
      <span>{renderStars()}</span>
    </div>
  );
}
const convertToSlashFormat = (dateString) => {
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    throw new Error(
      "Invalid date format. Please provide a date in DD-MM-YYYY format."
    );
  }
  return parts[2] + "/" + parts[1] + "/" + parts[0];
};
