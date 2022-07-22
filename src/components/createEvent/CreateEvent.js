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
import { useJsApiLoader } from "@react-google-maps/api";
// Keys
import { mapKey } from "../../config.js";

function CreateEvent() {
  //******STATES*/
  const [show, setShow] = useState(false);

  //******LOGIC*/
  // modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // map
  const { isLoaded } = useJsApiLoader({
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
        <Modal.Body className="p-0 position-relative">
          <MapContainer className="map--position__container" />
          <FormCreateEvent />
        </Modal.Body>
      </Modal>
    </>
  );
}
export default CreateEvent;
