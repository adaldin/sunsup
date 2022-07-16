// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function FormCreateEvent() {
  function handleEventCreation() {
    console.log("crear evento");
  }
  function handleDate(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  return (
    <Form
      as={Row}
      onSubmit={handleEventCreation}
      className="bg-transparent p-2 gap-2"
    >
      <Form.Group as={Col} xs={12} controlId="formBasicTripName">
        <Form.Label>Trip Name</Form.Label>
        <Form.Control
          type="text"
          name="eventName"
          required
          placeholder="Très viles route"
        />
      </Form.Group>

      <Form.Group as={Col} xs={5} controlId="formBasicTripPlace">
        <Form.Label>Entry Point</Form.Label>
        <Form.Control
          type="text"
          name="sPoint"
          required
          placeholder="Caldes d'Estrac"
        />
      </Form.Group>

      <Form.Group as={Col} xs={5} controlId="formBasicTripPlace">
        <Form.Label>Exit Point</Form.Label>
        <Form.Control
          type="text"
          name="ePoint"
          required
          placeholder="Arenys de Mar"
        />
      </Form.Group>

      <Form.Group as={Col} xs={5} controlId="formBasicTripDate">
        <Form.Label>Select a date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          required
          placeholder="08/08/2022"
          onChange={handleDate}
        />
      </Form.Group>
      <Form.Group as={Col} xs={12} controlId="formBasicTripDate">
        <Form.Label>Select a time</Form.Label>
        <Form.Control type="time" name="time" required placeholder="07:00" />
      </Form.Group>
      <Form.Group as={Col} xs={12} controlId="formBasicTripDate">
        <Form.Label>Enter a description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="description"
          placeholder="Entering to the water close to the beacons system, turning to the left on the rocks system an moving foward until we reach Areny's Port"
        />
      </Form.Group>

      {/* submit */}
      <div className="d-grid">
        <Button variant="secondary" type="submit">
          Save Trip
        </Button>
      </div>
    </Form>
  );
}
export default FormCreateEvent;
