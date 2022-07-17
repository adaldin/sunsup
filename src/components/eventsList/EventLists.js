// React
import { useState, useEffect } from "react";
// Firebase
import { db } from "../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
// Keys
import { mapKey } from "../../keys";

function EventsList() {
  //******STATES*/
  const [events, setEvents] = useState([]);
  // const [eventsUI, setEventsUI] = useState("");

  //******USE EFFECT*/
  useEffect(() => {
    getData();
    // displayData(); // eslint-disable-next-line
  }, []);

  //******LOGIC*/
  async function getData() {
    let newEvents = [];
    const q = query(collection(db, "events"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let newEvent = {
        geometry: {
          coordinates: [
            [
              doc.data().geometry.coordinates[0][0],
              doc.data().geometry.coordinates[0][1],
            ][
              (doc.data().geometry.coordinates[1][0],
              doc.data().geometry.coordinates[0][1])
            ],
          ],
          type: doc.data().geometry.type,
        },
        properties: {
          atendees: doc.data().properties.atendees,
          eventDate: doc.data().properties.eventDate,
          eventName: doc.data().properties.eventName,
          eventTime: doc.data().properties.eventTime,
        },
        type: doc.data().type,
        id: doc.id,
      };

      setEvents((prevEvents) => {
        newEvents = [newEvent, ...prevEvents];
        // console.log(newEvents);
        return newEvents; //ERROR-RENDERIZA DOBLE
      });
    });
  }
  // AQUI GET ADDRESSES
  // async function getAdress() {}
  // `https://maps.googleapis.com/maps/api/geocode/json?latlng=AQUI_LAT,AQUI_LONG&key=${mapKey}`

  // function displayData() {
  //   const showData = events.map((event, i) => (
  //     <p key={i}>{event.properties.eventName}</p>
  //   ));
  //   setEventsUI(showData);
  // }
  return (
    <>
      <p>aquí listado eventos</p>
    </>
  );
}
export default EventsList;
