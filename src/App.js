// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";
// Components
import Header from "./components/header/Header";
import Menu from "./components/menu/Menu.js";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserProfile from "./components/userProfile/UserProfile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
// Pages
import Home from "./pages/home/Home.js";
import Explore from "./pages/explore/Explore.js";
import Profile from "./pages/profile/Profile.js";
import Eventdetail from "./components/events/EventDetail";
// Context
import AuthProvider from "./context/authContext";
import LocationContext from "./context/locationContext";
import EventsContext from "./context/eventsContext";

function App() {
  //******STATES/
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  //******CONTEXT/
  const value = useMemo(() => ({ locations, setLocations }), [locations]);
  const valueEvents = useMemo(() => ({ events, setEvents }), [events]);
  return (
    <>
      <BrowserRouter>
        <EventsContext.Provider value={valueEvents}>
          <LocationContext.Provider value={value}>
            <AuthProvider>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Eventdetail />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/login" element={<Login />} />
                <Route path="/profile/register" element={<Register />} />
                <Route
                  path="/profile/user"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Menu />
            </AuthProvider>
          </LocationContext.Provider>
        </EventsContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
// PADDLETRIP en vez de EVENTS

// PROBLEMAS
// funcionalidades
// Protected routes agrega una ruta. User debería tomar /profile cuando está logueado                     ( HECHO!!!! )
// FormCreateEvent:Atendees tiene que tomar current email, ir a db, buscar email, y traer user.fName
// MapContainer: erase markers(sólo uno se borra)                                                         ( HECHO!!!! )
// MapContainer:Markers creation, convert locations to addresess and send it to gral context.             ( HECHO!!!! )
// MapContainer: Remove Map controls.                                                                     ( HECHO!!!! )
// Login: gestionar mensaje de error para alert
// Login: gestionar la carga del usuario cuando está leyendo el contexto por un loading y set time out
// Today(pages): debe tomar ubicación de cliente,y mapear db con docs con eventDate de hoy cerca de sus coordenadas
// Today(pages):a cada evento recibido de db, le debe agregar fetch a openWeather con current weather
// Today(pages):useParams para abrir evento id                                                              ( HECHO!!!! )
// Today(pages): en detail de evento(id) cargar windy
// Today(pages): en detail de evento(id) cargar googlemaps
// EventDetail: cargar google maps y windy
//O:  EventDetail:boton de join viniendo de today que si está logueado? alert ("unido"):navigate to login
// UserProfile: refresh page after creatin
// UserProfile: Sort list by last created.
//O:  Event item:boton erase viniendo desde profile. que borre la ruta de base de datos tmb
// Event Item: Locacion en tarjeta

// ui
// Drag n drom drawer over map                                        ( HECHO!!!! )
// MapContainer: Form over should be over postiion absolute            ( HECHO!!!! )
// CreateEvent/FormCreateEvent: Loader spiner está en el más y no en un div
// Menu: fixed bottom                                                    ( HECHO!!!! )
// Menu: Remove lines                                                      ( HECHO!!!! )
// Header:remove Search input                                              ( HECHO!!!! )
// menu: links color                                                         ( HECHO!!!! )
// EventDetail: margin-bottom                                                  ( HECHO!!!! )
// O: Home: cargar loading si lista no está disponible
