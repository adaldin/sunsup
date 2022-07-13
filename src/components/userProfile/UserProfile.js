// React
import { useNavigate } from "react-router-dom";
// Context
import { useAuth } from "../../context/authContext";
// Bootstrap
import Button from "react-bootstrap/Button";

function UserProfile() {
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
        <>
          <p>Welcome {user.email}</p>
          <p>aquí creación de rutas form</p>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
    </div>
  );
}
export default UserProfile;
