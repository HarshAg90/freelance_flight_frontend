import React, { useState, useEffect } from 'react';

const CitySelector= ({ cityData,setSelectedOption,str_desp }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [selectedKey, setSelectedKey] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isListHovered, setIsListHovered] = useState(false);
    const majorCities = ["DEL",'BLR','BOM','HDD','MAA'];
    useEffect(() => {
      if(searchTerm !==''){
        const filtered = Object.keys(cityData).filter((key) =>
          cityData[key].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCities(filtered);
        console.log(filteredCities)
      }else{
        setFilteredCities(majorCities);
      }
    }, [searchTerm, cityData]);
  
    const handleItemClick = (key) => {
      setSelectedKey(key);
      setSelectedOption(key)
      setSelectedValue(cityData[key]);
      setIsInputFocused(false);
      setIsListHovered(false);
      setSearchTerm(`${cityData[key]} | ${key}`)

    };
  
    return (
      <div className='City_search' onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}>
        <input
          type="text"
          placeholder={str_desp}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => !isListHovered && setIsInputFocused(false)}
        />
        {(isInputFocused || isListHovered) && (
        <ul className='search_list'
        onMouseEnter={() => setIsListHovered(true)}
        onMouseLeave={() => setIsListHovered(false)}
        >
          {filteredCities.map((key) => (
            <li key={key} onClick={() => handleItemClick(key)}>
              {cityData[key]}
            </li>
          ))}
        </ul>
      )}
        {/* {selectedKey && (
        //   <div>
        //     <p>Key: {selectedKey}</p>
        //     <p>Selected Value: {selectedValue}</p> 
        //   </div>
        )} */}
      </div>
    );
};
export default CitySelector;

// // Example usage
// const cityData = {
//   "DEL": "Delhi",
//   "MUM": "Mumbai",
//   "BAN": "Bangalore",
//   "CHE": "Chennai",
//   // Add more city data as needed
// };

      {/* <CitySelector cityData={cityData} /> */}

