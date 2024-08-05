// src/ Weather.js

import React, { useState } from 'react'; // Import React and the useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import './App.css'; // Import the CSS file for styling

const Weather = () => {
  // Declare state variables using the useState hook
  const [city, setCity] = useState(''); // State to store the user's input for city name
  const [weather, setWeather] = useState(null); // State to store the fetched weather data
  const [error, setError] = useState(null); // State to store any error messages

  // Retrieve the API key for the weather service from environment variables
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  console.log('API Key:', apiKey); // Debugging: Log the API key to ensure it's loaded correctly

  // Function to fetch weather data from the API
  const fetchWeather = async () => {
    try {
      // Make a GET request to the weather API using axios
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      console.log('API Response:', response.data); // Debugging: Log the API response data

      // Update the weather state with the data received from the API
      setWeather(response.data);
      setError(null); // Clear any previous error messages
    } catch (error) {
      console.error('API Error:', error); // Debugging: Log any errors encountered during the API request

      // Set an error message if the API request fails and clear the weather data
      setError('Weather data not found. Please enter a valid city name.');
      setWeather(null);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('City:', city); // Debugging: Log the city input value

    // Fetch the weather data for the entered city
    fetchWeather();
  };

  // Function to reset the form and clear weather data and errors
  const handleRestart = () => {
    setCity(''); // Clear the city input field
    setWeather(null); // Clear the weather data
    setError(null); // Clear any error messages
  };

  return (
    <div className="Weather">
      <h2>Weather App</h2>
      {/* Form to enter the city name */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name" // Placeholder text for the input field
          value={city} // Bind the input value to the city state
          onChange={(e) => setCity(e.target.value)} // Update the city state on input change
        />
        <button type="submit">Get the Weather</button> {/* Button to submit the form */}
      </form>
      {/* Display error message if there is any */}
      {error && <p>{error}</p>}
      {/* Display weather information if available */}
      {weather && (
        <div>
          <h3>Weather in {weather.location.name}, {weather.location.country}</h3>
          <p>Temperature: {weather.current.temp_c}°C</p> {/* Display the current temperature */}
          <p>Condition: {weather.current.condition.text}</p> {/* Display the current weather condition */}
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} /> {/* Display the weather condition icon */}
          <button className="restart-button" onClick={handleRestart}>Restart</button> {/* Button to reset the form */}
        </div>
      )}
    </div>
  );
};

export default Weather; // Export the Weather component as the default export
