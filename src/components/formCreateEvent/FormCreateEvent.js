// React
import { useState, useEffect, useContext } from "react";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
// Context
import { useAuth } from "../../context/authContext.js";
import LocationContext from "../../context/locationContext";
//Firestore
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { geocodingKey } from "../../config.js";

function FormCreateEvent() {
  //******STATES*/
  const [formData, setFormData] = useState({
    eventName: "",
    sPoint: "",
    ePoint: "",
    eventDate: "",
    eventTime: "",
    eventDescription: "",
    atendees: [],
  });
  const [enterExitPoints, setEnterExitPoints] = useState({
    sPoint: "",
    ePoint: "",
  });
  //******CONTEXT*/
  const { user } = useAuth();
  const { locations } = useContext(LocationContext);

  // aquí traer locations/sPoint ePoint context

  //******USEEFFECT*/
  useEffect(() => {
    getUserName(); // eslint-disable-next-line
  }, [user]);

  //******LOGIC*/
  async function getUserName() {
    const usersRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(usersRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  async function handleFormData(e) {
    const { name, value } = e.target;
    const atendees = [user.email];

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
        atendees: atendees,
      };
    });
  }

  async function handleEventCreation(e) {
    e.preventDefault();
    let newAddress = getAddres();
    let newPaddleTrip = createPaddleTrip(newAddress);
    const docRef = await addDoc(collection(db, "events"), newPaddleTrip);
    console.log("Document written with ID: ", docRef.id);
  }
  function getAddres() {
    let locationsSearch = locations.map(async (location) => {
      const r = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&location_type=ROOFTOP&result_type=street_address&key=${geocodingKey}`
      );
      const d = await r.json();
      const addreses = d.results.filter((place) => {
        let newplace = place.address_components.includes("types");
        console.log(newplace);
        return newplace;
      });
      return addreses;
    });
  }

  function createPaddleTrip(newAddress) {
    let atendeesArr = [];
    let atendees = atendeesArr.push(user.email);
    let newPaddleTrip = {
      geometry: {
        coordinates: {
          entry: [locations[0].lat, locations[0].lng],
          exit: [locations[1].lat, locations[1].lng],
        },
        type: "Multipoint",
      },
      properties: {
        atendees: atendees,
        eventDate: formData.eventDate,
        eventName: formData.eventName,
        eventTime: formData.eventTime,
        ePoint: `${locations[1][0] - locations[1][1]}`,
        sPoint: `${locations[0][0] - locations[0][1]}`,
      },
      type: "Feature",
      timeStamp: new Date(),
    };
    return newPaddleTrip;
  }
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>More about your trip</Accordion.Header>
          <Accordion.Body>
            <Row
              as={Form}
              onSubmit={handleEventCreation}
              className="bg-transparent px-2  justify-content-evenly"
            >
              <Form.Group as={Col} xs={12} controlId="formBasicTripName">
                <Form.Label>Trip Name</Form.Label>
                <Form.Control
                  type="text"
                  name="eventName"
                  required
                  placeholder="Très viles route"
                  onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripPlace">
                <Form.Label>Starting Point</Form.Label>
                {/* AQUI GEOCODING TRANSFORMING LAT LNG TI INPUT.VALUE ADDRESS */}
                <Form.Control
                  type="text"
                  name="sPoint"
                  required
                  placeholder="Caldes d'Estrac"
                  onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripPlace">
                <Form.Label>Exit Point</Form.Label>
                {/* AQUI GEOCODING TRANSFORMING LAT LNG TI INPUT.VALUE ADDRESS */}
                <Form.Control
                  type="text"
                  name="ePoint"
                  required
                  placeholder="Arenys de Mar"
                  onChange={handleFormData}
                />
              </Form.Group>

              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a date</Form.Label>
                <Form.Control
                  type="date"
                  name="eventDate"
                  required
                  placeholder="08/08/2022"
                  onChange={handleFormData}
                />
              </Form.Group>
              <Form.Group as={Col} xs={6} controlId="formBasicTripDate">
                <Form.Label>Select a time</Form.Label>
                <Form.Control
                  type="time"
                  name="eventTime"
                  required
                  placeholder="07:00"
                  onChange={handleFormData}
                />
              </Form.Group>
              <Form.Group as={Col} xs={12} controlId="formBasicTripDate">
                <Form.Label>Enter a description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="eventDescription"
                  placeholder="Entering to the water close to the beacons system, turning to the left on the rocks system an moving foward until we reach Areny's Port"
                  required
                  onChange={handleFormData}
                />
              </Form.Group>

              {/* submit */}
              <div className="d-grid py-2">
                <Button variant="secondary" type="submit">
                  Save Trip
                </Button>
              </div>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
export default FormCreateEvent;
