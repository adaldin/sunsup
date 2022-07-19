// React
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
// Firestore
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Eventdetail() {
  //******STATE*/
  const [event, setEvent] = useState({});
  //******PARAMS*/
  const { id } = useParams();

  //******USEEFFECT*/
  useEffect(() => {
    getEvent(); // eslint-disable-next-line
  }, []);

  async function getEvent() {
    const docRef = doc(db, "events", id);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setEvent(data);
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container className="mb-5">
      {Object.keys(event).length === 0 ? (
        <Spinner />
      ) : (
        <Row>
          <Col xs={12}>
            <small className="text-muted">
              <i className="bi bi-geo-alt-fill"></i> {event.properties.sPoint} →{" "}
              {event.properties.ePoint} | OpenWeatherFetch
            </small>
          </Col>
          <Col xs={12}>
            <h3>{event.properties.eventName}</h3>
          </Col>
          <Col
            xs={12}
            lg={6}
            className="d-flex p-2 gap-1 justify-content-between"
          >
            <div className="d-flex">
              <Button variant="outline-dark" className="btn-sm">
                <i className="bi bi-hand-thumbs-up"></i> Valora
              </Button>
            </div>
            <div className="d-flex">
              <Button variant="outline-dark" className="btn-sm">
                <i className="bi bi-download"></i> Guarda esta ruta
              </Button>
            </div>
            <div className="d-flex">
              <Button variant="outline-dark" className="btn-sm">
                <i className="bi bi-share"></i> Comparte
              </Button>
            </div>
          </Col>
          <Col xs={12} lg={2}>
            <small>12 valoraciones</small>
          </Col>
          <Col xs={12} className="border p-5">
            AQUI MAPA GOOGLE MAPS
          </Col>
          <Col
            xs={12}
            className="d-flex flex-column justify-content-start align-content-baseline gap-1 p-2"
          >
            <p className="my-0 fw-bold">Atendees</p>
            <div className="d-flex gap-2">
              <div>
                <Badge pill bg="dark">
                  {event.properties.atendees.map((atendee, i) => i + 1)}
                </Badge>
              </div>
              <p className="fw-light">
                {event.properties.atendees.map((atendee) => atendee)}
              </p>
            </div>
          </Col>
          <Col xs={12} className="p-2">
            {event.properties.eventDescription}
          </Col>

          <Col xs={12} className="border p-5">
            AQUI MAPA WINDY AMB LOCATION D'EVENT
          </Col>
          <Col className="mb-5">{event.properties.eventDescription}</Col>
        </Row>
      )}
    </Container>
  );
}
export default Eventdetail;
