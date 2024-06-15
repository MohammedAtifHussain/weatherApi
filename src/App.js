import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  const fetchWeatherData = async (location) => {
    try {
      const apiKey = 'YOUR_OPENWEATHER_API_KEY';
      console.log(`Fetching weather data for ${location}...`);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: location,
          units: 'metric',
          appid: apiKey
        }
      });
      setWeatherData(prevData => [...prevData, response.data]);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Could not fetch weather data. Please try again.');
    }
  };

  const handleSearch = () => {
    if (location) {
      fetchWeatherData(location);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData.map((data, index) => (
        <div key={index} className="weather-info">
          <h2>{data.name}</h2>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
          <p>Weather: {data.weather[0].description}</p>
          <p>Date & Time: {new Date().toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
