import React, { useState } from "react";
import "./styles/App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import {
  fetchCitySuggestions,
  fetchWeatherByCoordinates,
  fetchFiveDayForecast,
} from "./services/weatherService";

/* -------- single shared background image -------- */


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (cityObjOrName) => {
    try {
      let city = cityObjOrName;

      if (typeof cityObjOrName === "string") {
        const cities = await fetchCitySuggestions(cityObjOrName);
        if (!Array.isArray(cities) || cities.length === 0) {
          throw new Error("City not found");
        }
        city = cities[0]; // first match
      }

      const [weather, forecast] = await Promise.all([
        fetchWeatherByCoordinates(city.latitude, city.longitude),
        fetchFiveDayForecast(city.latitude, city.longitude),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
      setError("");
    } catch (err) {
      console.error("Search error:", err.message);
      setError("City not found");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  /* -------- inline style using the single image -------- */
const backgroundStyle = {
  
  backgroundSize: "cover",          // maintains aspect-ratio
  backgroundPosition: "center center",
  
     
  minHeight: "100vh",
  width: "100%",
  padding: "2rem",
};


  return (
    <div className="App" style={backgroundStyle}>
      <h1>🌤 Weather App</h1>

      <SearchBar
        onSearch={handleSearch}
        fetchSuggestions={fetchCitySuggestions}
      />

      {error && <p className="error">{error}</p>}

      <WeatherCard data={weatherData} />
      <ForecastCard forecast={forecastData} />
    </div>
  );
}

export default App;
