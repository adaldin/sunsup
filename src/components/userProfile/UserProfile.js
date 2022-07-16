// React
import { useNavigate } from "react-router-dom";
// Context
import { useAuth } from "../../context/authContext";
// Components
import CreateEvent from "../createEvent/CreateEvent";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  return (
    <div style={{ heigth: "100vh" }}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Container fluid>
          <Row className="justify-content-center align-items-baseline">
            <Col className="text-start" xs={8}>
              Welcome {user.email}
            </Col>
            <Col
              as={Button}
              xs={4}
              variant="outline-dark"
              onClick={handleLogout}
            >
              Logout
            </Col>
          </Row>
          <Row className="justify-content-center">
            <CreateEvent />
          </Row>
        </Container>
      )}
    </div>
  );
}
export default UserProfile;
