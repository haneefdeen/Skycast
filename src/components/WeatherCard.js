import React from 'react';
import './WeatherCard.css';

// 🖼️ Import weather icons (if stored in src/assets/icons/)
import clear from '../icons/clear.svg';
import clouds from '../icons/clouds.svg';
import mist from '../icons/mist.svg';
import rain from '../icons/rain.svg';
import drizzle from '../icons/moderate_heavy_rain.svg';
import thunder from '../icons/thunder_rain.svg';
import snow from '../icons/snow.svg';
import noResult from '../icons/no-result.svg';

function WeatherCard({ data }) {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind: { speed, deg },
    visibility,
    sys: { sunrise, sunset, country },
    timezone,
  } = data;

 const utcTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
const localTime = new Date(utcTime.getTime() + timezone * 1000).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});



  const getDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const iconMap = {
    Clear: clear,
    Clouds: clouds,
    Mist: mist,
    Smoke: mist,
    Haze: mist,
    Fog: mist,
    Rain: rain,
    Drizzle: drizzle,
    Thunderstorm: thunder,
    Snow: snow,
  };

  const icon = iconMap[weather[0].main] || noResult;

  return (
    <div className="card">
      <h2>{name}, {country}</h2>
      <p className="local-time">🕒 Local Time: {localTime}</p>
      <div className="weather-main">
        <img src={icon} alt={weather[0].main} />
        <div>
          <h3>{weather[0].description}</h3>
          <p className="temp">{temp}°C</p>
          <p>Feels like: {feels_like}°C</p>
        </div>
      </div>
      <div className="details-grid">
        <div><strong>Humidity:</strong> {humidity}%</div>
        <div><strong>Pressure:</strong> {pressure} hPa</div>
        <div><strong>Visibility:</strong> {visibility / 1000} km</div>
        <div><strong>Wind:</strong> {speed} m/s {getDirection(deg)}</div>
        <div><strong>Sunrise:</strong> {new Date(sunrise * 1000).toLocaleTimeString()}</div>
        <div><strong>Sunset:</strong> {new Date(sunset * 1000).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

export default WeatherCard;
