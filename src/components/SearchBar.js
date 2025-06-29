import React, { useState, useEffect } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, fetchSuggestions }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getSuggestions = async () => {
      if (city.length > 2 && typeof fetchSuggestions === "function") {
        try {
          const results = await fetchSuggestions(city);
          setSuggestions(Array.isArray(results) ? results : []);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(() => {
      getSuggestions();
    }, 300); // debounce

    return () => clearTimeout(delayDebounce);
  }, [city, fetchSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city); // fallback if user types manually and presses Enter
      setCity("");
      setSuggestions([]);
    }
  };

  const handleSelect = (selectedCityObject) => {
    onSearch(selectedCityObject); // send full object to App.js
    setCity("");
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {Array.isArray(suggestions) && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((s) => (
            <li key={s.id} onClick={() => handleSelect(s)}>
              {s.name}, {s.region}, {s.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
