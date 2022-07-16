// React
import { useState, useEffect } from "react";
// Firebase
import { db } from "../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

function EventsList() {
  //******STATES*/
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    type: "Feature",
    geometry: {
      type: "",
      coordinates: [0, 0],
    },
    properties: {
      eventName: "",
      description: "",
      date: "",
      eventID: "",
    },
  });

  //******USE EFFECT*/
  useEffect(() => {
    getData();
  }, []);

  //******LOGIC*/
  async function getData() {
    const q = query(collection(db, "eventos"));
    const querySnapshot = await getDocs(q);
    console.log("db", querySnapshot);
    querySnapshot.forEach((doc) => {
      // let datosMolones = doc.data();
      // console.log("eeee", datosMolones);
      // console.log(`${doc.id}: ${doc.data().description}`);
      let id = doc.id;
      let geometry = doc.data().coordinates;
      console.log(id);
      setCurrentEvent();
    });
  }

  return <p>aquí listado de eventos de hoy en tu locación</p>;
}
export default EventsList;
