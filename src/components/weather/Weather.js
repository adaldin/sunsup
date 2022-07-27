import { useEffect, useState } from "react";
import { openWeatherKey } from "../../config";

function Weather(props) {
  //******STATES*/
  const [currentWeather, setCurrentWeather] = useState({});
  const [loadedWeather, setLoadedWeather] = useState(false);

  //******EFFECT*/
  useEffect(() => {
    async function getWeather() {
      try {
        const LAT = props.coordinates[0];
        const LON = props.coordinates[1];
        const RESPONSE = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${openWeatherKey}&units=metric&lang=es`
        );
        const DATA = await RESPONSE.json();
        console.log(DATA);
        setCurrentWeather(DATA);
        setLoadedWeather(true);
      } catch (err) {
        console.error("There was an error connecting to the API");
      }
    }
    getWeather();
  }, []);

  return (
    <>
      {loadedWeather ? (
        <div style={{ width: "50px" }}>
          <img
            className="img-fluid"
            alt={`weather in ${currentWeather.name}`}
            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Weather;
