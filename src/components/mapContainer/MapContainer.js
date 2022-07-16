import "../../global.css";
// React
import { useEffect, useState } from "react";
// Google-maps
import { GoogleMap, MarkerF } from "@react-google-maps/api";

function MapContainer() {
  //******STATES*/
  const [locations, setLocations] = useState([]);
  const [currentLoc, setCurrentLoc] = useState({
    lat: 41.38505,
    lng: 2.17331,
  });
  const [markerUI, setMarkerUI] = useState("");

  //******USEEFFECT*/
  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    displayMarkers(); // eslint-disable-next-line
  }, [locations]);

  //******LOGIC*/
  function getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLoc({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }

  function handleClick(event) {
    if (locations.length < 2) {
      let latLong = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      setLocations((preLocation) => [...preLocation, latLong]);
    } else {
      alert("You just need 2 markers: starting and ending point");
    }
  }

  function displayMarkers() {
    console.log(locations);
    if (locations.length > 0) {
      let newMarker = locations.map((location, i) => (
        <MarkerF
          position={location}
          key={i}
          onClick={(e) => handleMarker(e, i)}
        />
      ));
      setMarkerUI(newMarker);
    } else {
      setMarkerUI("");
    }
  }

  function handleMarker(e, i) {
    setLocations((prevLocation) => {
      let newLocation = [...prevLocation];
      newLocation.splice(i, 1);
      return newLocation;
    });
  }

  return (
    <GoogleMap
      zoom={10}
      center={currentLoc}
      mapContainerClassName="map--size___container"
      onClick={handleClick}
    >
      {markerUI}
    </GoogleMap>
  );
}
export default MapContainer;
