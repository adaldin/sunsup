import "../../global.css";
// React
import { useEffect, useState, useContext } from "react";
// Google-maps
import { GoogleMap, MarkerF } from "@react-google-maps/api";
// Context
import LocationContext from "../../context/locationContext";
import { set } from "date-fns";

function MapContainer(props) {
  //******CONTEXT*/
  const { locations, setLocations } = useContext(LocationContext);
  //******STATES*/
  const [currentLoc, setCurrentLoc] = useState({
    lat: 41.38505,
    lng: 2.17331,
  });
  const [markerUI, setMarkerUI] = useState("");
  const [markerDetail, setMarkerDetail] = useState([]);

  //******USEEFFECT*/
  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    displayMarkers(); // eslint-disable-next-line
  }, [locations]);

  //******LOGIC*/
  function getCurrentPosition() {
    if (navigator.geolocation && props.coordinates === undefined) {
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
    if (locations.length > 0 && props.coordinates === undefined) {
      let newMarker = locations.map((location, i) => (
        <MarkerF
          animation={4}
          position={location}
          key={i}
          onClick={(e) => handleMarker(e, i)}
        />
      ));
      setMarkerUI(newMarker);
    } else if (props.coordinates) {
      let newMarker = (
        <MarkerF animation={4} position={props.coordinates.entry[0]} />
      );
      setMarkerUI(newMarker);
    } else {
      setMarkerUI("");
    }
  }

  function handleMarker(_e, i) {
    setLocations((prevLocation) => {
      let newLocation = [...prevLocation];
      newLocation.splice(i, 1);
      return newLocation;
    });
  }
  function cleanMarkers() {
    setMarkerUI("");
  }

  return (
    <GoogleMap
      zoom={13}
      center={currentLoc}
      options={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: true,
        controlSize: 20,
        gestureHandling: "cooperative",
      }}
      mapContainerClassName="map--size___container"
      onClick={handleClick}
      onLoad={cleanMarkers}
    >
      {markerUI}
    </GoogleMap>
  );
}
export default MapContainer;
