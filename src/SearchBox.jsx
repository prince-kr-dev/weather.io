import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SearchBox({ updateWeather }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "227c794640f770d8db58a180dd98fa2a";

  // Fetch weather by city name
  const getWeatherByCity = async (cityName) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.message || "Failed to fetch weather.");
      }

      return {
        currCity: cityName,
        temperature: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weatherDes: jsonResponse.weather[0].description,
      };
    } catch (err) {
      throw err;
    }
  };

  // Fetch weather by lat/lon
  const getWeatherByCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.message || "Failed to fetch weather.");
      }

      return {
        currCity: jsonResponse.name,
        temperature: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weatherDes: jsonResponse.weather[0].description,
      };
    } catch (err) {
      throw err;
    }
  };

  // On component mount, get current location weather automatically
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weatherData = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          updateWeather(weatherData);
          setError("");
        } catch (err) {
          setError(err.message || "Failed to fetch weather for current location.");
        }
      },
      () => {
        setError("Permission denied or unable to retrieve location.");
      }
    );
  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setError("");
  };

  const handleCitySubmit = async (event) => {
    event.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const weatherData = await getWeatherByCity(city.trim());
      updateWeather(weatherData);
      setCity("");
      setError("");
    } catch (err) {
      setError(err.message || "No such city exists!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <h2 className="text-2xl font-bold text-sky-800 sm:text-3xl text-center">
        Search For The Weather
      </h2>

      <form onSubmit={handleCitySubmit} className="flex flex-col items-center gap-1">
        <TextField
          id="city"
          label="City Name"
          variant="standard"
          required
          value={city}
          onChange={handleCityChange}
          autoComplete="off"
        />
        <Button variant="contained" type="submit">
          <p className="text-lg font-semibold">Search</p>
        </Button>
      </form>

      {error && <p className="text-red-600 font-semibold">{error}</p>}
    </div>
  );
}

export default SearchBox;
