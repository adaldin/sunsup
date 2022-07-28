// React
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Bootstrap
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// Context
import { useAuth } from "../../context/authContext.js";

function Login() {
  //******STATES*/
  const [user, setUser] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
  });
  const [loginError, setLoginError] = useState("");

  //******CONTEXT*/
  const { login } = useAuth();

  // HOOKS
  const navigate = useNavigate();

  //******LOGIC*/
  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");
    try {
      await login(user.email, user.password);
      navigate("/profile/user");
    } catch (error) {
      console.log(error.message);
      setLoginError("Correo inválido");
    }
  };

  return (
    <div>
      {loginError && <Alert variant="danger">{loginError}</Alert>}
      <form onSubmit={handleSubmit} className="d-flex flex-column p-2 gap-2">
        {/* email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="user@mail.com"
        />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="******"
        />
        {/* Sign Up */}
        <div className="d-flex justify-content-center">
          <Link to={"/profile/register"}>New user? Create an Account.</Link>
        </div>
        {/* submit */}
        <Button type="submit" variant="outline-dark">
          Login
        </Button>
      </form>
    </div>
  );
}
export default Login;
