// React
// Components
import Map from "../map/Map";

// Google-Maps
import { useLoadScript } from "@react-google-maps/api";

function CreateEvent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  //******STATES*/

  //******HOOKS*/

  //******USE EFFECT*/

  //******LOGIC*/
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
export default CreateEvent;

// function handleEventCreation() {
//     console.log("crear evento");
//   }

//   function handleDate(event) {
//     event.preventDefault();
//     console.log(event.target.value);
//   }

// <Form onSubmit={handleEventCreation}>
// <h6>Create a new paddleboard trip</h6>
// {/* name */}
// <Form.Group controlId="formBasicTripName">
//   <Form.Label>Trip Name</Form.Label>
//   <Form.Control
//     type="text"
//     name="eventName"
//     required
//     placeholder="Très viles route"
//   />
// </Form.Group>
// {/* place */}
// <Form.Group controlId="formBasicTripPlace">
//   <Form.Label>Starting Point</Form.Label>
//   <Form.Control
//     type="text"
//     name="location"
//     required
//     placeholder="Caldes d'Estrac"
//   />
// </Form.Group>
// {/* date */}
// <Form.Group controlId="formBasicTripDate">
//   <Form.Label>Select a date</Form.Label>
//   <Form.Control
//     type="date"
//     name="date"
//     required
//     placeholder="08/08/2022"
//     onChange={handleDate}
//     min=
//   />
// </Form.Group>
// {/* wheather */}
// <p>Aquí current wheather en esa location en dia selecionado </p>
// <p>
//   El día seleccionado debe ser no mayor a 5 días mas de dia de
//   creación
// </p>
// {/* submit */}
// <div className="d-grid">
//   <Button variant="secondary" type="submit">
//     Continue
//   </Button>
// </div>
// </Form>
