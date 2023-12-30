import { useRouter } from "next/router";
import React, { useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import Layout from "@/src/layout/Layout";

const SelectOptionsExample = ({
  selectedOption,
  setSelectedOption,
  str_desp,
}) => {
  //   const [selectedOption, setSelectedOption] = useState('');

  const optionsData = [
    { name: "Andhra Pradesh", value: "AND" },
    { name: "Arunachal Pradesh", value: "ARU" },
    { name: "Assam", value: "ASM" },
    { name: "Bihar", value: "BIH" },
    { name: "Chhattisgarh", value: "CHG" },
    { name: "Goa", value: "GOA" },
    { name: "Gujarat", value: "GUJ" },
    { name: "Haryana", value: "HAR" },
    { name: "Himachal Pradesh", value: "HIM" },
    { name: "Jharkhand", value: "JHA" },
    { name: "Karnataka", value: "KAR" },
    { name: "Kerala", value: "KER" },
    { name: "Madhya Pradesh", value: "MAD" },
    { name: "Maharashtra", value: "MAH" },
    { name: "Manipur", value: "MAN" },
    { name: "Meghalaya", value: "MEG" },
    { name: "Mizoram", value: "MIZ" },
    { name: "Nagaland", value: "NAG" },
    { name: "Odisha", value: "ODI" },
    { name: "Punjab", value: "PUN" },
    { name: "Rajasthan", value: "RAJ" },
    { name: "Sikkim", value: "SIK" },
    { name: "Tamil Nadu", value: "TAM" },
    { name: "Telangana", value: "TEL" },
    { name: "Tripura", value: "TRI" },
    { name: "Uttar Pradesh", value: "UTT" },
    { name: "Uttarakhand", value: "UTK" },
    { name: "West Bengal", value: "WES" },
    { name: "Andaman and Nicobar Islands", value: "ANI" },
    { name: "Chandigarh", value: "CHD" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", value: "DNH" },
    { name: "Lakshadweep", value: "LAK" },
    { name: "Delhi", value: "DEL" },
    { name: "Puducherry", value: "PUD" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // <div>
  // <label>Select State:</label>
  return (
    <select
      class="display-block"
      value={selectedOption}
      onChange={handleOptionChange}
    >
      <option value="">{str_desp}</option>
      {optionsData.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
  // {/* Display the selected option */}
  // {selectedOption && (
  //   <p>
  //     Selected State:{" "}
  //     {optionsData.find((option) => option.value === selectedOption).name}
  //   </p>
  // )} */}
  // </div>
};

const FlightSearchResults = ({ results, onResultClick }) => {
  // Function to handle result click
  const handleResultClick = (resultIndex) => {
    // Call the provided callback function with the resultIndex
    onResultClick(resultIndex);
  };

  return (
    <div className="search_res">
      <h2>Available flights</h2>
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
            >
              {console.log(result)}
              <p>
                Name: <span>{result.Segments[0][0].Airline.AirlineName}</span>,
                Code: <span>{result.Segments[0][0].Airline.AirlineCode}</span>
              </p>
              <p>
                Takeoff Time: {result.Segments[0][0].ArrTime}, Status{" "}
                {result.Segments[0][0].FlightStatus}
              </p>
              <p>Fare - Rs {result.Fare.PublishedFare}</p>
              {/* <p>ResultIndex: {result.ResultIndex}</p>
              <p>Source: {result.Source}</p> */}
              {/* Add more parameters as needed */}
              <button onClick={() => handleResultClick(result)}>
                Book Flight
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const DateTimePicker = ({ selectedDateTime, setSelectedDateTime }) => {
  // State variable to store the selected date and time
  //   const [selectedDateTime, setSelectedDateTime] = useState('');

  // Event handler for date and time change
  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  // <div>
  //   <label>Select Date and Time:</label>
  return (
    <input
      type="datetime-local"
      value={selectedDateTime}
      onChange={handleDateTimeChange}
    />
  );
  //   {/* Display the selected date and time */}
  //   {selectedDateTime && <p>Selected Date and Time: {selectedDateTime}</p>}
  // </div>
};

export default function Search() {
  let [adult, setAdults] = useState(true);
  let [adult_no, setAdult_no] = useState(1);
  let [child, setChild] = useState(false);
  let [child_no, setChild_no] = useState(0);
  let [infant, setInfant] = useState(false);
  let [infant_no, setInfant_no] = useState(0);

  let [origin, setOrigin] = useState("");
  let [Destination, setDestinationo] = useState("");
  let [seat_class, setSeat_Class] = useState("1");
  let [departure_time, setDepTime] = useState("");
  let [arrival_time, setArrTime] = useState("");
  let [selectValue, setSelectValue] = useState("1");

  let [search, setSearch] = useState(false);
  let [searchResponse, setSearchResponse] = useState();

  let [bookingData, setBookingData] = useState();

  const router = useRouter();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectValue(selectedValue);
    // console.log('Selected value:', selectedValue);
  };
  const handleClassChange = (e) => {
    const selectedValue = e.target.value;
    setSeat_Class(selectedValue);
    // console.log('Selected value:', selectedValue);
  };
  var book_req_Fn = async (data) => {
    // console.log(data)
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
  };
  var data = {
    AdultCount: adult_no,
    ChildCount: child_no,
    InfantCount: infant_no,
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
    const performApiCall = async (requestData) => {
      try {
        console.log(data)
        const response = await fetch("http://13.235.99.157/search_flights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authentication: "random_id",
          },
          body: JSON.stringify({ data: requestData }),
        });

        if (response.ok) {
          const data = await response.json();
          // console.log('API Response:', data);
          setSearchResponse(data);
          setSearch(true);
        } else {
          alert("API Request Failed:", response.status, response.statusText);
        }
      } catch (error) {
        alert("An error occurred during the API request:", error);
      }
    };
    performApiCall(data);
    // console.log(data)
  };
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Flight Search"} />
      <div id="Search_page">
        <div className="querry">
          <div className="top">
            <select
              class="display-block"
              value={selectValue}
              onChange={handleSelectChange}
            >
              <option value="1">OneWay</option>
              <option value="2">Return</option>
              {/* <option value="3">multiCity</option> */}
            </select>
            <div className="count">
              <div>
                <input
                  type="checkbox"
                  checked={adult}
                  onChange={() => {
                    adult ? setAdults(false) : setAdults(true);
                  }}
                />
                <label>Adults</label>
                {adult && (
                  <input
                    type="text"
                    placeholder="Input 1"
                    value={adult_no}
                    onChange={(e) => {
                      setAdult_no(e.target.value);
                    }}
                  />
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={child}
                  onChange={() => {
                    child ? setChild(false) : setChild(true);
                  }}
                />
                <label>childs</label>
                {child && (
                  <input
                    type="text"
                    placeholder="Input 1"
                    value={child_no}
                    onChange={(e) => {
                      setChild_no(e.target.value);
                    }}
                  />
                )}
              </div>

              <div>
                <input
                  type="checkbox"
                  checked={infant}
                  onChange={() => {
                    infant ? setInfant(false) : setInfant(true);
                  }}
                />
                <label>infants</label>
                {infant && (
                  <input
                    type="text"
                    placeholder="Input 1"
                    value={infant_no}
                    onChange={(e) => {
                      setInfant_no(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
            <label>
              Cabin Class:
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
            </label>
          </div>
          <div className="mid">
            <SelectOptionsExample
              selectedOption={origin}
              setSelectedOption={setOrigin}
              str_desp={"From where?"}
            />
            <SelectOptionsExample
              selectedOption={Destination}
              setSelectedOption={setDestinationo}
              str_desp={"To where?"}
            />
          </div>
          <div className="down">
            <div className="">
              <label>Arrival Date</label>
              <DateTimePicker
                selectedDateTime={departure_time}
                setSelectedDateTime={setDepTime}
              />
            </div>
            <div className="">
              <label>Departure Date</label>
              <DateTimePicker
                selectedDateTime={arrival_time}
                setSelectedDateTime={setArrTime}
              />
            </div>
          </div>
          <button
            onClick={() => {
              Search_function();
            }}
          >
            Search
          </button>
        </div>
        {search && (
          <FlightSearchResults
            results={searchResponse.Results}
            onResultClick={book_req_Fn}
          />
        )}
      </div>
    </Layout>
  );
}
