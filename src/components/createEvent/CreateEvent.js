// React

// Bootstrap
import { useState } from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
// Components

// Google-Maps

// Keys
import { mapKey } from "../../keys";

function CreateEvent() {
  //******STATES*/
  const [show, setShow] = useState(false);

  //******LOGIC*/
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <p className="text-center">Create an event</p>
      <Button variant="outline-dark" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
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
