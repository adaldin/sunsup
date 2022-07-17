// React
import { useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

// Components
import MapContainer from "../mapContainer/MapContainer";
import FormCreateEvent from "../formCreateEvent/FormCreateEvent";
// Google-Maps
import { useLoadScript } from "@react-google-maps/api";
// Keys
import { mapKey } from "../../keys";

function CreateEvent() {
  //******STATES*/
  const [show, setShow] = useState(false);
  //******LOGIC*/
  // modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapKey,
    libraries: ["places"],
  });
  if (!isLoaded) {
    return <Spinner animation="border" />;
  }

  return (
    <>
      <div>
        <Button
          variant="dark"
          onClick={handleShow}
          className="rounded-circle shadow fw-bold"
        >
          +
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} className="modal--container">
        <Modal.Header closeButton>
          <Modal.Title>Mark entry and exit point</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <MapContainer className="map--position__container" />
          <FormCreateEvent />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default CreateEvent;

// function handleEventCreation() {
//     console.log("crear evento");
//   }

//   function handleDate(event) {
//     event.preventDefault();
//     console.log(event.target.value);
//   }

// <Form onSubmit={handleEventCreation}>
// <h6>Create a new paddleboard trip</h6>
// {/* name */}
// <Form.Group controlId="formBasicTripName">
//   <Form.Label>Trip Name</Form.Label>
//   <Form.Control
//     type="text"
//     name="eventName"
//     required
//     placeholder="Très viles route"
//   />
// </Form.Group>
// {/* place */}
// <Form.Group controlId="formBasicTripPlace">
//   <Form.Label>Starting Point</Form.Label>
//   <Form.Control
//     type="text"
//     name="location"
//     required
//     placeholder="Caldes d'Estrac"
//   />
// </Form.Group>
// {/* date */}
// <Form.Group controlId="formBasicTripDate">
//   <Form.Label>Select a date</Form.Label>
//   <Form.Control
//     type="date"
//     name="date"
//     required
//     placeholder="08/08/2022"
//     onChange={handleDate}
//     min=
//   />
// </Form.Group>
// {/* wheather */}
// <p>Aquí current wheather en esa location en dia selecionado </p>
// <p>
//   El día seleccionado debe ser no mayor a 5 días mas de dia de
//   creación
// </p>
// {/* submit */}
// <div className="d-grid">
//   <Button variant="secondary" type="submit">
//     Continue
//   </Button>
// </div>
// </Form>
