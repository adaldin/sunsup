// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Bootstrap
import Button from "react-bootstrap/Button";
// Context
import { useAuth } from "../../context/authContext.js";

function Register() {
  //******STATES*/
  const [user, setUser] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
  });
  //******CONTEXT*/
  const { signUp } = useAuth();
  // HOOKS
  const navigate = useNavigate();

  //******LOGIC*/
  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signUp(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column p-2 gap-2">
      {/* email */}
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" onChange={handleChange} />
      {/* password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
      />
      {/* name */}
      <label htmlFor="fName">First name</label>
      <input type="text" id="fName" name="fName" onChange={handleChange} />
      {/* lastName */}
      <label htmlFor="lName">Last name</label>
      <input type="text" id="lName" name="lName" onChange={handleChange} />
      {/* submit */}
      <Button type="submit" variant="outline-dark">
        Register
      </Button>
    </form>
  );
}
export default Register;
