import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ data }) => {
  if (!data?.main || !data?.weather?.[0]) return null;

  /* round for nicer display */
  const temp = Math.round(data.main.temp);

  return (
    <div className="weather-card">
      <h2>{data.name}</h2>

      {/* temperature row with icon */}
      <div className="temp-row">
        <img
          src="/assets/icons/thermometer.svg"
          alt="thermometer icon"
          className="temp-icon"
        />
        <p className="temp">{temp} °C</p>
      </div>

      <p className="condition">{data.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
