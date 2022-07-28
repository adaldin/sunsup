import { useEffect, useState } from "react";
import { openWeatherKey } from "../../config";
import Spinner from "react-bootstrap/Spinner";

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
        setCurrentWeather(DATA);
        setLoadedWeather(true);
      } catch (err) {
        console.error("There was an error connecting to the API");
      }
    }
    getWeather();
  }, [props.coordinates]);

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
        <Spinner animation="border" />
      )}
    </>
  );
}

export default Weather;
