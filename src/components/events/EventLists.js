// React
import { useEffect, useContext } from "react";
// Firebase
import { db } from "../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
// Componets
import EventItem from "./EventItem";
// Context
import EventsContext from "../../context/eventsContext";

function EventsList() {
  //******CONTEXT*/
  const { events, setEvents } = useContext(EventsContext);
  //******STATES*/

  //******USE EFFECT*/
  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, []);
  // getAdress();

  //******LOGIC*/
  async function getData() {
    let newEvents = [];
    const q = query(collection(db, "events"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let newEvent = {
        geometry: {
          coordinates: {
            entry: [
              doc.data().geometry.coordinates.entry[0],
              doc.data().geometry.coordinates.entry[1],
            ],
            exit: [
              doc.data().geometry.coordinates.exit[0],
              doc.data().geometry.coordinates.exit[1],
            ],
          },
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
      newEvents.push(newEvent);
    });
    setEvents(newEvents);
  }
  // AQUI GET ADDRESSES
  // async function getAdress() {
  //   const r = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=41.38505,2.17331&key=${geocodingKey}`
  //   );
  //   const d = await r.json();
  //   console.log(d);
  //   const addreses = d.results[4].formatted_address;
  //   console.log(addreses);
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
