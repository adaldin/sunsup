// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Bootstrap
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

// Context
import { useAuth } from "../../context/authContext.js";

//Firestore
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

function Register() {
  //******STATES*/
  const [user, setUser] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
  });
  const [error, setError] = useState("");

  //******CONTEXT*/
  // import contexto(fc signup para modificar)
  const { signUp } = useAuth();

  // HOOKS
  const navigate = useNavigate();

  //******LOGIC*/
  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signUp(user.email, user.password);
      navigate("/");

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "users"), {
        email: user.email,
        fname: user.fName,
        lName: user.lName,
        password: user.password,
        timeStamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      if (
        error.code === "auth/email-already-in-use" ||
        error.code === "auth/internal-error"
      )
        setError("Correo inválido");
    }
  };

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
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
        {/* name */}
        <label htmlFor="fName">First name</label>
        <input
          type="text"
          id="fName"
          name="fName"
          onChange={handleChange}
          placeholder="Michael"
        />
        {/* lastName */}
        <label htmlFor="lName">Last name</label>
        <input
          type="text"
          id="lName"
          name="lName"
          onChange={handleChange}
          placeholder="Scott"
        />
        {/* Sign Up */}
        <div className="d-flex justify-content-center">
          <Link to={"/profile/login"}>Alredy registered? Log in.</Link>
        </div>
        {/* submit */}
        <Button type="submit" variant="outline-dark">
          Register
        </Button>
      </form>
    </div>
  );
}
export default Register;
