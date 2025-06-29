// src/services/weatherService.js

import { API_KEY, BASE_URL } from "../config";

const GEO_DB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
const GEO_DB_HEADERS = {
  "X-RapidAPI-Key": "8ebc67bd02msha100cb0a2ff219fp186d7cjsnf3179ef7c4db",
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

// 🔍 Fetch up to 5 matching cities for autocomplete
export const fetchCitySuggestions = async (cityName) => {
  const res = await fetch(
    `${GEO_DB_API_URL}?namePrefix=${encodeURIComponent(cityName)}&limit=5`,
    {
      method: "GET",
      headers: GEO_DB_HEADERS,
    }
  );
  const data = await res.json();
  return data.data; // Array of city objects
};

// 🌤 Current weather by coordinates
export const fetchWeatherByCoordinates = async (latitude, longitude) => {
  const res = await fetch(
    `${BASE_URL}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  const weatherData = await res.json();
  return weatherData;
};

// 🔁 Alias for same function (optional)
export const fetchWeatherByLatLon = async (lat, lon) => {
  return await fetchWeatherByCoordinates(lat, lon);
};

// 📅 NEW: Fetch 5-day / 3-hour interval forecast data
export const fetchFiveDayForecast = async (latitude, longitude) => {
  const res = await fetch(
    `${BASE_URL}forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
  );
  const forecastData = await res.json();
  return forecastData; // returns a list of forecasts (every 3 hours)
};
