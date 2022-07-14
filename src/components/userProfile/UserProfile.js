// React
import { useNavigate } from "react-router-dom";
// Context
import { useAuth } from "../../context/authContext";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// R-SUITE
import DatePicker from "rsuite/DatePicker";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function UserProfile() {
  const { beforeToday, dateFns } = DateRangePicker;
  //******STATES*/

  //******CONTEXT*/
  const { user, logout, loading } = useAuth();
  //******HOOKS*/
  const navigate = useNavigate();

  //******LOGIC*/
  async function handleLogout() {
    await logout();
    navigate("/");
  }

  function handleEventCreation() {
    console.log("crear evento");
  }

  // function handleDate(event) {
  //   event.preventDefault();
  //   console.log(event);
  // }

  return (
    <div style={{ heigth: "100vh" }}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Container fluid>
          <Row className="justify-content-center">
            <p className="text-center">Welcome {user.email}</p>
            <Button variant="outline-dark" onClick={handleLogout}>
              Logout
            </Button>
          </Row>

          <Form onSubmit={handleEventCreation}>
            <h6>Create a new paddleboard trip</h6>
            {/* name */}
            <Form.Group controlId="formBasicTripName">
              <Form.Label>Trip Name</Form.Label>
              <Form.Control
                type="text"
                name="eventName"
                required
                placeholder="Très viles route"
              />
            </Form.Group>
            {/* place */}
            <Form.Group controlId="formBasicTripPlace">
              <Form.Label>Starting Point</Form.Label>
              <Form.Control
                type="text"
                name="location"
                required
                placeholder="Caldes d'Estrac"
              />
            </Form.Group>
            {/* date */}
            <DatePicker
              disabledDate={(date) => dateFns.isBefore(date, new Date())}
              style={{ width: 200 }}
            />
            {/* <Form.Group controlId="formBasicTripDate">
              <Form.Label>Select a date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                required
                placeholder="08/08/2022"
                onChange={handleDate}
              />
            </Form.Group> */}
            {/* wheather */}
            <p>Aquí current wheather en esa location en dia selecionado </p>
            <p>
              El día seleccionado debe ser no mayor a 5 días mas de dia de
              creación
            </p>
            {/* submit */}
            <div className="d-grid">
              <Button variant="secondary" type="submit">
                Continue
              </Button>
            </div>
          </Form>
        </Container>
      )}
    </div>
  );
}
export default UserProfile;
