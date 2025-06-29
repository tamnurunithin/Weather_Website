import React from "react";
import "./ForecastCard.css";

const ForecastCard = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Group forecast into one entry per day (every 24 hours)
  const daily = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {daily.map((day, index) => {
          const date = new Date(day.dt_txt).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          return (
            <div className="forecast-card" key={index}>
              <h3>{date}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>{day.weather[0].main}</p>
              <p>{Math.round(day.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
