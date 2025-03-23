import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

function SearchBox({ updateWeather }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState("");

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "227c794640f770d8db58a180dd98fa2a";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();

      let result = {
        currCity: city,
        temperature: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weatherDes: jsonResponse.weather[0].description,
      };

      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log(city);
      setCity("");
      let newInfo = await getWeatherInfo();
      updateWeather(newInfo);
    } catch (err) {
      setError("No such city exists!");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold text-sky-800 sm:text-3xl text-center">
          Search For The Weather
        </h2>
        <form
          className="flex flex-col items-center gap-2"
          onSubmit={handleSubmit}
        >
          <TextField
            id="city"
            label="City Name"
            variant="standard"
            required
            value={city}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            <p className="text-lg font-semibold">Search</p>
          </Button>
        </form>
      </div>
    </>
  );
}

export default SearchBox;
