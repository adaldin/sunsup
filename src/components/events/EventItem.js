// React
import { Link } from "react-router-dom";
// Bootstrap
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function EventItem(props) {
  return (
    <Card className="p-2 border rounded-2">
      <Link to={`/${props.event.id}`} className="text-decoration-none">
        <h6>{props.event.properties.eventName}</h6>
      </Link>
      <div className="d-flex gap-2">
        <i className="bi bi-calendar-check"></i>
        <p className="text-muted">{props.event.properties.eventDate}</p>
        <i className="bi bi-clock"></i>
        <p className="text-muted">{props.event.properties.eventTime}</p>
      </div>
      <div className="d-flex gap-2">
        <div>
          <Badge pill bg="dark">
            {props.event.properties.atendees.map((atendee, i) => i + 1)}
          </Badge>
        </div>
        <p className="fw-light">
          {props.event.properties.atendees.map((atendee) => atendee)}
        </p>
      </div>
    </Card>
  );
}
export default EventItem;
