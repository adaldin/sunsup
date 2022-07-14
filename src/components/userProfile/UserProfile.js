// React
import { useNavigate } from "react-router-dom";
// Context
import { useAuth } from "../../context/authContext";
// Bootstrap
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UserProfile() {
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

  return (
    <div style={{ heigth: "100vh" }}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Container fluid>
          <div className="d-flex justify-content-center">
            <p>Welcome {user.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
          </div>

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
            {/* date */}
            <Form.Group controlId="formBasicTripDate">
              <Form.Label>Select a date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                required
                placeholder="08/08/2022"
              />
            </Form.Group>
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
