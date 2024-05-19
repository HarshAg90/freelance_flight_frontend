import Payment from "@/src/components/payment";
import { server_url } from "@/src/config";
import Layout from "@/src/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function HotelDetails() {
  var [data, setData] = useState();
  var [RoomInfo, setRoomInfo] = useState();
  var [HotelInfo, setHotelInfo] = useState();
  var [loading, setLoading] = useState(false);
  var [Total, setTotal] = useState(0);
  var [imgLimit, setImgLimit] = useState(true);

  let [selectedRooms, setSelectedRooms] = useState([]);
  let [selected, setSelected] = useState([]);

  const router = useRouter();
  useEffect(() => {
    setData(JSON.parse(router.query.data));
    // console.log(JSON.parse(router.query.data));
  }, []);
  useEffect(() => {
    if (data) {
      setLoading(true);
      let querry = {
        TraceId: data.TraceId,
        SrdvType: data.SrdvType,
        SrdvIndex: data.SrdvIndex,
        ResultIndex: data.ResultIndex,
        HotelCode: data.HotelCode,
      };
      const fetchhotelInfo = async () => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const orderId = urlParams.get("order_id");

          const response = await fetch(`${server_url}/hotelsInfo`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authentication: "random_id", // Ensure correct header format
            },
            body: JSON.stringify({ data: querry }),
          });
          if (response.ok) {
            const data = await response.json();
            // console.log("hotel info");
            // console.log(data);
            if (data.HotelInfoResult.Error.ErrorCode !== 0) {
              alert(
                "Error in fetching hotel info, please retry with different hotel"
              );
            } else {
              setHotelInfo(data.HotelInfoResult);
            }
          } else {
            alert("API Request Failed:", response.status, response.statusText);
          }
        } catch (error) {
          console.log("An error occurred during the API request:", error);
        }
      };

      const fetchroomInfo = async () => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const orderId = urlParams.get("order_id");

          const response = await fetch(`${server_url}/hotelsRoomInfo`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authentication: "random_id", // Ensure correct header format
            },
            body: JSON.stringify({ data: querry }),
          });
          if (response.ok) {
            const data = await response.json();
            // console.log("roomInfo");
            // console.log(data);
            if (data.GetHotelRoomResult.Error.ErrorCode !== 0) {
              alert("Error in response");
            } else {
              setRoomInfo(data.GetHotelRoomResult);
            }
          } else {
            alert("API Request Failed:", response.status, response.statusText);
          }
        } catch (error) {
          console.log("An error occurred during the API request:", error);
        }
      };

      fetchhotelInfo();
      fetchroomInfo();
      setLoading(false);
    }
  }, [data]);

  let bookData = () => {
    return {
      // TraceId: HotelInfo.TraceId, // hb
      TraceId: "1", // hb
      SrdvType: HotelInfo.SrdvType, // hb
      SrdvIndex: HotelInfo.SrdvIndex, // hb
      ResultIndex: HotelInfo.ResultIndex, // hb
      HotelCode: HotelInfo.HotelDetails.HotelCode, // hb
      HotelName: HotelInfo.HotelDetails.HotelName, // hb
      GuestNationality: "IN", // manual
      NoOfRooms: toString(selectedRooms.length), // manual
      ClientReferenceNo: 0, // manual
      IsVoucherBooking: true, // manual
      HotelRoomsDetails: selectedRooms,
    };
  };

  // const bookHotel = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${server_url}/hotelsbooking`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authentication: "random_id", // Ensure correct header format
  //       },
  //       body: JSON.stringify({ data: bookData() }),
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       router.push({
  //         pathname: "/hotel-booking-successfull",
  //         query: { data: JSON.stringify(bookingData) },
  //       });
  //     } else {
  //       alert("API Request Failed:", response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.log("An error occurred during the API request:", error);
  //   }
  //   setLoading(false);
  // };

  const toggleRoomSelection = (element, index) => {
    let priceToAdd =
      parseFloat(element.Price.OfferedPrice) +
      parseFloat(element.Price.OfferedPrice * 0.1);

    if (selected.includes(index)) {
      // If room is already selected, remove it
      setSelectedRooms((prevSelectedRooms) =>
        prevSelectedRooms.filter((room) => room !== element)
      );
      setSelected((prevSelected) =>
        prevSelected.filter((selectedIndex) => selectedIndex !== index)
      );
      setTotal((prevTotal) => prevTotal - priceToAdd);
    } else {
      // If room is not selected, add it
      setSelectedRooms((prevSelectedRooms) => [...prevSelectedRooms, element]);
      setSelected((prevSelected) => [...prevSelected, index]);
      setTotal((prevTotal) => prevTotal + priceToAdd);
    }
  };

  if (!HotelInfo || !RoomInfo)
    return (
      <>
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
      </>
    );
  return (
    <Layout extraClass={"pt-160"}>
      <div id="HotelInfo">
        <div className="top">
          <a href="/HotelSearch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            Back to search
          </a>{" "}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </svg>
            Save
          </button>
        </div>
        <div className="body">
          <div className="imgs">
            {imgLimit
              ? HotelInfo.HotelDetails.Images.slice(0, 5).map(
                  (element, index) => {
                    return <img key={index} src={element} alt={index} />;
                  }
                )
              : HotelInfo.HotelDetails.Images.map((element, index) => {
                  return <img src={element} alt={index} />;
                })}
            <button onClick={() => setImgLimit(!imgLimit)}>
              {imgLimit ? "Show More" : "Show Less"}
            </button>
          </div>
          <div className="details">
            <div className="t">
              <h1>{HotelInfo.HotelDetails.HotelName}</h1>
              <div className="stars">
                {[...Array(HotelInfo.HotelDetails.StarRating)].map(
                  (_, index) => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      key={index}
                      viewBox="0 0 576 512"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                  )
                )}
              </div>
            </div>
            <p className="desc">{data.HotelDescription}</p>

            <h3>
              <span>Address:</span> {HotelInfo.HotelDetails.Address}
            </h3>
            <h2>Facilities</h2>
            <ul>
              {HotelInfo.HotelDetails.HotelFacilities.map((element, index) => {
                return <li key={index}>{element}</li>;
              })}
            </ul>
          </div>
          <h1>Available Rooms</h1>
          <div className="rooms">
            {RoomInfo.HotelRoomsDetails.map((element, index) => {
              return (
                <div
                  className={`room ${selected?.includes(index) && "active"}`}
                  onClick={() => {
                    toggleRoomSelection(element, index);
                  }}
                  key={index}
                >
                  <h1>{element.RoomTypeName}</h1>
                  {element.Amenities?.map((i, index) => {
                    return <p>{i}</p>;
                  })}
                  <h3>
                    <span>Cancalation charge:</span>{" "}
                    {element.CancellationPolicies[0].Charge}
                  </h3>
                  <h3>
                    <span>Last Date: </span>{" "}
                    {breakdownDateTime(element.LastCancellationDate).date}
                  </h3>
                  <br />
                  <h3>
                    Offered price:{element.Price.OfferedPrice} | Price per day:{" "}
                    {element.DayRates[0].Amount}
                  </h3>
                  <p>10% service charge</p>
                  <h2>
                    Price:{" "}
                    {parseInt(element.Price.OfferedPrice) +
                      parseInt(element.Price.OfferedPrice) * 0.1}
                  </h2>
                  <p className="sub">*click to select</p>
                </div>
              );
            })}
          </div>
          <div className="b">
            <h1>
              Total Price: <span>₹{Total}</span>
            </h1>
            {/* {Total && <button onClick={() => bookHotel()}>Book Now!</button>} */}
            {Total && (
              <Payment
                data={bookData()}
                amount={Total}
                type="hotel"
                setLoading={setLoading}
                btnClass={"success"}
              />
            )}
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

// const countryNames = {
//   "AF": "Afghanistan",
//   "AL": "Albania",
//   "DZ": "Algeria",
//   "AS": "American Samoa",
//   "AD": "Andorra",
//   "AO": "Angola",
//   "AI": "Anguilla",
//   "AQ": "Antarctica",
//   "AG": "Antigua and Barbuda",
//   "AR": "Argentina",
//   "AM": "Armenia",
//   "AW": "Aruba",
//   "AU": "Australia",
//   "AT": "Austria",
//   "AZ": "Azerbaijan",
//   "BS": "Bahamas",
//   "BH": "Bahrain",
//   "BD": "Bangladesh",
//   "BB": "Barbados",
//   "BY": "Belarus",
//   "BE": "Belgium",
//   "BZ": "Belize",
//   "BJ": "Benin",
//   "BM": "Bermuda",
//   "BT": "Bhutan",
//   "BO": "Bolivia",
//   "BA": "Bosnia and Herzegovina",
//   "BW": "Botswana",
//   "BR": "Brazil",
//   "IO": "British Indian Ocean Territory",
//   "BN": "Brunei Darussalam",
//   "BG": "Bulgaria",
//   "BF": "Burkina Faso",
//   "BI": "Burundi",
//   "KH": "Cambodia",
//   "CM": "Cameroon",
//   "CA": "Canada",
//   "CV": "Cape Verde",
//   "KY": "Cayman Islands",
//   "CF": "Central African Republic",
//   "TD": "Chad",
//   "CL": "Chile",
//   "CN": "China",
//   "CX": "Christmas Island",
//   "CC": "Cocos (Keeling) Islands",
//   "CO": "Colombia",
//   "KM": "Comoros",
//   "CG": "Congo",
//   "CD": "Democratic Republic of the Congo",
//   "CK": "Cook Islands",
//   "CR": "Costa Rica",
//   "HR": "Croatia",
//   "CU": "Cuba",
//   "CY": "Cyprus",
//   "CZ": "Czech Republic",
//   // Add more countries as needed
// };
