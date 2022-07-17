// React
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
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
    getEvent();
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
  console.log(event);
  return (
    <Container>
      {Object.keys(event).length === 0 ? (
        <Spinner />
      ) : (
        <Row>
          <Col xs={12}>
            <small>
              {event.properties.sPoint} - {event.properties.ePoint}
            </small>
          </Col>
          <Col xs={12}>
            <h3>{event.properties.eventName}</h3>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default Eventdetail;
