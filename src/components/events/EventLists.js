// React
import { useEffect, useContext, useState } from "react";
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
  const [filteredTrips, setFilteredTrips] = useState([]);
  //******USE EFFECT*/
  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    displayTodayTrips(); // eslint-disable-next-line
  }, [events]);

  //******LOGIC*/
  async function getData() {
    let newEvents = [];
    try {
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
    } catch (err) {
      console.log("Error getting cached document:", err);
    }
  }

  function displayTodayTrips() {
    let dateToday = new Date().toISOString().split("T")[0];
    let filtererTrips = events.filter(
      (trip) => trip.properties.eventDate === dateToday
    );
    setFilteredTrips(filtererTrips);
  }

  return (
    <div className="d-flex flex-column gap-2 p-2">
      {filteredTrips.map((event, i) =>
        event !== null ? <EventItem key={i} event={event} /> : ""
      )}
    </div>
  );
}
export default EventsList;
