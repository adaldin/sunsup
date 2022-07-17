// React
import { useState, useEffect } from "react";
// Firebase
import { db } from "../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
// Keys
import { geocodingKey } from "../../config.js";
// Componets
import EventItem from "./EventItem";

function EventsList() {
  //******STATES*/
  const [events, setEvents] = useState([]);
  // const [eventsUI, setEventsUI] = useState("");

  //******USE EFFECT*/
  useEffect(() => {
    getData();
    getAdress();
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
  async function getAdress() {
    const r = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=41.38505,2.17331&key=${geocodingKey}`
    );
    const d = await r.json();
    const addreses = d.formatted_address;
  }

  // function displayData() {
  //   console.log(events);
  //   const showData = events.map((event, i) => (
  //     <EventItem key={i} events={event}>
  //       {event.properties.eventName}
  //     </EventItem>
  //   ));
  //   setEventsUI(showData);
  // }
  return (
    <div className="d-flex flex-column gap-2 p-2">
      {events.map((event, i) =>
        event !== null ? <EventItem key={i} event={event} /> : ""
      )}
    </div>
  );
}
export default EventsList;
