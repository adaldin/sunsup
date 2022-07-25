// React
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// Context
import { useAuth } from "../../context/authContext";
import EventsContext from "../../context/eventsContext";
// Components
import CreateEvent from "../createEvent/CreateEvent";
import EventItem from "../events/EventItem";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// Firebase
import { db } from "../firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

function UserProfile() {
  //******STATES*/
  const [userTrips, setUserTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [event, setEvent] = useState({});
  //******CONTEXT*/
  const { user, logout, loading } = useAuth();
  const { events, setEvents } = useContext(EventsContext);

  //******USE EFFECT*/
  useEffect(() => {
    getData(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUserTrips();
    getSingleTrip(); // eslint-disable-next-line
  }, [events]);

  //******HOOKS*/
  const navigate = useNavigate();

  //******LOGIC*/
  async function handleLogout() {
    await logout();
    navigate("/");
  }

  async function getData() {
    let newEvents = [];
    try {
      const q = query(collection(db, "events"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let newEvent = {
          geometry: {
            coordinates: {
              entry: [
                doc.data().geometry.coordinates.entry[0],
                doc.data().geometry.coordinates.entry[1],
              ],
              exit: [
                doc.data().geometry.coordinates.exit[0],
                doc.data().geometry.coordinates.exit[1],
              ],
            },
            type: doc.data().geometry.type,
          },
          properties: {
            atendees: doc.data().properties.atendees,
            eventDate: doc.data().properties.eventDate,
            eventName: doc.data().properties.eventName,
            eventTime: doc.data().properties.eventTime,
          },
          type: doc.data().type,
          id: doc.id,
        };
        newEvents.push(newEvent);
      });
      setEvents(newEvents);
    } catch (err) {
      console.log("Error getting cached document:", err);
    }
  }

  function getUserTrips() {
    const userTrips = events.filter((event, i) =>
      event.properties.atendees.includes(user.email)
    );
    setUserTrips(userTrips);
    setLoadingTrips(false);
  }

  function getSingleTrip() {
    events.map((e) => setEvent(e));
  }

  return (
    <div style={{ heigth: "100vh" }}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Container fluid>
          <Row className="justify-content-center align-items-baseline">
            <Col className="text-start" xs={8}>
              Hi {user.email}!
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
            <Col xs={12} className="jusify-content-center">
              <CreateEvent />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mt-4">
              <h6 className="fw-bold p-2">My Routes</h6>
            </Col>
            <Col xs={12}>
              <div className="d-flex flex-column gap-2 p-2">
                {!loadingTrips ? (
                  userTrips.map((t, i) => <EventItem key={i} event={t} />)
                ) : (
                  <p className="text-muted">Add a new Route</p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="my-4">
              <h6 className="fw-bold">Favourites Routes</h6>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default UserProfile;
