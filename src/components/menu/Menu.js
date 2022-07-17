// React
import { Link } from "react-router-dom";
// Bootstrap
import Nav from "react-bootstrap/Nav";
function Menu() {
  return (
    <Nav
      fill
      variant="tabs"
      defaultActiveKey="/"
      className="menu--container fixed-bottom"
    >
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="menu--link d-flex flex-column">
          <i className="bi bi-water"></i>
          <small className="m-0">Today</small>
        </Nav.Link>
      </Nav.Item>
      <div className="vr"></div>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/explore"
          eventKey="explore"
          className="menu--link d-flex flex-column"
        >
          <i className="bi bi-search"></i>
          <small className="m-0">Explore</small>
        </Nav.Link>
      </Nav.Item>
      <div className="vr"></div>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/profile"
          eventKey="profile"
          className="menu--link d-flex flex-column"
        >
          <i className="bi bi-person-circle"></i>
          <small className="m-0">Profile</small>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Menu;
