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
      fixed="bottom"
      className="menu--container"
    >
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="menu--link">
          Today
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/explore"
          eventKey="explore"
          className="menu--link"
        >
          Explore
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/profile"
          eventKey="profile"
          className="menu--link"
        >
          Profile
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Menu;
