import "./App.css";
import SearchBox from "./SearchBox";
import Info from "./Info";
import { useState } from "react";
import bg from "./assets/mild.jpg";

function App() {
  let [weatherInfo, setWeatherInfo] = useState({
    currCity: "Delhi",
    feelsLike: 24.84,
    temperature: 25.3,
    tempMin: 25.2,
    tempMax: 25.7,
    humidity: 65,
    weatherDes: "haze",
  });

  let updateWeather = (result) => {
    setWeatherInfo(result);
  };

  return (
    <>
      <div className="p-3 h-screen w-full flex flex-col gap-6 items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{backgroundImage: `url(${bg})`}}
      >
        <SearchBox updateWeather={updateWeather} />
        <Info info={weatherInfo} />
      </div>
    </>
  );
}

export default App;
