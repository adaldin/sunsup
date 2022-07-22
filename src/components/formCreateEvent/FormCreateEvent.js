import "./formCreateEvent.css";
// React
import { useState, useContext } from "react";
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
// import { db } from "../firebase/firebase";
// import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
// import { geocodingKey } from "../../config.js";

function FormCreateEvent() {
  //******STATES*/
  const [openForm, setOpenForm] = useState("");
  const [formData, setFormData] = useState({
    eventName: "",
    sPoint: "",
    ePoint: "",
    eventDate: "",
    eventTime: "",
    eventDescription: "",
    atendees: [],
  });
  //******CONTEXT*/
  const { user } = useAuth();

  const { locations } = useContext(LocationContext);

  //******USEEFFECT*/

  //******LOGIC*/
  function handleAnimation(e) {
    setOpenForm("drawer");
  }

  function handleFormData(e) {
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
  function handleEventCreation(e) {
    e.preventDefault();
    console.log("creates");
    console.log(locations);
    console.log(formData);
  }

  return (
    <>
      <Accordion onClick={handleAnimation} className={openForm}>
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

// let locationsSearch = locations.map((location, i) => {
//   console.log(i);
//   fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&location_type=ROOFTOP&result_type=street_address&key=${geocodingKey}`
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// });

// let locationsSearch = locations.map(async (location, i) => {
//   console.log(i);
//   const r = await fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&location_type=ROOFTOP&result_type=street_address&key=${geocodingKey}`
//   );
//   const d = await r.json();
//   console.log(d);
//   const components = d.results.find((place) => {
//     let locality = {};
//     locality = place.address_components.find((e) =>
//       e.types.includes("locality" || "political")
//     );
//     return locality.long_name;
//   });
// });
